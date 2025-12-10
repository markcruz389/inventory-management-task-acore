import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), "data", "warehouses.json");
  const jsonData = fs.readFileSync(filePath);
  const warehouses = JSON.parse(jsonData.toString());

  if (req.method === "GET") {
    const warehouse = warehouses.find(
      (w: { id: number }) => w.id === parseInt(id as string)
    );
    if (warehouse) {
      res.status(200).json(warehouse);
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } else if (req.method === "PUT") {
    const index = warehouses.findIndex(
      (w: { id: number }) => w.id === parseInt(id as string)
    );
    if (index !== -1) {
      warehouses[index] = {
        ...warehouses[index],
        ...req.body,
        id: parseInt(id as string),
      };
      fs.writeFileSync(filePath, JSON.stringify(warehouses, null, 2));
      res.status(200).json(warehouses[index]);
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } else if (req.method === "DELETE") {
    const index = warehouses.findIndex(
      (w: { id: number }) => w.id === parseInt(id as string)
    );
    if (index !== -1) {
      warehouses.splice(index, 1);
      fs.writeFileSync(filePath, JSON.stringify(warehouses, null, 2));
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
