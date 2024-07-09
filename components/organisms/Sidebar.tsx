"use client";

import { useNavItems } from "@/hooks/useNavItems";
import { UserRole } from "@prisma/client";
import { cx } from "class-variance-authority";
import { Package2, Settings } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  userRole?: UserRole;
}

const Sidebar = ({ userRole = UserRole.CUSTOMER }: Props) => {
  const { navIcons, activeNavItem, handleNavItemClick, shouldHideNav } =
    useNavItems(userRole);

  return (
    <aside
      className={cx(
        shouldHideNav()
          ? "hidden"
          : "fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background lg:flex",
      )}
    >
      <nav className="flex flex-1 flex-col items-center gap-4 px-2 py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {Object.keys(navIcons).map((key) => (
          <Tooltip key={key}>
            <TooltipTrigger asChild>
              <Link
                href={navIcons[key].page}
                className={cx(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                  activeNavItem === key
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => handleNavItemClick(key)}
              >
                {activeNavItem === key
                  ? navIcons[key].filled
                  : navIcons[key].outlined}
                <span className="sr-only">{navIcons[key].text}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{navIcons[key].text}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="px-2 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Sidebar;
