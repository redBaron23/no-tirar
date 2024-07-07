import { pages } from "./pages";

export const APP_NAME = "no-tirar";
export const PROTECTED_ROUTES = [pages.home, pages.restaurant, pages.profile];

// Index is an unprotected page
export const UNPROTECTED_ROUTES = [];

export const ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];
