"use client";

import { updateProduct } from "@/app/actions/product/createProduct";
import { updateProductSchema } from "@/app/actions/product/schemas";
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
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductStatus, ProductType } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
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

type FormSchema = z.infer<typeof updateProductSchema>;

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function EditProductDialog({ open, onClose, product }: Props) {
  const { executeAsync, isExecuting } = useAction(updateProduct);

  const form = useForm<FormSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      type: product.type,
      category: product.category,
      regularPrice: product.regularPrice as unknown as number, // @TODO improve typing
      currentPrice: product.currentPrice as unknown as number,
      image: product.imageUrl,
      quantity: product.quantity,
      description: product.description,
      status: product.status,
      restaurantId: product.restaurantId,
    },
  });
  const { toast } = useToast();

  const { control, handleSubmit } = form;

  const onSubmit = async (data: FormSchema) => {
    console.log("Form data:", data);
    try {
      const result = await executeAsync(data);
      if (result?.data?.success) {
        toast({ title: "Producto actualizado exitosamente" });
        onClose();
      } else {
        console.error("Error updating product:", result?.serverError);
        toast({
          variant: "destructive",
          title: "Error al actualizar el producto",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Error al actualizar el producto",
      });
    }
  };

  const onCancel = () => {
    onClose();
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader className="px-2">
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>
            Modifique los detalles del producto
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
                    defaultUrl={product.imageUrl}
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
                  <FormSelect
                    control={control}
                    name="status"
                    label="Estado del Producto"
                    options={productStatusOptions}
                    placeholder="Seleccione el estado del producto"
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
                  Actualizar Producto
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
