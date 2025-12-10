import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { createTransferRequestSchema } from "@/_schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const transfersFilePath = path.join(process.cwd(), "data", "transfers.json");
  const stockFilePath = path.join(process.cwd(), "data", "stock.json");

  if (req.method === "GET") {
    const jsonData = fs.readFileSync(transfersFilePath);
    const transfers = JSON.parse(jsonData.toString());
    res.status(200).json(transfers);
  } else if (req.method === "POST") {
    // Validate request payload with zod
    const validationResult = createTransferRequestSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues[0]?.message || "Invalid request data";
      return res.status(400).json({
        message: errorMessage,
        errors: validationResult.error.issues,
      });
    }

    const { productId, fromWarehouseId, toWarehouseId, quantity } =
      validationResult.data;

    // Simulate async processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Read stock data
    const stockData = fs.readFileSync(stockFilePath);
    const stock = JSON.parse(stockData.toString());

    // Find source stock record
    const sourceStockIndex = stock.findIndex(
      (s: { productId: number; warehouseId: number }) =>
        s.productId === productId && s.warehouseId === fromWarehouseId
    );

    if (sourceStockIndex === -1) {
      return res
        .status(400)
        .json({ message: "No stock available in source warehouse" });
    }

    const sourceStock = stock[sourceStockIndex];

    // Validate sufficient stock
    if (sourceStock.quantity < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${sourceStock.quantity}, Requested: ${quantity}`,
      });
    }

    // Update source warehouse stock (decrease)
    stock[sourceStockIndex] = {
      ...sourceStock,
      quantity: sourceStock.quantity - quantity,
    };

    // Find or create destination stock record
    const destStockIndex = stock.findIndex(
      (s: { productId: number; warehouseId: number }) =>
        s.productId === productId && s.warehouseId === toWarehouseId
    );

    if (destStockIndex === -1) {
      // Create new stock record for destination
      const maxStockId =
        stock.length > 0
          ? Math.max(...stock.map((s: { id: number }) => s.id))
          : 0;
      stock.push({
        id: maxStockId + 1,
        productId,
        warehouseId: toWarehouseId,
        quantity,
      });
    } else {
      // Update existing stock record (increase)
      stock[destStockIndex] = {
        ...stock[destStockIndex],
        quantity: stock[destStockIndex].quantity + quantity,
      };
    }

    // Write updated stock
    fs.writeFileSync(stockFilePath, JSON.stringify(stock, null, 2));

    // Read transfers data
    const transfersData = fs.readFileSync(transfersFilePath);
    const transfers = JSON.parse(transfersData.toString());

    // Create transfer record
    const maxId =
      transfers.length > 0
        ? Math.max(...transfers.map((t: { id: number }) => t.id))
        : 0;
    const newTransfer = {
      id: maxId + 1,
      productId,
      fromWarehouseId,
      toWarehouseId,
      quantity,
      date: new Date().toISOString(),
    };

    transfers.push(newTransfer);
    fs.writeFileSync(transfersFilePath, JSON.stringify(transfers, null, 2));

    res.status(201).json(newTransfer);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
