import BackButton from "@/components/atoms/BackButton";
import UserAvatar from "@/components/atoms/profile/UserAvatar";
import { pages } from "@/constants/pages";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";

const pagesToShowAlwaysBackButton = [pages.settings];

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gray-100">
      <div className="flex items-center justify-between bg-[#2e7d67] p-4">
        <div className="flex items-center gap-4">
          <BackButton pagesToShowAlways={pagesToShowAlwaysBackButton} />
          <UserAvatar />
          <div className="ml-2 text-white">
            <div className="font-bold">{session?.user?.name}</div>
          </div>
        </div>
        <Link href={pages.settings}>
          <SettingsIcon className="h-6 w-6 text-white" />
        </Link>
      </div>
      {children}
    </div>
  );
}
