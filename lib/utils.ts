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
