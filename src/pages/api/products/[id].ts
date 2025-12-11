import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const productId = parseInt(id as string);

  if (req.method === "GET") {
    const product = await db.products.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else if (req.method === "PUT") {
    const updatedProduct = await db.products.update(productId, req.body);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else if (req.method === "DELETE") {
    const deleted = await db.products.delete(productId);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
