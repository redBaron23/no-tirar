"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RestaurantWithPartialProduct } from "@/lib/queries/restaurantQueries";
import Image from "next/image";
import { useState } from "react";
import Counter from "./molecules/Counter";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  restaurant: RestaurantWithPartialProduct;
}

const phoneNumber = "542216790804";

export function ReserveModal({
  onSuccess,
  onClose,
  restaurant,
  ...props
}: Props) {
  const { currentPrice } = restaurant.products[0];

  const [price, setPrice] = useState(currentPrice);
  const [quantity, setQuantity] = useState(1);

  const message = `Hola, me gustaría pedir ${quantity} de type a ${price}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleChangeQuantity = (newQuantity: number) => {
    const newPrice = currentPrice * newQuantity;

    setQuantity(newQuantity);
    setPrice(newPrice);
  };

  const handleReserve = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <Image
                src={restaurant.profileImageUrl || ""}
                alt="Restaurant Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span className="font-semibold">{restaurant.name}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Pickup in 30-45 mins
          </div>
        </div>
        <div className="grid gap-6 p-6">
          <div className="flex flex-col gap-2">
            <Label className="mb-2 font-semibold" htmlFor="payment">
              Payment Method
            </Label>
            <RadioGroup
              className="grid grid-cols-3 gap-4"
              defaultValue="cash"
              id="payment"
            >
              <Label
                className="flex cursor-pointer items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 [&:has([data-state=checked])]:border-gray-900 dark:[&:has([data-state=checked])]:border-gray-50"
                htmlFor="cash"
              >
                <RadioGroupItem
                  className="peer sr-only"
                  id="cash"
                  value="cash"
                />
                <DollarSignIcon className="h-5 w-5" />
                Cash
              </Label>
            </RadioGroup>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Label className="font-semibold" htmlFor="quantity">
                Quantity
              </Label>
              <Counter
                quantity={quantity}
                onChangeQuantity={handleChangeQuantity}
              />
            </div>
            <div className="text-2xl font-bold">$ {price}</div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Prices are subject to change. Taxes and fees may apply.
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleReserve}
              className="w-full rounded-lg bg-green-500 py-3 font-semibold text-white hover:bg-green-600"
            >
              Reserve
            </Button>
            <Button
              onClick={onClose}
              className="w-full rounded-lg rounded-md border border-black bg-white py-3 font-semibold text-black transition-colors hover:bg-gray-100 dark:border-black dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DollarSignIcon(props: any) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
