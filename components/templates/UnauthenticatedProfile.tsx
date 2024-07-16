import { APP_NAME } from "@/constants";
import { FileText, HelpCircle, Lock } from "lucide-react";
import Image from "next/image";
import ButtonLink from "../atoms/ButtonLink";
import LoginButton from "../atoms/LoginButton";

export default function UnauthenticatedProfile() {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50 p-6">
      <main className="ml-16 flex flex-col items-center">
        <div className="mb-8 mt-12 flex flex-col items-center">
          <Image
            src="/images/logo.png"
            alt={`${APP_NAME} Logo`}
            width={80}
            height={80}
            className="rounded-full shadow-lg"
          />
          <h1 className="mt-4 text-2xl font-bold text-emerald-600">
            Te damos la bienvenida
          </h1>
        </div>

        <div className="w-full max-w-md space-y-4">
          <LoginButton className="w-full justify-start bg-white text-emerald-600 hover:bg-emerald-100" />
          <ButtonLink
            icon={<HelpCircle className="h-5 w-5" />}
            className="w-full justify-start bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
          >
            Ayuda en línea
          </ButtonLink>

          <ButtonLink
            icon={<FileText className="h-5 w-5" />}
            className="w-full justify-start bg-amber-100 text-amber-700 hover:bg-amber-200"
          >
            Términos y condiciones
          </ButtonLink>

          <ButtonLink
            icon={<Lock className="h-5 w-5" />}
            className="w-full justify-start bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            Políticas de privacidad
          </ButtonLink>
        </div>
      </main>
    </div>
  );
}
