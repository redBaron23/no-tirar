"use client";

import { pages } from "@/constants/pages";
import { UserRole } from "@prisma/client";
import { cx } from "class-variance-authority";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
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
import Sidebar from "../organisms/Sidebar";

interface IconProps {
  filled: React.ReactNode;
  outlined: React.ReactNode;
  page: string;
  text: string;
}

interface IconsType {
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

const iconsByRole: { [key in UserRole]: IconsType } = {
  CUSTOMER: customerIcons,
  BUSINESS: businessIcons,
  ADMIN: adminIcons,
};

const HIDDEN_PATHS = [pages.restaurant, pages.settings];

const getDefaultPath = (icons: IconsType, pathname: string) => {
  return (
    Object.keys(icons).find((key) => icons[key].page === pathname) ?? "home"
  );
};

interface Props {
  children: ReactNode;
  userRole?: UserRole;
}

export default function TabMenu({
  children,
  userRole = UserRole.CUSTOMER,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const icons = iconsByRole[userRole];

  const [selected, setSelected] = useState<string>(
    getDefaultPath(icons, pathname),
  );

  useEffect(() => {
    setSelected(getDefaultPath(icons, pathname));
  }, [pathname, icons]);

  const handleClick = (key: string) => {
    router.push(icons[key].page);
  };

  const shouldHideTabMenu = HIDDEN_PATHS.some(
    (path) => pathname.startsWith(path) || pathname === pages.index,
  );

  return (
    <div>
      <Sidebar />
      <div
        className={cx(
          !shouldHideTabMenu &&
            "h-[calc(100vh-70px)] overflow-y-auto px-4 lg:h-screen",
        )}
      >
        {children}
      </div>
      <aside
        className={cx(
          shouldHideTabMenu && "hidden",
          "fixed bottom-0 left-0 right-0 z-10 border-t bg-gray-100 lg:hidden",
        )}
      >
        <div className="flex cursor-pointer items-center justify-around">
          {Object.keys(icons).map((key) => (
            <div
              key={key}
              className={`flex h-full w-full flex-col items-center gap-1 py-3 ${
                selected === key
                  ? "text-green-800 hover:text-green-800"
                  : "text-gray-700 hover:bg-green-50"
              }`}
              onClick={() => handleClick(key)}
            >
              {selected === key ? icons[key].filled : icons[key].outlined}
              <span className="text-xs font-medium">{icons[key].text}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
