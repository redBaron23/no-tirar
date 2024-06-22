import LoginButton from "@/components/atoms/LoginButton";
import { pages } from "@/constants/pages";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaUtensils,
  FaPiggyBank,
  FaGlobeAmericas,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "No-tirar: Rescata comida, ahorra dinero, salva el planeta",
  description:
    "Únete a No-tirar y sé parte de la revolución contra el desperdicio de alimentos. Descubre ofertas increíbles en comida que de otro modo se desperdiciaría, ahorra dinero y ayuda al medio ambiente.",
};

export default function GetStarted() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-teal-50 to-white text-gray-800">
      <header className="sticky top-0 z-10 bg-teal-500 p-4 shadow-md transition-all duration-300 ease-in-out">
        <nav className="container mx-auto flex items-center justify-between">
          <Image
            src="/images/logo.png"
            alt="No-tirar Logo"
            width={80}
            height={80}
            className="rounded-full transition-transform duration-300 hover:scale-105"
          />
          <LoginButton />
        </nav>
      </header>

      <main className="container mx-auto flex-grow px-4 py-8 sm:py-16">
        <section className="mb-12 text-center sm:mb-20">
          <h1 className="mb-4 text-4xl font-bold text-teal-600 transition-all duration-500 hover:text-teal-700 sm:text-5xl md:text-6xl lg:text-7xl">
            Salva comida, ahorra dinero
          </h1>
          <p className="mb-8 text-lg text-gray-600 sm:text-xl md:text-2xl">
            Rescata deliciosas comidas a precios increíbles
          </p>
          <Link
            href={pages.home}
            className="group relative overflow-hidden rounded-full bg-teal-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-teal-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-300 sm:px-10 sm:py-4"
          >
            <span className="relative z-10">¡Empieza a rescatar!</span>
            <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-amber-500 transition-transform duration-300 group-hover:scale-100"></span>
          </Link>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Rescata",
              description:
                "Encuentra y compra comida excedente de restaurantes y tiendas locales.",
              icon: FaUtensils,
            },
            {
              title: "Ahorra",
              description:
                "Disfruta de deliciosas comidas a una fracción del precio original.",
              icon: FaPiggyBank,
            },
            {
              title: "Impacta",
              description:
                "Reduce el desperdicio de alimentos y ayuda a proteger nuestro planeta.",
              icon: FaGlobeAmericas,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-4 text-4xl text-teal-500">
                <item.icon className="transition-all duration-300 group-hover:scale-110 group-hover:text-amber-500" />
              </div>
              <h2 className="mb-3 text-2xl font-semibold text-teal-600 transition-colors duration-300 group-hover:text-amber-500">
                {item.title}
              </h2>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      <footer className="mt-12 bg-teal-600 py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Sobre Nosotros</h3>
              <p className="text-teal-100">
                No-tirar es una plataforma dedicada a reducir el desperdicio de
                alimentos y ayudar a las personas a ahorrar dinero.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                {["Inicio", "Cómo funciona", "Restaurantes", "Contacto"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="transition-colors duration-200 hover:text-amber-300"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
              <p className="text-teal-100">Email: info@no-tirar.com</p>
              <p className="text-teal-100">Teléfono: +34 123 456 789</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Síguenos</h3>
              <div className="flex space-x-4">
                {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-2xl transition-all duration-300 hover:scale-110 hover:text-amber-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-teal-500 pt-8 text-center">
            <p>&copy; {currentYear} No-tirar. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
