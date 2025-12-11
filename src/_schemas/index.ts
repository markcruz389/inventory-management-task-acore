import { z } from "zod";

export const productSchema = z.object({
  id: z.number().int().positive(),
  sku: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  unitCost: z.number().nonnegative(),
  reorderPoint: z.number().int().nonnegative(),
});

export const warehouseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  location: z.string().min(1),
  code: z.string().min(1),
});

export const stockSchema = z.object({
  id: z.number().int().positive(),
  productId: z.number().int().positive(),
  warehouseId: z.number().int().positive(),
  quantity: z.number().int().nonnegative(),
});

export const transferSchema = z.object({
  id: z.number().int().positive(),
  productId: z.number().int().positive(),
  fromWarehouseId: z.number().int().positive(),
  toWarehouseId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  date: z.string(),
});

export const createTransferRequestSchema = z
  .object({
    productId: z.number().int().positive(),
    fromWarehouseId: z.number().int().positive(),
    toWarehouseId: z.number().int().positive(),
    quantity: z.number().int().positive(),
  })
  .refine((data) => data.fromWarehouseId !== data.toWarehouseId, {
    message: "Cannot transfer to the same warehouse",
    path: ["toWarehouseId"],
  });

// Simplified Alert schema (calculated, not persisted)
export const alertSchema = z.object({
  productId: z.number().int().positive(),
  stockStatus: z.enum(["critical", "low", "adequate", "overstocked"]),
  currentStock: z.number().int().nonnegative(),
  reorderPoint: z.number().int().nonnegative(),
  recommendedQuantity: z.number().int().nonnegative(),
});

// Persisted dismissed alerts data
export const dismissedAlertsSchema = z.object({
  dismissedProductIds: z.array(z.number().int().positive()),
});

export const productsResponseSchema = z.array(productSchema);
export const warehousesResponseSchema = z.array(warehouseSchema);
export const stockResponseSchema = z.array(stockSchema);
export const transfersResponseSchema = z.array(transferSchema);
export const alertsResponseSchema = z.array(alertSchema);

export type Product = z.infer<typeof productSchema>;
export type Warehouse = z.infer<typeof warehouseSchema>;
export type Stock = z.infer<typeof stockSchema>;
export type Transfer = z.infer<typeof transferSchema>;
export type Alert = z.infer<typeof alertSchema>;
export type DismissedAlerts = z.infer<typeof dismissedAlertsSchema>;
