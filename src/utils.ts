type DataEntry = {
  x: unknown;
  y: unknown;
};

type JsonFile = {
  description?: string;
  data: DataEntry[];
};

type DetectedType =
  | "boolean"
  | "integer"
  | "float"
  | "date"
  | "timestamp"
  | "bigint"
  | "null"
  | "undefined"
  | "string"
  | "unknown";

/**
 * Checks if a string is a valid ISO 8601 date string.
 */
function isISOString(value: string): boolean {
  const isoRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

  if (!isoRegex.test(value)) return false;

  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Detects the semantic type of a value for charting purposes.
 */
function detectChartType(value: unknown): DetectedType {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  if (typeof value === "boolean") return "boolean";

  if (typeof value === "bigint") return "bigint";

  if (typeof value === "number") {
    // Detect unix timestamp (seconds or milliseconds)
    if (value > 1_000_000_000 && value < 10_000_000_000_000) {
      return "timestamp";
    }

    return Number.isInteger(value) ? "integer" : "float";
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed === "") return "string";

    const lower = trimmed.toLowerCase();

    // Boolean string
    if (lower === "true" || lower === "false") {
      return "boolean";
    }

    // ISO Date string
    if (isISOString(trimmed)) {
      return "date";
    }

    // Numeric string
    if (!isNaN(Number(trimmed))) {
      const num = Number(trimmed);

      if (num > 1_000_000_000 && num < 10_000_000_000_000) {
        return "timestamp";
      }

      return Number.isInteger(num) ? "integer" : "float";
    }

    return "string";
  }

  return "unknown";
}

/**
 * Checks all x values in the dataset.
 */
export function checkDataTypes(json: JsonFile): DetectedType[][] {
  const xEntries = json.data.map(entry => detectChartType(entry.x))
  const yEntries = json.data.map(entry => detectChartType(entry.y))
  return [xEntries, yEntries];
}

export type XData = "number" | "string" | "date" | "null";
export type YData = "number" | "null";

export function normalizeX(value: string | number | Date | null): Date | number | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "number") return Number.isNaN(value) ? null : value;

  if (typeof value === "string") {
    const asDate = new Date(value);
    if (!Number.isNaN(asDate.getTime())) return asDate; // valid ISO/date string
    const asNumber = Number(value);
    if (!Number.isNaN(asNumber)) return asNumber; // numeric string
    return null;
  }

  return null;
}

export function normalizeY(value: number | null): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isNaN(value) ? null : value;
  return null;
}