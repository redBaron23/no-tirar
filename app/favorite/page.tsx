import LoginButton from "@/components/atoms/LoginButton";
import RestaurantCardList from "@/components/organisms/RestaurantCardList";
import { APP_NAME } from "@/constants";
import { auth } from "@/lib/auth";
import { getFavoriteRestaurants } from "@/lib/queries/userQueries";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";

export default async function FavoritesPage() {
  const favorites = await getFavoriteRestaurants();
  const session = await auth();

  if (!session?.user.id) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white px-4 py-12 sm:px-6 lg:px-8">
        <main className="mx-auto max-w-lg">
          <div className="text-center">
            <Image
              src="/images/logo.png"
              alt={`${APP_NAME} Logo`}
              width={120}
              height={120}
              className="mx-auto rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <h1 className="mt-6 text-3xl font-extrabold text-teal-600 sm:text-4xl">
              ¡Descubre tus favoritos en {APP_NAME}!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Guarda tus ofertas preferidas y no te pierdas ninguna oportunidad
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Beneficios de tener una cuenta
              </h2>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center text-gray-600">
                  <Heart className="mr-2 h-5 w-5 text-teal-500" />
                  Guarda tus restaurantes y ofertas favoritas
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-500" />
                  Recibe notificaciones de nuevas ofertas
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-500" />
                  Accede rápidamente a tus preferencias
                </li>
              </ul>
            </div>
            <LoginButton className="w-full justify-center rounded-lg bg-teal-600 py-3 text-lg font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Mis Favoritos</h1>
      {favorites.length ? (
        <RestaurantCardList restaurants={favorites} />
      ) : (
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <Heart className="mx-auto h-12 w-12 text-teal-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Aún no tienes favoritos
          </h2>
          <p className="mt-2 text-gray-600">
            Explora {APP_NAME} y guarda tus ofertas favoritas para verlas aquí
          </p>
        </div>
      )}
    </div>
  );
}
