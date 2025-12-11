import type { NextApiRequest, NextApiResponse } from "next";
import { generateAlerts } from "@/_utils/alert-calculations";
import { alertsResponseSchema, type Product, type Stock } from "@/_schemas";
import { db } from "@/_lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Read products and stock data
    const products = await db.products.findAll();
    const stock = await db.stock.findAll();

    // Generate alerts from current stock levels
    const allAlerts = generateAlerts(products as Product[], stock as Stock[]);

    // Get dismissed product IDs
    const dismissedProductIds = await db.dismissedAlerts.getDismissedIds();

    // Filter out dismissed alerts and only show critical/low stock alerts
    const activeAlerts = allAlerts.filter(
      (alert) =>
        !dismissedProductIds.includes(alert.productId) &&
        (alert.stockStatus === "critical" || alert.stockStatus === "low")
    );

    // Validate response
    const validationResult = alertsResponseSchema.safeParse(activeAlerts);
    if (!validationResult.success) {
      return res.status(500).json({
        message: "Invalid alerts data structure",
        errors: validationResult.error.issues,
      });
    }

    res.status(200).json(validationResult.data);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch alerts",
    });
  }
}
