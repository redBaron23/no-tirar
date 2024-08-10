import {
  BusinessType,
  ContactMethodType,
  PaymentMethodType,
  ProductStatus,
  ProductType,
  UserRole,
} from "@prisma/client";
import {
  BanknoteIcon,
  Cake,
  Coffee,
  CreditCardIcon,
  HeartIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LucideIcon,
  MapIcon,
  MenuIcon,
  ReceiptTextIcon,
  SettingsIcon,
  ShoppingBagIcon,
  UserIcon,
  UsersIcon,
  UtensilsCrossed,
  WalletIcon,
} from "lucide-react";
import { pages } from "./pages";

const APP_NAME = "no-tirar";
const PROTECTED_ROUTES = [pages.home, pages.restaurant, pages.profile];
const HIDDEN_PATHS = [pages.restaurant, pages.settings];

// Index is an unprotected page
const UNPROTECTED_ROUTES: string[] = [];

const ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

interface IconProps {
  filled: React.ReactNode;
  outlined: React.ReactNode;
  page: string;
  text: string;
}

export interface IconsType {
  [key: string]: IconProps;
}

const customerIcons: IconsType = {
  home: {
    filled: <HomeIcon className="h-6 w-6 text-green-800" fill="currentColor" />,
    outlined: <HomeIcon className="h-6 w-6 text-gray-700" />,
    page: pages.home,
    text: "Inicio",
  },
  map: {
    filled: <MapIcon className="h-6 w-6 text-green-800" fill="currentColor" />,
    outlined: <MapIcon className="h-6 w-6 text-gray-700" />,
    page: pages.map,
    text: "Mapa",
  },
  favorites: {
    filled: (
      <HeartIcon className="h-6 w-6 text-green-800" fill="currentColor" />
    ),
    outlined: <HeartIcon className="h-6 w-6 text-gray-700" />,
    page: pages.favorite,
    text: "Favoritos",
  },
  orders: {
    filled: (
      <ReceiptTextIcon className="h-6 w-6 text-green-800" fill="currentColor" />
    ),
    outlined: <ReceiptTextIcon className="h-6 w-6 text-gray-700" />,
    page: pages.order,
    text: "Ordenes",
  },
  profile: {
    filled: <UserIcon className="h-6 w-6 text-green-800" fill="currentColor" />,
    outlined: <UserIcon className="h-6 w-6 text-gray-700" />,
    page: pages.profile,
    text: "Perfil",
  },
};

const businessIcons: IconsType = {
  orders: {
    filled: (
      <ShoppingBagIcon className="h-6 w-6 text-green-800" fill="currentColor" />
    ),
    outlined: <ShoppingBagIcon className="h-6 w-6 text-gray-700" />,
    page: pages.home,
    text: "Pedidos",
  },
  board: {
    filled: (
      <LayoutDashboardIcon
        className="h-6 w-6 text-green-800"
        fill="currentColor"
      />
    ),
    outlined: <LayoutDashboardIcon className="h-6 w-6 text-gray-700" />,
    page: pages.board,
    text: "Tablero",
  },
  menu: {
    filled: <MenuIcon className="h-6 w-6 text-green-800" fill="currentColor" />,
    outlined: <MenuIcon className="h-6 w-6 text-gray-700" />,
    page: pages.menu,
    text: "Menu",
  },
  profile: {
    filled: <UserIcon className="h-6 w-6 text-green-800" fill="currentColor" />,
    outlined: <UserIcon className="h-6 w-6 text-gray-700" />,
    page: pages.profile,
    text: "Perfil",
  },
};

const adminIcons: IconsType = {
  dashboard: {
    filled: (
      <LayoutDashboardIcon
        className="h-6 w-6 text-green-800"
        fill="currentColor"
      />
    ),
    outlined: <LayoutDashboardIcon className="h-6 w-6 text-gray-700" />,
    page: pages.dashboard,
    text: "Panel",
  },
  users: {
    filled: (
      <UsersIcon className="h-6 w-6 text-green-800" fill="currentColor" />
    ),
    outlined: <UsersIcon className="h-6 w-6 text-gray-700" />,
    page: pages.users,
    text: "Usuarios",
  },
  settings: {
    filled: (
      <SettingsIcon className="h-6 w-6 text-green-800" fill="currentColor" />
    ),
    outlined: <SettingsIcon className="h-6 w-6 text-gray-700" />,
    page: pages.settings,
    text: "Configuración",
  },
};

const ICONS_BY_ROLE: { [key in UserRole]: IconsType } = {
  CUSTOMER: customerIcons,
  BUSINESS: businessIcons,
  ADMIN: adminIcons,
};

const PRODUCT_TYPE_OPTIONS = [
  { key: ProductType.SURPRISE, value: "Sorpresa" },
  { key: ProductType.CLASSIC, value: "Clasico" },
];

const PRODUCT_STATUS_OPTIONS = [
  { key: ProductStatus.ACTIVE, value: "Activo" },
  { key: ProductStatus.ARCHIVED, value: "Archivado" },
];

const PAYMENT_OPTIONS = [
  { key: PaymentMethodType.CASH, value: "Efectivo", icon: BanknoteIcon },
  { key: PaymentMethodType.CARD, value: "Tarjeta", icon: CreditCardIcon },
  { key: PaymentMethodType.MP, value: "MercadoPago", icon: WalletIcon },
];

const BUSINESS_TYPE_DISPLAY_TEXT = {
  [BusinessType.BAKERY]: "Panaderia",
  [BusinessType.RESTAURANT_AND_CAFE]: "Restaurant y Cafe",
  [BusinessType.OTHER]: "Otros",
};

const businessTypeOptions = [
  {
    key: BusinessType.BAKERY,
    value: BUSINESS_TYPE_DISPLAY_TEXT[BusinessType.BAKERY],
  },
  {
    key: BusinessType.RESTAURANT_AND_CAFE,
    value: BUSINESS_TYPE_DISPLAY_TEXT[BusinessType.RESTAURANT_AND_CAFE],
  },
  {
    key: BusinessType.OTHER,
    value: BUSINESS_TYPE_DISPLAY_TEXT[BusinessType.OTHER],
  },
];

const contactOptions = [
  { key: ContactMethodType.PHONE, value: "Telefono" },
  { key: ContactMethodType.WHATSAPP, value: "Whatsapp" },
  { key: ContactMethodType.EMAIL, value: "Email" },
];

const MAP_ICON_COMPONENTS: Record<BusinessType, LucideIcon> = {
  OTHER: Coffee,
  RESTAURANT_AND_CAFE: UtensilsCrossed,
  BAKERY: Cake,
};

const MAP_ICON_COLORS: Record<BusinessType, string> = {
  OTHER: "#4A90E2",
  RESTAURANT_AND_CAFE: "#50E3C2",
  BAKERY: "#F5A623",
};

export {
  ALLOWED_IMAGE_EXTENSIONS,
  APP_NAME,
  BUSINESS_TYPE_DISPLAY_TEXT,
  businessTypeOptions,
  contactOptions,
  HIDDEN_PATHS,
  ICONS_BY_ROLE,
  MAP_ICON_COLORS,
  MAP_ICON_COMPONENTS,
  PAYMENT_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  PROTECTED_ROUTES,
  UNPROTECTED_ROUTES,
};
