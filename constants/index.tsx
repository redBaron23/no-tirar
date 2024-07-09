import { UserRole } from "@prisma/client";
import { FaRegUserCircle, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { MdMenuBook, MdOutlineShoppingBag } from "react-icons/md";
import {
  RiDashboardFill,
  RiDashboardLine,
  RiHeartFill,
  RiHeartLine,
  RiHome5Fill,
  RiHome5Line,
} from "react-icons/ri";
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
    filled: <RiHome5Fill className="h-6 w-6 text-green-800" />,
    outlined: <RiHome5Line className="h-6 w-6 text-gray-700" />,
    page: pages.home,
    text: "Inicio",
  },
  explore: {
    filled: <FaShoppingBag className="h-6 w-6 text-green-800" />,
    outlined: <MdOutlineShoppingBag className="h-6 w-6 text-gray-700" />,
    page: pages.home,
    text: "Explorar",
  },
  favorites: {
    filled: <RiHeartFill className="h-6 w-6 text-green-800" />,
    outlined: <RiHeartLine className="h-6 w-6 text-gray-700" />,
    page: pages.home,
    text: "Favoritos",
  },
  profile: {
    filled: <FaUserCircle className="h-6 w-6 text-green-800" />,
    outlined: <FaRegUserCircle className="h-6 w-6 text-gray-700" />,
    page: pages.profile,
    text: "Perfil",
  },
};

const businessIcons: IconsType = {
  orders: {
    filled: <FaShoppingBag className="h-6 w-6 text-green-800" />,
    outlined: <MdOutlineShoppingBag className="h-6 w-6 text-gray-700" />,
    page: pages.home,
    text: "Pedidos",
  },
  board: {
    filled: <RiDashboardFill className="h-6 w-6 text-green-800" />,
    outlined: <RiDashboardLine className="h-6 w-6 text-gray-700" />,
    page: pages.board,
    text: "Tablero",
  },
  menu: {
    filled: <MdMenuBook className="h-6 w-6 text-green-800" />,
    outlined: <MdMenuBook className="h-6 w-6 text-gray-700" />,
    page: pages.menu,
    text: "Menu",
  },
  profile: {
    filled: <FaUserCircle className="h-6 w-6 text-green-800" />,
    outlined: <FaRegUserCircle className="h-6 w-6 text-gray-700" />,
    page: pages.profile,
    text: "Perfil",
  },
};

const adminIcons: IconsType = {
  dashboard: {
    filled: <RiHome5Fill className="h-6 w-6 text-green-800" />,
    outlined: <RiHome5Line className="h-6 w-6 text-gray-700" />,
    page: pages.dashboard,
    text: "Panel",
  },
  users: {
    filled: <FaUserCircle className="h-6 w-6 text-green-800" />,
    outlined: <FaRegUserCircle className="h-6 w-6 text-gray-700" />,
    page: pages.users,
    text: "Usuarios",
  },
  settings: {
    filled: <RiHeartFill className="h-6 w-6 text-green-800" />,
    outlined: <RiHeartLine className="h-6 w-6 text-gray-700" />,
    page: pages.settings,
    text: "Configuración",
  },
};

const ICONS_BY_ROLE: { [key in UserRole]: IconsType } = {
  CUSTOMER: customerIcons,
  BUSINESS: businessIcons,
  ADMIN: adminIcons,
};

export {
  ALLOWED_IMAGE_EXTENSIONS,
  APP_NAME,
  HIDDEN_PATHS,
  ICONS_BY_ROLE,
  PROTECTED_ROUTES,
  UNPROTECTED_ROUTES,
};
