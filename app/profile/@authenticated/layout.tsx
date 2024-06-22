import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { pages } from "@/constants/pages";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";
import { type PropsWithChildren } from "react";
import BackButton from "@/components/atoms/BackButton";

const pagesToShowAlwaysBackButton = [pages.settings];

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gray-100">
      <div className="flex items-center justify-between bg-[#2e7d67] p-4">
        <div className="flex items-center gap-4">
          <BackButton pagesToShowAlways={pagesToShowAlwaysBackButton} />
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>{session!.user!.name![0]}</AvatarFallback>
          </Avatar>
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
