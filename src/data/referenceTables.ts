export type ReferenceTable = {
  id: string;
  name: string;
  domain: string;
  owner: string;
  lastUpdated: string;
  status: "Active" | "Draft" | "Deprecated";
  description: string;
  rowCount: number;
  keys: string[];
};

export const referenceTables: ReferenceTable[] = [
  {
    id: "country_codes",
    name: "Country Codes",
    domain: "Geography",
    owner: "Data Platform",
    lastUpdated: "2025-12-10",
    status: "Active",
    description: "Canonical ISO-like country mapping with normalization aliases and validity dates.",
    rowCount: 249,
    keys: ["source_system", "source_code", "target_code"]
  },
  {
    id: "customer_status",
    name: "Customer Status",
    domain: "CRM",
    owner: "CRM Ops",
    lastUpdated: "2025-11-22",
    status: "Active",
    description: "Deterministic mapping for customer lifecycle states across systems.",
    rowCount: 18,
    keys: ["source_system", "source_status", "target_status"]
  },
  {
    id: "tax_code_rules",
    name: "Tax Code Rules",
    domain: "Finance",
    owner: "Finance Data",
    lastUpdated: "2025-12-03",
    status: "Draft",
    description: "Context-driven mapping based on country + product type + effective date.",
    rowCount: 73,
    keys: ["country", "product_type", "valid_from"]
  },
  {
    id: "product_hierarchy",
    name: "Product Hierarchy",
    domain: "MDM",
    owner: "MDM Team",
    lastUpdated: "2025-10-07",
    status: "Active",
    description: "SKU rollups (group/category/division) with versioned effective dating.",
    rowCount: 18412,
    keys: ["sku", "valid_from"]
  }
];
