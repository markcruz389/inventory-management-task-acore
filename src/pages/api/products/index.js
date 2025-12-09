// pages/api/products/index.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = fs.readFileSync(filePath);
  let products = JSON.parse(jsonData);

  if (req.method === "GET") {
    setTimeout(() => {
      res.status(200).json(products);
    }, 800);
  } else if (req.method === "POST") {
    const newProduct = req.body;
    newProduct.id = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    setTimeout(() => {
      res.status(201).json(newProduct);
    }, 800);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
