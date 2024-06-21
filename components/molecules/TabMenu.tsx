"use client";

import { useState, useEffect } from "react";
import {
  RiCompassLine,
  RiCompassFill,
  RiHeartLine,
  RiHeartFill,
} from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { pages } from "@/constants/pages";

interface IconProps {
  filled: React.ReactNode;
  outlined: React.ReactNode;
  page: string;
}

interface IconsType {
  [key: string]: IconProps;
}

const icons: IconsType = {
  discover: {
    filled: <RiCompassFill className="h-6 w-6 text-green-800" />,
    outlined: <RiCompassLine className="h-6 w-6 text-gray-700" />,
    page: pages.index,
  },
  explore: {
    filled: <FaShoppingBag className="h-6 w-6 text-green-800" />,
    outlined: <MdOutlineShoppingBag className="h-6 w-6 text-gray-700" />,
    page: pages.index,
  },
  favorites: {
    filled: <RiHeartFill className="h-6 w-6 text-green-800" />,
    outlined: <RiHeartLine className="h-6 w-6 text-gray-700" />,
    page: pages.index,
  },
  profile: {
    filled: <FaUserCircle className="h-6 w-6 text-green-800" />,
    outlined: <FaRegUserCircle className="h-6 w-6 text-gray-700" />,
    page: pages.profile,
  },
};

const HIDDEN_PATHS = [pages.restaurant];

export default function TabMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const defaultPath = Object.keys(icons).find(
    (key) => icons[key].page === pathname,
  );
  const [selected, setSelected] = useState<string>(defaultPath ?? "discover");

  const handleClick = (key: string) => {
    router.push(icons[key].page);
    setSelected(key);
  };

  if (HIDDEN_PATHS.some((path) => pathname.startsWith(path))) {
    return <></>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-gray-100">
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
            <span className="text-xs font-medium">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
