import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from "@/constants";
import { pages } from "@/constants/pages";

export const isPathOnArray = (
  currentPath: string,
  array: string[],
): boolean => {
  return array.some((route) => currentPath.startsWith(route));
};

const isIndexRoute = (currentPath: string): boolean =>
  currentPath === pages.index;

export const isProtectedRoute = (currentPath: string): boolean =>
  isPathOnArray(currentPath, PROTECTED_ROUTES);

export const isUnprotectedRoute = (currentPath: string): boolean =>
  isPathOnArray(currentPath, UNPROTECTED_ROUTES) || isIndexRoute(currentPath);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency.
 * @param amount - The number to format.
 * @param locale - The locale string (default is 'en-US').
 * @param currency - The currency code (default is 'USD').
 * @returns A string representing the formatted currency.
 */
export function formatCurrency(
  amount: number,
  locale: string = "es-AR",
  currency: string = "ARS",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
