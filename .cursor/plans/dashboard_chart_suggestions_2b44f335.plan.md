---
name: Dashboard Chart Suggestions
overview: Add MUI X Charts to the dashboard to visualize inventory value distribution, stock levels across warehouses, and stock health metrics.
todos:
  - id: install-charts
    content: Install @mui/x-charts package
    status: completed
  - id: pie-chart
    content: Add Pie Chart for inventory value by category
    status: completed
  - id: warehouse-bar
    content: Add Bar Chart for stock distribution by warehouse
    status: completed
  - id: stock-reorder
    content: Add horizontal Bar Chart for stock vs reorder point comparison
    status: completed
  - id: stacked-bar
    content: Add Stacked Bar Chart for product distribution across warehouses
    status: completed
  - id: scatter-chart
    content: Add Scatter Chart for unit cost vs stock quantity analysis
    status: completed
  - id: layout
    content: Reorganize dashboard layout with Grid to accommodate charts
    status: completed
  - id: update-skeleton
    content: Update dashboard-skeleton.js to match new chart layout
    status: completed
---

# Dashboard Chart Enhancement Plan

## Current State

The dashboard displays summary cards (Total Products, Warehouses, Total Inventory Value) and an inventory overview table with stock status.

## Data Available for Charting

| Dataset | Key Fields |

|---------|------------|

| Products | id, name, category (Utensils/Packaging/Cups), unitCost, reorderPoint |

| Stock | productId, warehouseId, quantity |

| Warehouses | id, name, location, code |

---

## Recommended Charts (using @mui/x-charts)

### 1. Inventory Value by Category - Pie Chart

**Purpose:** Visualize where capital is tied up across product categories.

```jsx
import { PieChart } from '@mui/x-charts/PieChart';

// Data transformation: group by category, sum (quantity * unitCost)
const categoryValueData = [
  { id: 0, value: 1075, label: 'Utensils' },    // Bamboo Spork + Chopsticks
  { id: 1, value: 2397.5, label: 'Packaging' }, // Containers + Bowls
  { id: 2, value: 690, label: 'Cups' },
];
```

### 2. Stock Distribution by Warehouse - Bar Chart

**Purpose:** Compare total inventory quantities held at each warehouse.

```jsx
import { BarChart } from '@mui/x-charts/BarChart';

// Data transformation: aggregate stock.quantity by warehouseId
const warehouseStockData = {
  xAxis: [{ scaleType: 'band', data: ['NDC-01', 'WCF-02', 'STH-03'] }],
  series: [{ data: [4900, 3000, 1500] }], // total quantities per warehouse
};
```

### 3. Stock Level vs Reorder Point - Bar Chart (Horizontal)

**Purpose:** Visualize how close each product is to needing a reorder (critical for inventory management).

```jsx
import { BarChart } from '@mui/x-charts/BarChart';

// Show current stock alongside reorder point per product
const stockHealthData = {
  yAxis: [{ scaleType: 'band', data: ['Bamboo Spork', 'Container 32oz', ...] }],
  series: [
    { data: [400, 2000, 4300, 1550, 1150], label: 'Current Stock' },
    { data: [100, 500, 1000, 750, 600], label: 'Reorder Point' },
  ],
  layout: 'horizontal',
};
```

### 4. Product Stock Distribution Across Warehouses - Stacked Bar Chart

**Purpose:** Show how each product's inventory is spread across warehouses.

```jsx
import { BarChart } from '@mui/x-charts/BarChart';

// Products on x-axis, stacked bars for each warehouse
const distributionData = {
  xAxis: [{ scaleType: 'band', data: ['Bamboo Spork', 'Container', 'Chopsticks', 'Paper Bowl', 'Coffee Cup'] }],
  series: [
    { data: [250, 1200, 2500, 950, 0], label: 'Newark (NDC-01)', stack: 'total' },
    { data: [150, 0, 1800, 600, 450], label: 'Los Angeles (WCF-02)', stack: 'total' },
    { data: [0, 800, 0, 0, 700], label: 'Dallas (STH-03)', stack: 'total' },
  ],
};
```

### 5. Unit Cost vs Stock Quantity - Scatter Chart

**Purpose:** Reveal relationship between product cost and inventory levels held.

```jsx
import { ScatterChart } from '@mui/x-charts/ScatterChart';

// X = Unit Cost, Y = Total Stock Quantity
const costVsQuantity = [
  { x: 2.50, y: 400, id: 'Bamboo Spork' },
  { x: 0.85, y: 2000, id: 'Container' },
  { x: 0.30, y: 4300, id: 'Chopsticks' },
  { x: 0.45, y: 1550, id: 'Paper Bowl' },
  { x: 0.60, y: 1150, id: 'Coffee Cup' },
];
```

**Insight:** Shows if there's an inverse relationship between product cost and stock levels (e.g., keeping less stock of expensive items).

---

## Suggested Dashboard Layout

```
+------------------+------------------+------------------+
|  Total Products  |   Warehouses     | Inventory Value  |
+------------------+------------------+------------------+
|   Pie Chart: Value by Category   |  Bar: Warehouse Stock  |
|          (half width)            |     (half width)       |
+----------------------------------+------------------------+
|        Bar Chart: Stock Level vs Reorder Point           |
|                     (full width)                         |
+----------------------------------------------------------+
|     Stacked Bar: Product Distribution by Warehouse       |
|                     (full width)                         |
+----------------------------------------------------------+
|                  Inventory Overview Table                |
+----------------------------------------------------------+
```

---

## Implementation Files

- Install: `pnpm add @mui/x-charts`
- Modify: `src/pages/index.js` - add chart components and data transformations
- Modify: `src/_components/dashboard/dashboard-skeleton.js` - update skeleton to match new chart layout
- Optional: Extract chart logic to `src/_components/dashboard/` for cleaner code