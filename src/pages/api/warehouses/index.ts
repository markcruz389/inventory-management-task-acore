import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "data", "warehouses.json");
  const jsonData = fs.readFileSync(filePath);
  const warehouses = JSON.parse(jsonData.toString());

  if (req.method === "GET") {
    res.status(200).json(warehouses);
  } else if (req.method === "POST") {
    const newWarehouse = {
      id: Math.max(...warehouses.map((w: { id: number }) => w.id), 0) + 1,
      ...req.body,
    };
    warehouses.push(newWarehouse);
    fs.writeFileSync(filePath, JSON.stringify(warehouses, null, 2));
    res.status(201).json(newWarehouse);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
