"use client";

import { isPathOnArray } from "@/lib/utils";
import { cx } from "class-variance-authority";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

interface Props {
  page?: string;
  pagesToShowAlways?: string[];
  showAlways?: boolean;
}

const BackButton = ({ page, pagesToShowAlways = [] }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const showAlways = isPathOnArray(pathname, pagesToShowAlways);

  const handleClick = () => {
    if (page) {
      router.push(page);
      return;
    }
    router.back();
  };

  return (
    <div
      onClick={handleClick}
      className={cx(
        "cursor-pointer rounded-full p-1 transition-transform duration-200 hover:scale-110 lg:block",
        showAlways ? "block" : "hidden",
      )}
    >
      <FiArrowLeft className="h-6 w-6 text-white" />
    </div>
  );
};

export default BackButton;
