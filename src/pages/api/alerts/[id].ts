import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const productId = parseInt(id as string);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (req.method === "PUT") {
    try {
      // Dismiss the alert for this product
      await db.dismissedAlerts.dismissProduct(productId);

      res.status(200).json({ message: "Alert dismissed successfully" });
    } catch (error: any) {
      res.status(500).json({
        message: error.message || "Failed to dismiss alert",
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
