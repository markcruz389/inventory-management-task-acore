import type { NextApiRequest, NextApiResponse } from "next";
import { createTransferRequestSchema } from "@/_schemas";
import { db } from "@/_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Simulate async processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const transfers = await db.transfers.findAll();
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
    const stock = await db.stock.findAll();

    // Find source stock record
    const sourceStock = stock.find(
      (s: { productId: number; warehouseId: number }) =>
        s.productId === productId && s.warehouseId === fromWarehouseId
    );

    if (!sourceStock) {
      return res
        .status(400)
        .json({ message: "No stock available in source warehouse" });
    }

    // Validate sufficient stock
    if (sourceStock.quantity < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${sourceStock.quantity}, Requested: ${quantity}`,
      });
    }

    // Update source warehouse stock (decrease)
    await db.stock.update(sourceStock.id, {
      quantity: sourceStock.quantity - quantity,
    } as any);

    // Find or create destination stock record
    const destStock = stock.find(
      (s: { productId: number; warehouseId: number }) =>
        s.productId === productId && s.warehouseId === toWarehouseId
    );

    if (!destStock) {
      // Create new stock record for destination
      await db.stock.create({
        productId,
        warehouseId: toWarehouseId,
        quantity,
      } as any);
    } else {
      // Update existing stock record (increase)
      await db.stock.update(destStock.id, {
        quantity: destStock.quantity + quantity,
      } as any);
    }

    // Create transfer record
    const newTransfer = await db.transfers.create({
      productId,
      fromWarehouseId,
      toWarehouseId,
      quantity,
      date: new Date().toISOString(),
    } as any);

    res.status(201).json(newTransfer);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
