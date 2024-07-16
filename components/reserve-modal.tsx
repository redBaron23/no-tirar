"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RestaurantWithPartialProduct } from "@/lib/queries/restaurantQueries";
import { BanknoteIcon, CreditCardIcon, WalletIcon } from "lucide-react";
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
  const [paymentMethod, setPaymentMethod] = useState("efectivo");

  const message = `Hola, me gustaría reservar ${quantity} bolsa(s) sorpresa de ${restaurant.name} por $${price}. Pagaré con ${paymentMethod}.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleChangeQuantity = (newQuantity: number) => {
    const newPrice = currentPrice * newQuantity;
    setQuantity(newQuantity);
    setPrice(newPrice);
  };

  const handleReserve = () => {
    window.open(whatsappUrl, "_blank");
    onSuccess();
    onClose();
  };

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogTitle className="text-lg font-semibold">
          Reservar Bolsa Sorpresa
        </DialogTitle>
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <Image
                src={
                  restaurant.profileImageUrl || "/default-restaurant-logo.png"
                }
                alt="Logo del Restaurante"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span className="font-semibold">{restaurant.name}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Retiro en 30-45 min
          </div>
        </div>
        <div className="grid gap-6 py-4">
          <div className="flex flex-col gap-2">
            <Label className="mb-2 font-semibold" htmlFor="payment">
              Método de Pago
            </Label>
            <RadioGroup
              className="grid grid-cols-3 gap-4"
              defaultValue="efectivo"
              id="payment"
              onValueChange={setPaymentMethod}
            >
              {[
                { value: "efectivo", label: "Efectivo", icon: BanknoteIcon },
                { value: "tarjeta", label: "Tarjeta", icon: CreditCardIcon },
                {
                  value: "mercadopago",
                  label: "MercadoPago",
                  icon: WalletIcon,
                },
              ].map(({ value, label, icon: Icon }) => (
                <Label
                  key={value}
                  className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  htmlFor={value}
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id={value}
                    value={value}
                  />
                  <Icon className="mb-2 h-6 w-6" />
                  {label}
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Label className="font-semibold" htmlFor="quantity">
                Cantidad
              </Label>
              <Counter
                quantity={quantity}
                onChangeQuantity={handleChangeQuantity}
              />
            </div>
            <div className="text-2xl font-bold">$ {price.toFixed(2)}</div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Los precios están sujetos a cambios. Pueden aplicarse impuestos y
            cargos adicionales.
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleReserve}
              className="w-full bg-green-500 font-semibold text-white hover:bg-green-600"
              disabled={quantity === 0}
            >
              Reservar
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full font-semibold"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
