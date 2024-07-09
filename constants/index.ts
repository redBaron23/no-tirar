import { pages } from "./pages";

const APP_NAME = "no-tirar";
const PROTECTED_ROUTES = [pages.home, pages.restaurant, pages.profile];
const HIDDEN_PATHS = [pages.restaurant, pages.settings];

// Index is an unprotected page
const UNPROTECTED_ROUTES = [];

const ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

export {
  ALLOWED_IMAGE_EXTENSIONS,
  APP_NAME,
  HIDDEN_PATHS,
  PROTECTED_ROUTES,
  UNPROTECTED_ROUTES,
};
