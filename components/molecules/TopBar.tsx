import { Button } from "@/components/ui/button";
import SearchBar from "../atoms/SearchBar";
import LoginButton from "../atoms/LoginButton";
import ProfileButton from "../atoms/ProfileButton";

interface Props {
  isLoggedIn: boolean;
}

export default function TopBar({ isLoggedIn }: Props) {
  return (
    <header className="bg-background flex h-16 items-center justify-between gap-2 border-b px-4">
      {/* <Link href="#" className="text-lg font-bold" prefetch={false}>
        <Image
          src="/images/icon-512.png"
          alt="Restaurant Logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </Link> */}
      <div className="w-full flex-grow">
        <SearchBar />
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        {isLoggedIn ? (
          <>
            <Button variant="ghost" size="icon" className="rounded-full">
              <BellIcon className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Notifications</span>
            </Button>
          </>
        ) : (
          <LoginButton />
        )}
        <ProfileButton />
      </div>
    </header>
  );
}

function BellIcon(props: any) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
