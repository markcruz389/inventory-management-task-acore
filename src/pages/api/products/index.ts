import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = fs.readFileSync(filePath);
  const products = JSON.parse(jsonData.toString());

  if (req.method === "GET") {
    res.status(200).json(products);
  } else if (req.method === "POST") {
    const newProduct = {
      id: Math.max(...products.map((p: { id: number }) => p.id), 0) + 1,
      ...req.body,
    };
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
