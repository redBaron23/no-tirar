"use client";

import { HIDDEN_PATHS, ICONS_BY_ROLE } from "@/constants";
import { pages } from "@/constants/pages";
import { getDefaultPath } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { cx } from "class-variance-authority";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  userRole?: UserRole;
}

export default function BottomTabMenu({ userRole = UserRole.CUSTOMER }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const icons = ICONS_BY_ROLE[userRole];

  const [selected, setSelected] = useState<string>(
    getDefaultPath(icons, pathname),
  );

  useEffect(() => {
    setSelected(getDefaultPath(icons, pathname));
  }, [pathname, icons]);

  const handleClick = (key: string) => {
    router.push(icons[key].page);
  };

  const shouldHideSidebar = HIDDEN_PATHS.some(
    (path) => pathname.startsWith(path) || pathname === pages.index,
  );

  return (
    <nav
      className={cx(
        "fixed bottom-0 left-0 right-0 z-10 border-t bg-gray-100 lg:hidden",
        shouldHideSidebar && "hidden",
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
    </nav>
  );
}
