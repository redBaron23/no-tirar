"use client";

import { useState } from "react";
import { ReserveModal } from "../reserve-modal";
import { RestaurantType } from "@/lib/validations/RestaurantValidation";

const makePayment = () => {};

interface Props {
  restaurant: RestaurantType;
}

const ReserveButton = ({ restaurant }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        onSuccess={makePayment}
        restaurant={restaurant}
      />
    </>
  );
};

export default ReserveButton;
