"use client";

import { createProduct } from "@/app/actions/product/createProduct";
import { createProductSchema } from "@/app/actions/product/schemas";
import FormCounter from "@/components/atoms/form-inputs/FormCounter";
import FormInput from "@/components/atoms/form-inputs/FormInput";
import FormMoneyInput from "@/components/atoms/form-inputs/FormMoneyInput";
import FormSelect from "@/components/atoms/form-inputs/FormSelect";
import FormTextarea from "@/components/atoms/form-inputs/FormTextarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductStatus, ProductType } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productTypeOptions = Object.values(ProductType).map((type) => ({
  key: type,
  value: type === ProductType.SURPRISE ? "Sorpresa" : type,
}));

const productStatusOptions = [
  { key: ProductStatus.ACTIVE, value: "Activo" },
  { key: ProductStatus.DRAFT, value: "Borrador" },
  { key: ProductStatus.ARCHIVED, value: "Archivado" },
];

interface CreateProductDialogProps {
  restaurantId: string;
}

type FormSchema = z.infer<typeof createProductSchema>;

export function CreateProductDialog({
  restaurantId,
}: CreateProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { executeAsync, result, isExecuting } = useAction(createProduct);

  const form = useForm<FormSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      type: ProductType.SURPRISE,
      status: ProductStatus.ACTIVE,
      quantity: 0,
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    try {
      await executeAsync(data);
      setOpen(false);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Añadir Producto
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader className="px-2">
          <DialogTitle>Añadir Nuevo Producto</DialogTitle>
          <DialogDescription>
            Complete los detalles del nuevo producto
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-2">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="space-y-4">
                  <FormInput
                    control={control}
                    name="name"
                    label="Nombre del Producto"
                    placeholder="Ingrese el nombre del producto"
                  />
                  <FormSelect
                    control={control}
                    name="type"
                    label="Tipo de Producto"
                    options={productTypeOptions}
                    placeholder="Seleccione el tipo de producto"
                  />
                  <FormSelect
                    control={control}
                    name="status"
                    label="Estado del Producto"
                    options={productStatusOptions}
                    placeholder="Seleccione el estado del producto"
                  />
                  <FormInput
                    control={control}
                    name="category"
                    label="Categoría"
                    placeholder="Ingrese la categoría del producto"
                  />
                </div>
                <div className="space-y-4">
                  <FormMoneyInput
                    control={control}
                    name="regularPrice"
                    label="Precio Regular"
                    placeholder="Ingrese el precio regular"
                  />
                  <FormMoneyInput
                    control={control}
                    name="currentPrice"
                    label="Precio Actual"
                    placeholder="Ingrese el precio con descuento"
                  />
                  <FormCounter
                    control={control}
                    name="quantity"
                    label="Cantidad"
                    maxQuantity={100}
                  />
                  <FormInput
                    control={control}
                    name="imageUrl"
                    label="URL de la Imagen"
                    placeholder="Ingrese la URL de la imagen"
                  />
                </div>
              </div>
              <FormTextarea
                control={control}
                name="description"
                label="Descripción"
                placeholder="Ingrese la descripción del producto"
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creando..." : "Crear Producto"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
