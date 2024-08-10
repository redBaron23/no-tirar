import LoginButton from "@/components/atoms/LoginButton";
import { APP_NAME } from "@/constants";
import { auth } from "@/lib/auth";
import { getCurrentUserOrders } from "@/lib/queries/orderQueries";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default async function Page() {
  const orders = await getCurrentUserOrders();
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
              ¡Bienvenido a {APP_NAME}!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Ahorra dinero y combate el desperdicio de alimentos
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                ¿Por qué unirte?
              </h2>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center text-gray-600">
                  <ShoppingBag className="mr-2 h-5 w-5 text-teal-500" />
                  Descuentos en comida de calidad
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-500" />
                  Ayuda a reducir el desperdicio de alimentos
                </li>
                <li className="flex items-center text-gray-600">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-500" />
                  Descubre nuevos restaurantes locales
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
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Mis Pedidos</h1>
      {orders.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg bg-white p-4 shadow-md">
              {/* Order details here */}
              <p>Detalles del pedido {order.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <ShoppingBag className="mx-auto h-12 w-12 text-teal-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Aún no tienes pedidos
          </h2>
          <p className="mt-2 text-gray-600">
            ¡Comienza a usar {APP_NAME} para ver tus pedidos aquí!
          </p>
        </div>
      )}
    </div>
  );
}
