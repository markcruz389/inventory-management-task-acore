export const queryKeys = {
  products: {
    all: ['products'],
    detail: (id) => ['products', id],
  },
  warehouses: {
    all: ['warehouses'],
    detail: (id) => ['warehouses', id],
  },
  stock: {
    all: ['stock'],
    detail: (id) => ['stock', id],
  },
};

