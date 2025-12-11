import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/_lib/db";
import { generateAlerts } from "@/_utils/alert-calculations";
import type { Product, Stock } from "@/_schemas";

type DismissedAlert = {
  productId: number;
  productName: string;
  sku: string;
  stockStatus: "critical" | "low" | "adequate" | "overstocked";
  currentStock: number;
  reorderPoint: number;
  recommendedQuantity: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Get dismissed product IDs
    const dismissedProductIds = await db.dismissedAlerts.getDismissedIds();

    if (dismissedProductIds.length === 0) {
      return res.status(200).json([]);
    }

    // Get products and stock data
    const products = (await db.products.findAll()) as Product[];
    const stock = (await db.stock.findAll()) as Stock[];

    // Generate alerts for all products
    const allAlerts = generateAlerts(products, stock);

    // Filter to only dismissed products and enrich with product details
    const dismissedAlerts: DismissedAlert[] = dismissedProductIds
      .map((productId) => {
        const alert = allAlerts.find((a) => a.productId === productId);
        const product = products.find((p) => p.id === productId);

        if (!alert || !product) {
          return null;
        }

        return {
          productId: alert.productId,
          productName: product.name,
          sku: product.sku,
          stockStatus: alert.stockStatus,
          currentStock: alert.currentStock,
          reorderPoint: alert.reorderPoint,
          recommendedQuantity: alert.recommendedQuantity,
        };
      })
      .filter((alert): alert is DismissedAlert => alert !== null);

    res.status(200).json(dismissedAlerts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch dismissed alerts",
    });
  }
}
