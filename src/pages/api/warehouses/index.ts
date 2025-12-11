import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const warehouses = await db.warehouses.findAll();
    res.status(200).json(warehouses);
  } else if (req.method === "POST") {
    const newWarehouse = await db.warehouses.create(req.body);
    res.status(201).json(newWarehouse);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
