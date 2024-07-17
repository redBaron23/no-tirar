"use client";

import { pages } from "@/constants/pages";
import { RestaurantWithPartialProduct } from "@/lib/queries/restaurantQueries";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReserveModal } from "../reserve-modal";

interface Props {
  restaurant: RestaurantWithPartialProduct;
}

const ReserveButton = ({ restaurant }: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);

    router.push(pages.home);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full rounded-lg bg-green-500 py-3 font-semibold text-white"
      >
        Reserve
      </button>
      <ReserveModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        restaurant={restaurant}
      />
    </>
  );
};

export default ReserveButton;
