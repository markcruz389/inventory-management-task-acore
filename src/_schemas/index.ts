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

export const productsResponseSchema = z.array(productSchema);
export const warehousesResponseSchema = z.array(warehouseSchema);
export const stockResponseSchema = z.array(stockSchema);

export type Product = z.infer<typeof productSchema>;
export type Warehouse = z.infer<typeof warehouseSchema>;
export type Stock = z.infer<typeof stockSchema>;
