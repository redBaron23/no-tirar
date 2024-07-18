"use client";

import { createOrder } from "@/app/actions/order/createOrder";
import { createOrderSchema } from "@/app/actions/order/schemas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PAYMENT_OPTIONS } from "@/constants";
import { RestaurantWithPartialProduct } from "@/lib/queries/restaurantQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentMethodType } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormCounter from "./atoms/form-inputs/FormCounter";
import FormRadioGroup from "./atoms/form-inputs/FormRadioGroup";
import { Form } from "./ui/form";
import { useToast } from "./ui/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  restaurant: RestaurantWithPartialProduct;
}

type FormSchema = z.infer<typeof createOrderSchema>;

export function ReserveModal({
  onSuccess,
  onClose,
  restaurant,
  ...props
}: Props) {
  const { currentPrice, id } = restaurant.products[0];
  const { toast } = useToast();

  const boundCreateOrder = createOrder.bind(null, id);

  const { execute, isExecuting } = useAction(boundCreateOrder, {
    onSuccess: () => {
      toast({
        title: "Orden creada exitosamente",
        description: "Tu bolsa sorpresa ha sido reservada.",
      });
      onSuccess();
    },
    onError: (error) => {
      console.error("Error al crear la orden:", error);
      toast({
        variant: "destructive",
        title: "Error al crear la orden",
        description:
          "No se pudo reservar la bolsa sorpresa. Por favor, intenta de nuevo.",
      });
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      quantity: 1,
      paymentMethod: PaymentMethodType.CASH,
    },
  });

  const { control, handleSubmit, watch } = form;

  const quantity = watch("quantity");
  const displayedPrice = quantity * currentPrice;

  const onSubmit = (data: FormSchema) => {
    execute(data);
  };

  return (
    <Dialog {...props} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogTitle className="text-lg font-semibold">
          Reservar Bolsa Sorpresa
        </DialogTitle>
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <Image
                src={restaurant.profileImageUrl || ""}
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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
            <div className="flex flex-col gap-2">
              <FormRadioGroup
                control={control}
                name="paymentMethod"
                label="Método de Pago"
                options={PAYMENT_OPTIONS}
                description="Selecciona tu método de pago preferido"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <FormCounter
                  control={control}
                  name="quantity"
                  label="Cantidad"
                  maxQuantity={100}
                />
              </div>
              <div className="text-2xl font-bold">
                $ {displayedPrice.toFixed(2)}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Los precios están sujetos a cambios. Pueden aplicarse impuestos y
              cargos adicionales.
            </div>
            <div className="flex flex-col gap-2">
              <Button
                className="w-full bg-green-500 font-semibold text-white hover:bg-green-600"
                disabled={quantity === 0}
                type="submit"
                isLoading={isExecuting}
              >
                Reservar
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full font-semibold"
                type="button"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
