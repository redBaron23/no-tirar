import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { IconsType, PROTECTED_ROUTES, UNPROTECTED_ROUTES } from "@/constants";
import { pages } from "@/constants/pages";
import { ProductStatus, ProductType } from "@prisma/client";

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

export const getDefaultPath = (icons: IconsType, pathname: string) => {
  return (
    Object.keys(icons).find((key) => icons[key].page === pathname) ?? "home"
  );
};

export const getStatusBadgeVariant = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "default";
    case ProductStatus.DRAFT:
      return "secondary";
    case ProductStatus.ARCHIVED:
      return "destructive";
    default:
      return "outline";
  }
};

export const translateStatus = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "Activo";
    case ProductStatus.DRAFT:
      return "Borrador";
    case ProductStatus.ARCHIVED:
      return "Archivado";
    default:
      return status;
  }
};

export const translateProductType = (type: ProductType) => {
  switch (type) {
    case ProductType.SURPRISE:
      return "Sorpresa";
    default:
      return type;
  }
};
