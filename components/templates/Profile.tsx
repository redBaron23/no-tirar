import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import LogoutButton from "../atoms/LogoutButton";
import UnauthenticatedProfile from "../organisms/UnauthenticatedProfile";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { pages } from "@/constants/pages";

export default async function Profile() {
  const session = await auth();

  if (!session?.user?.name) {
    return <UnauthenticatedProfile />;
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gray-100">
      <div className="flex-grow">
        <div className="flex items-center justify-between bg-[#2e7d67] p-4">
          <div className="flex items-center gap-4">
            <Link
              href={pages.discover}
              className="hidden rounded-full p-1 transition-transform duration-200 hover:scale-110 lg:block"
            >
              <FiArrowLeft className="h-6 w-6 text-white" />
            </Link>
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback>{session?.user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-2 text-white">
              <div className="font-bold">{session?.user?.name}</div>
            </div>
          </div>
          <SettingsIcon className="h-6 w-6 text-white" />
        </div>
        <div className="space-y-4 p-4">
          <Card className="p-4 text-center">
            <CardContent>
              <ShoppingBagIcon className="mx-auto h-16 w-16 text-[#2e7d67]" />
              <div className="mt-4 text-gray-500">
                No tienes ordenes todavia.
              </div>
              <Button className="mt-4 bg-[#2e7d67] text-white">
                Find a Surprise Bag
              </Button>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <CardContent>
                <div className="font-bold text-[#2e7d67]">CO2e evitado</div>
                <CoffeeIcon className="mx-auto h-16 w-16 text-[#2e7d67]" />
                <div className="mt-2 text-2xl font-bold text-[#2e7d67]">0</div>
                <div className="text-gray-500">tazas de cafe</div>
              </CardContent>
            </Card>
            <Card className="p-4 text-center">
              <CardContent>
                <div className="font-bold text-[#2e7d67]">Dinero ahorrado</div>
                <CoinsIcon className="mx-auto h-16 w-16 text-[#2e7d67]" />
                <div className="mt-2 text-2xl font-bold text-[#2e7d67]">0</div>
                <div className="text-gray-500">ARS</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="p-4">
        <LogoutButton />
      </div>
    </div>
  );
}

function CoffeeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <path d="M6 2v2" />
    </svg>
  );
}

function CoinsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ShoppingBagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
