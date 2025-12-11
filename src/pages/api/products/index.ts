import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const products = await db.products.findAll();
    res.status(200).json(products);
  } else if (req.method === "POST") {
    const newProduct = await db.products.create(req.body);
    res.status(201).json(newProduct);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
