import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = fs.readFileSync(filePath);
  const products = JSON.parse(jsonData.toString());

  if (req.method === "GET") {
    const product = products.find(
      (p: { id: number }) => p.id === parseInt(id as string)
    );
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else if (req.method === "PUT") {
    const index = products.findIndex(
      (p: { id: number }) => p.id === parseInt(id as string)
    );
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...req.body,
        id: parseInt(id as string),
      };
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
      res.status(200).json(products[index]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else if (req.method === "DELETE") {
    const index = products.findIndex(
      (p: { id: number }) => p.id === parseInt(id as string)
    );
    if (index !== -1) {
      products.splice(index, 1);
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
