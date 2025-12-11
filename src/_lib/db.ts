import fs from "fs";
import path from "path";

type Entity = { id: number };

const createTable = <T extends Entity>(tableName: string) => {
  const filePath = path.join(process.cwd(), "data", `${tableName}.json`);

  const readData = async (): Promise<T[]> => {
    try {
      if (!fs.existsSync(filePath)) {
        return [];
      }
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data) as T[];
    } catch (error) {
      throw new Error(
        `Failed to read ${tableName}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const writeData = async (data: T[]): Promise<void> => {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      throw new Error(
        `Failed to write ${tableName}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return {
    async findAll(): Promise<T[]> {
      return readData();
    },

    async findById(id: number): Promise<T | null> {
      const data = await readData();
      return data.find((item) => item.id === id) || null;
    },

    async findOne(predicate: (item: T) => boolean): Promise<T | null> {
      const data = await readData();
      return data.find(predicate) || null;
    },

    async findMany(predicate: (item: T) => boolean): Promise<T[]> {
      const data = await readData();
      return data.filter(predicate);
    },

    async create(item: Omit<T, "id">): Promise<T> {
      const data = await readData();
      const maxId =
        data.length > 0 ? Math.max(...data.map((item) => item.id)) : 0;
      const newItem = { ...item, id: maxId + 1 } as T;
      data.push(newItem);
      await writeData(data);
      return newItem;
    },

    async createWithId(item: T): Promise<T> {
      const data = await readData();
      const existingIndex = data.findIndex(
        (existing) => existing.id === item.id
      );
      if (existingIndex !== -1) {
        throw new Error(
          `Item with id ${item.id} already exists in ${tableName}`
        );
      }
      data.push(item);
      await writeData(data);
      return item;
    },

    async update(
      id: number,
      updates: Partial<Omit<T, "id">>
    ): Promise<T | null> {
      const data = await readData();
      const index = data.findIndex((item) => item.id === id);
      if (index === -1) {
        return null;
      }
      data[index] = { ...data[index], ...updates } as T;
      await writeData(data);
      return data[index];
    },

    async delete(id: number): Promise<boolean> {
      const data = await readData();
      const index = data.findIndex((item) => item.id === id);
      if (index === -1) {
        return false;
      }
      data.splice(index, 1);
      await writeData(data);
      return true;
    },
  };
};

export const db = {
  products: createTable("products"),
  stock: createTable("stock"),
  warehouses: createTable("warehouses"),
  transfers: createTable("transfers"),
  alerts: createTable("alerts"),
};
