"use client";

import Link from "next/link";

export default function Location() {
  const latitude = "-34.927823492001615";
  const longitude = "-57.96231786435115";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const handleClick = () => {
    window.open(mapsUrl);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-start gap-2 p-4 dark:bg-gray-800"
    >
      <div className="flex items-center gap-2">
        <MapPinIcon className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">
          123 Main Street, Cityville{" "}
          <span className="text-gray-500 dark:text-gray-400">(500m away)</span>
        </span>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="mr-2">More information about the store</span>
        </div>
        <Link
          href="#"
          className="text-sm text-primary underline"
          prefetch={false}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

function MapPinIcon(props: any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
