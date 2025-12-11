import type { Product, Stock, Alert } from "@/_schemas";

export type StockStatus = "critical" | "low" | "adequate" | "overstocked";

export const calculateStockStatus = (
  currentStock: number,
  reorderPoint: number
): StockStatus => {
  if (currentStock === 0 || currentStock < reorderPoint * 0.25) {
    return "critical";
  }
  if (currentStock < reorderPoint) {
    return "low";
  }
  if (currentStock <= reorderPoint * 1.5) {
    return "adequate";
  }
  return "overstocked";
};

export const calculateRecommendedQuantity = (
  currentStock: number,
  reorderPoint: number
): number => {
  if (currentStock === 0) {
    return reorderPoint;
  }
  const recommended = Math.ceil(reorderPoint * 1.5 - currentStock);
  return Math.max(recommended, reorderPoint);
};

export const calculateTotalStock = (
  productId: number,
  stock: Stock[]
): number => {
  return stock
    .filter((s) => s.productId === productId)
    .reduce((sum, s) => sum + s.quantity, 0);
};

export const generateAlerts = (
  products: Product[],
  stock: Stock[]
): Alert[] => {
  return products.map((product) => {
    const currentStock = calculateTotalStock(product.id, stock);
    const stockStatus = calculateStockStatus(
      currentStock,
      product.reorderPoint
    );
    const recommendedQuantity = calculateRecommendedQuantity(
      currentStock,
      product.reorderPoint
    );

    return {
      productId: product.id,
      stockStatus,
      currentStock,
      reorderPoint: product.reorderPoint,
      recommendedQuantity,
    };
  });
};
