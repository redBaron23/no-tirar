"use client";

import { TAB_MENU_HEIGHT } from "@/constants/style";
import { useNavItems } from "@/hooks/useNavItems";
import { UserRole } from "@prisma/client";
import { cx } from "class-variance-authority";

interface Props {
  userRole?: UserRole;
}

export default function BottomTabMenu({ userRole = UserRole.CUSTOMER }: Props) {
  const { navIcons, activeNavItem, handleNavItemClick, shouldHideNav } =
    useNavItems(userRole);

  return (
    <nav
      className={cx(
        `fixed bottom-0 left-0 right-0 z-[1000] flex h-[${TAB_MENU_HEIGHT}] w-full items-center justify-between border-t bg-gray-100 lg:hidden`,
        shouldHideNav() && "hidden",
      )}
    >
      <div className="flex w-full cursor-pointer items-center justify-around">
        {Object.keys(navIcons).map((key) => (
          <div
            key={key}
            className={cx(
              "flex h-full w-full flex-col items-center gap-1 py-3",
              activeNavItem === key
                ? "text-green-800 hover:text-green-800"
                : "text-gray-700 hover:bg-green-50",
            )}
            onClick={() => handleNavItemClick(key)}
          >
            {activeNavItem === key
              ? navIcons[key].filled
              : navIcons[key].outlined}
            <span className="text-xs font-medium">{navIcons[key].text}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
