import { Button } from "@/components/ui/button";
import SearchBar from "../atoms/SearchBar";
import { CgProfile } from "react-icons/cg";

export default function TopBar() {
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
      <SearchBar />
      <Button variant="ghost" size="icon" className="rounded-full">
        <BellIcon className="h-5 w-5 text-gray-700" />
        <span className="sr-only">Notifications</span>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <CgProfile className="h-6 w-6 text-gray-700" />
        <span className="sr-only">User Menu</span>
      </Button>
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

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
