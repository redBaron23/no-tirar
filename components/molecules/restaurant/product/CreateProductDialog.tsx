"use client";

import { createProduct } from "@/app/actions/product/createProduct";
import { createProductSchema } from "@/app/actions/product/schemas";
import FormCounter from "@/components/atoms/form-inputs/FormCounter";
import FormImageInput from "@/components/atoms/form-inputs/FormImageInput";
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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductStatus, ProductType } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productTypeOptions = Object.values(ProductType).map((type) => ({
  key: type,
  value: type === ProductType.SURPRISE ? "Sorpresa" : type,
}));

interface CreateProductDialogProps {
  restaurantId: string;
}

type FormSchema = z.infer<typeof createProductSchema>;

export function CreateProductDialog({
  restaurantId,
}: CreateProductDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { executeAsync, isExecuting } = useAction(createProduct);

  const form = useForm<FormSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      type: ProductType.SURPRISE,
      status: ProductStatus.ACTIVE,
      quantity: 0,
      restaurantId: restaurantId,
    },
  });
  const { toast } = useToast();

  const { control, handleSubmit } = form;

  const onSubmit = async (data: FormSchema) => {
    console.log("Form data:", data);
    try {
      const result = await executeAsync(data);
      if (result?.data?.success) {
        toast({ title: "Producto creado exitosamente" });
        setOpen(false);

        router.refresh();
        form.reset();
      } else {
        console.error("Error creating product:", result?.serverError);
        toast({
          variant: "destructive",
          title: result?.serverError || "Error al crear el producto",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Error al crear el producto",
      });
    }
  };

  const onCancel = () => {
    setOpen(false);
    form.reset();
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
                  <FormImageInput
                    control={control}
                    name="image"
                    label="Imagen del Producto"
                    type="profile"
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
                  disabled={isExecuting}
                >
                  Cancelar
                </Button>
                <Button type="submit" isLoading={isExecuting}>
                  Crear Producto
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
