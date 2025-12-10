import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "data", "stock.json");
  const jsonData = fs.readFileSync(filePath);
  const stock = JSON.parse(jsonData.toString());

  if (req.method === "GET") {
    res.status(200).json(stock);
  } else if (req.method === "POST") {
    const newStock = {
      id: Math.max(...stock.map((s: { id: number }) => s.id), 0) + 1,
      ...req.body,
    };
    stock.push(newStock);
    fs.writeFileSync(filePath, JSON.stringify(stock, null, 2));
    res.status(201).json(newStock);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
