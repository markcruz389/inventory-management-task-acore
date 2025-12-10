export const queryKeys = {
  products: {
    all: ["products"] as const,
    detail: (id: string | number) => ["products", id] as const,
  },
  warehouses: {
    all: ["warehouses"] as const,
    detail: (id: string | number) => ["warehouses", id] as const,
  },
  stock: {
    all: ["stock"] as const,
    detail: (id: string | number) => ["stock", id] as const,
  },
  transfers: {
    all: ["transfers"] as const,
    detail: (id: string | number) => ["transfers", id] as const,
  },
};
