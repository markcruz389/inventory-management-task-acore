import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const warehouseId = parseInt(id as string);

  if (req.method === "GET") {
    const warehouse = await db.warehouses.findById(warehouseId);
    if (warehouse) {
      res.status(200).json(warehouse);
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } else if (req.method === "PUT") {
    const updatedWarehouse = await db.warehouses.update(warehouseId, req.body);
    if (updatedWarehouse) {
      res.status(200).json(updatedWarehouse);
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } else if (req.method === "DELETE") {
    const deleted = await db.warehouses.delete(warehouseId);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
