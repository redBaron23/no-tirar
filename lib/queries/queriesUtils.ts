import { Decimal } from "@prisma/client/runtime/library";

export function serializeData<T>(data: T): T {
  if (data instanceof Decimal) {
    return data.toNumber() as unknown as T;
  } else if (data instanceof Date) {
    return data as T; // Preserve Date objects
  } else if (Array.isArray(data)) {
    return data.map(serializeData) as T;
  } else if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, serializeData(value)]),
    ) as T;
  }
  return data;
}
