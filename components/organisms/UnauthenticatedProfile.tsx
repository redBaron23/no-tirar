import Image from "next/image";
import { CiLogin, CiCircleInfo, CiLock } from "react-icons/ci";
import { PiHeadset } from "react-icons/pi";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { pages } from "@/constants/pages";
import ButtonLink from "../atoms/ButtonLink";
import { LoginLink } from "../atoms/LoginButton";

export default async function UnauthenticatedProfile() {
  return (
    <div className="flex flex-col gap-20 p-4">
      <div className="flex flex-col items-center">
        <Link
          href={pages.discover}
          className="hidden self-start rounded-full bg-white p-1 transition-transform duration-200 hover:scale-110 lg:block"
        >
          <FiArrowLeft className="h-6 w-6 text-gray-500" />
        </Link>
        <Image
          src="/images/logo.png"
          alt="No-tirar Logo"
          width={80}
          height={80}
          className="rounded-full transition-transform duration-300 hover:scale-105"
        />
        <h1 className="text-2xl">Te damos la bienvenida</h1>
      </div>
      <div className="flex flex-col gap-8 text-sm md:text-base">
        <LoginLink />
        <ButtonLink icon={<PiHeadset />}>Ayuda en linea</ButtonLink>
        <ButtonLink icon={<CiCircleInfo />}>Terminos y condiciones</ButtonLink>
        <ButtonLink icon={<CiLock />}>Politicas de privacidad</ButtonLink>
      </div>
    </div>
  );
}
