import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LogoutButton from "../atoms/LogoutButton";

export default function AuthenticatedProfile() {
  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-4 p-4">
      <Card className="p-4 text-center">
        <CardContent>
          <ShoppingBagIcon className="mx-auto h-16 w-16 text-[#2e7d67]" />
          <div className="mt-4 text-gray-500">No tienes ordenes todavia.</div>
          <Button className="mt-4 bg-[#2e7d67] text-white">
            Busca tu Bolsa Sorpresa
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

      <div className="self-center lg:self-end lg:pb-8">
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
