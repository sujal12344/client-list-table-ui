import { Client } from "@/types/client";
import { SortCriterion } from "@/types/sort";
import { useMemo } from "react";

export function useClientSort(
  clients: Client[],
  sortCriteria: SortCriterion[]
) {
  return useMemo(() => {
    if (!sortCriteria.length) return [...clients];

    return [...clients].sort((a, b) => {
      for (const { field, direction } of sortCriteria) {
        const fieldPath = field as keyof Client;

        const valueA = a[fieldPath];
        const valueB = b[fieldPath];

        // Handle date comparisons
        if (valueA instanceof Date && valueB instanceof Date) {
          const comparison = valueA.getTime() - valueB.getTime();
          if (comparison !== 0) {
            return direction === "asc" ? comparison : -comparison;
          }
        }
        // Handle string comparisons
        else if (typeof valueA === "string" && typeof valueB === "string") {
          const comparison = valueA.localeCompare(valueB);
          if (comparison !== 0) {
            return direction === "asc" ? comparison : -comparison;
          }
        }
        // Handle number comparisons
        else if (typeof valueA === "number" && typeof valueB === "number") {
          const comparison = valueA - valueB;
          if (comparison !== 0) {
            return direction === "asc" ? comparison : -comparison;
          }
        }
      }
      return 0;
    });
  }, [clients, sortCriteria]);
}
