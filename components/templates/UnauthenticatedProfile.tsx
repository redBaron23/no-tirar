import { APP_NAME } from "@/constants";
import { FileText, HelpCircle, Lock } from "lucide-react";
import Image from "next/image";
import ButtonLink from "../atoms/ButtonLink";
import LoginButton from "../atoms/LoginButton";

export default function UnauthenticatedProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-4 py-8 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-lg">
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt={`${APP_NAME} Logo`}
            width={120}
            height={120}
            className="mx-auto rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <h1 className="mt-6 text-3xl font-extrabold text-emerald-600 sm:text-4xl">
            Te damos la bienvenida
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Estamos encantados de tenerte aquí. ¿Qué te gustaría hacer?
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <LoginButton className="w-full justify-center rounded-lg bg-emerald-600 py-3 text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:text-lg" />

          {[
            {
              icon: HelpCircle,
              text: "Ayuda en línea",
              bgColor: "bg-emerald-100",
              textColor: "text-emerald-700",
              hoverColor: "hover:bg-emerald-200",
            },
            {
              icon: FileText,
              text: "Términos y condiciones",
              bgColor: "bg-amber-100",
              textColor: "text-amber-700",
              hoverColor: "hover:bg-amber-200",
            },
            {
              icon: Lock,
              text: "Políticas de privacidad",
              bgColor: "bg-blue-100",
              textColor: "text-blue-700",
              hoverColor: "hover:bg-blue-200",
            },
          ].map((item, index) => (
            <ButtonLink
              key={index}
              icon={<item.icon className="h-5 w-5 sm:h-6 sm:w-6" />}
              className={`w-full justify-start rounded-lg ${item.bgColor} ${item.textColor} ${item.hoverColor} py-3 transition-colors sm:py-4 sm:text-lg`}
            >
              {item.text}
            </ButtonLink>
          ))}
        </div>
      </main>
    </div>
  );
}
