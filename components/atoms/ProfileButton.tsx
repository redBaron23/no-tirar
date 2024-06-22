"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { pages } from "@/constants/pages";
import { FaRegUserCircle } from "react-icons/fa";

const ProfileButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(pages.profile);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden rounded-full lg:block"
      onClick={handleClick}
    >
      <FaRegUserCircle className="h-6 w-6 text-gray-700" />
      <span className="sr-only">User Menu</span>
    </Button>
  );
};

export default ProfileButton;
