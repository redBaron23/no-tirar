import imageCompression from "browser-image-compression";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  IconsType,
  PAYMENT_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  PROTECTED_ROUTES,
  UNPROTECTED_ROUTES,
} from "@/constants";
import { pages } from "@/constants/pages";
import { PaymentMethodType, ProductStatus, ProductType } from "@prisma/client";

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
    Object.keys(icons).find((key) => pathname.includes(icons[key].page)) ??
    "home"
  );
};

export const getStatusBadgeVariant = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "default";
    case ProductStatus.ARCHIVED:
      return "destructive";
    default:
      return "outline";
  }
};

export const getPaymentMethod = (paymentMethod: PaymentMethodType) => {
  return PAYMENT_OPTIONS.find((option) => option.key === paymentMethod);
};

export const translateStatus = (status: ProductStatus) => {
  return PRODUCT_STATUS_OPTIONS.find((option) => option.key === status)?.value;
};

export const translateProductType = (type: ProductType) => {
  return PRODUCT_TYPE_OPTIONS.find((option) => option.key === type)?.value;
};

export const translatePaymentMethod = (paymentMethod: PaymentMethodType) => {
  return getPaymentMethod(paymentMethod)?.value;
};

export const compressImage = async (imageFile: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);

    return new File([compressedFile], imageFile.name);
  } catch (error) {
    console.log(error);
  }
};
