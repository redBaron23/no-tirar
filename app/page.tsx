import LoginButton from "@/components/atoms/LoginButton";
import { APP_NAME } from "@/constants";
import { pages } from "@/constants/pages";
import {
  Facebook,
  Globe,
  Instagram,
  Mail,
  Phone,
  PiggyBank,
  Twitter,
  Utensils,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${APP_NAME}: Rescatá comida, ahorrá dinero, salvá el planeta`,
  description: `Unite a ${APP_NAME} y sé parte de la revolución contra el desperdicio de alimentos. Descubrí ofertas increíbles en comida que de otro modo se desperdiciaría, ahorrá dinero y ayudá al medio ambiente.`,
};

export default function GetStarted() {
  const currentYear = new Date().getFullYear();

  const features = [
    {
      title: "Rescatá",
      description:
        "Encontrá y comprá comida excedente de restaurantes y tiendas locales.",
      icon: Utensils,
    },
    {
      title: "Ahorrá",
      description:
        "Disfrutá de comidas deliciosas a una fracción del precio original.",
      icon: PiggyBank,
    },
    {
      title: "Impactá",
      description:
        "Reducí el desperdicio de alimentos y ayudá a proteger nuestro planeta.",
      icon: Globe,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 to-white text-gray-800">
      <header className="sticky top-0 z-10 bg-emerald-500 p-4 shadow-md transition-all duration-300 ease-in-out">
        <nav className="container mx-auto flex items-center justify-between">
          <Image
            src="/images/logo.png"
            alt={`${APP_NAME} Logo`}
            width={60}
            height={60}
            className="rounded-full transition-transform duration-300 hover:scale-105"
          />
          <LoginButton />
        </nav>
      </header>

      <main className="container mx-auto flex-grow px-4 py-12 sm:py-20">
        <section className="mb-16 text-center sm:mb-24">
          <h1 className="mb-6 text-4xl font-bold text-emerald-600 transition-all duration-500 hover:text-emerald-700 sm:text-5xl md:text-6xl">
            Salvá comida, ahorrá dinero
          </h1>
          <p className="mb-10 text-xl text-gray-600 sm:text-2xl">
            Rescatá comidas deliciosas a precios increíbles
          </p>
          <Link
            href={pages.home}
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 sm:px-10 sm:py-4"
          >
            <span className="relative z-10">¡Empezá a rescatar!</span>
            <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-amber-500 transition-transform duration-300 group-hover:scale-100"></span>
          </Link>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center overflow-hidden rounded-lg bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-6 text-5xl text-emerald-500">
                <feature.icon className="transition-all duration-300 group-hover:scale-110 group-hover:text-amber-500" />
              </div>
              <h2 className="mb-4 text-2xl font-semibold text-emerald-600 transition-colors duration-300 group-hover:text-amber-500">
                {feature.title}
              </h2>
              <p className="text-center text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      <footer className="mt-16 bg-emerald-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Sobre Nosotros</h3>
              <p className="text-emerald-100">
                {APP_NAME} es una plataforma dedicada a reducir el desperdicio
                de alimentos y ayudar a las personas a ahorrar dinero.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                {["Inicio", "Cómo funciona", "Restaurantes", "Contacto"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="transition-colors duration-200 hover:text-amber-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
              <p className="flex items-center text-emerald-100">
                <Mail className="mr-2 h-5 w-5" /> info@{APP_NAME}.com
              </p>
              <p className="flex items-center text-emerald-100">
                <Phone className="mr-2 h-5 w-5" /> +54 11 1234 5678
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Seguinos</h3>
              <div className="flex space-x-4">
                {[Facebook, Instagram, Twitter].map((Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="text-2xl transition-all duration-300 hover:scale-110 hover:text-amber-300"
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-emerald-500 pt-8 text-center">
            <p>
              &copy; {currentYear} {APP_NAME}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
