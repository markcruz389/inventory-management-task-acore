import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const stock = await db.stock.findAll();
    res.status(200).json(stock);
  } else if (req.method === "POST") {
    const newStock = await db.stock.create(req.body);
    res.status(201).json(newStock);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
