import { HIDDEN_PATHS, ICONS_BY_ROLE } from "@/constants";
import { pages } from "@/constants/pages";
import { getDefaultPath } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useNavItems = (userRole: UserRole) => {
  const router = useRouter();
  const pathname = usePathname();
  const navIcons = ICONS_BY_ROLE[userRole];

  const [activeNavItem, setActiveNavItem] = useState<string>(
    getDefaultPath(navIcons, pathname),
  );

  useEffect(() => {
    setActiveNavItem(getDefaultPath(navIcons, pathname));
  }, [pathname, navIcons]);

  const handleNavItemClick = useCallback(
    (key: string) => {
      setActiveNavItem(key);
      router.push(navIcons[key].page);
    },
    [router, navIcons],
  );

  const shouldHideNav = useCallback(() => {
    return HIDDEN_PATHS.some(
      (path) => pathname.startsWith(path) || pathname === pages.index,
    );
  }, [pathname]);

  return {
    navIcons,
    activeNavItem,
    handleNavItemClick,
    shouldHideNav,
  };
};
