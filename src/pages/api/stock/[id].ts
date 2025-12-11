import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const stockId = parseInt(id as string);

  if (req.method === "GET") {
    const stockItem = await db.stock.findById(stockId);
    if (stockItem) {
      res.status(200).json(stockItem);
    } else {
      res.status(404).json({ message: "Stock item not found" });
    }
  } else if (req.method === "PUT") {
    const updatedStock = await db.stock.update(stockId, req.body);
    if (updatedStock) {
      res.status(200).json(updatedStock);
    } else {
      res.status(404).json({ message: "Stock item not found" });
    }
  } else if (req.method === "DELETE") {
    const deleted = await db.stock.delete(stockId);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Stock item not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
