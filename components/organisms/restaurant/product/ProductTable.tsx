"use client";

import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { updateProductStatus } from "@/app/actions/product/createProduct";
import { deleteProduct } from "@/app/actions/product/deleteProduct";
import { ConfirmProductRemovalDialog } from "@/components/molecules/restaurant/product/ConfirmProductRemovalDialog";
import { EditProductDialog } from "@/components/molecules/restaurant/product/EditProductDialog";
import {
  getStatusBadgeVariant,
  translateProductType,
  translateStatus,
} from "@/lib/utils";
import { Product } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

interface ProductTableProps {
  products: Product[];
  restaurantId: string;
}

export function ProductTable({ products, restaurantId }: ProductTableProps) {
  const router = useRouter();
  const { executeAsync: executeDeleteAsync, isExecuting: isExecutingDelete } =
    useAction(deleteProduct);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const { executeAsync: executeUpdateAsync } = useAction(updateProductStatus);

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
  };

  const handleOpenDeleteModal = (product: Product) => {
    setProductToDelete(product);
  };

  const handleCloseDeleteModal = () => {
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) {
      return;
    }

    try {
      const result = await executeDeleteAsync({
        restaurantId,
        productId: productToDelete.id,
      });

      if (result?.data?.deleted) {
        router.refresh();

        setProductToDelete(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleArchive = async (product: Product) => {
    const newStatus = product.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE";

    try {
      const result = await executeUpdateAsync({
        id: product.id,
        status: newStatus,
      });

      if (result?.data?.success) {
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseEditModal = () => {
    console.log("Close");
    setProductToEdit(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Imagen</span>
            </TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Precio Actual</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead className="hidden md:table-cell">Tipo</TableHead>
            <TableHead className="hidden md:table-cell">Categoría</TableHead>
            <TableHead className="hidden lg:table-cell">
              Precio Regular
            </TableHead>
            <TableHead className="hidden lg:table-cell">Ventas</TableHead>
            <TableHead className="hidden lg:table-cell">
              Última Modificación
            </TableHead>
            <TableHead>
              <span className="sr-only">Acciones</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={`${product.id}/${index}`}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt={`Imagen de ${product.name}`}
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={product.imageUrl || "/placeholder.svg"}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(product.status)}>
                  {translateStatus(product.status)}
                </Badge>
              </TableCell>
              <TableCell>${product.currentPrice.toString()}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="hidden md:table-cell">
                {translateProductType(product.type)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {product.category || "N/A"}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                ${product.regularPrice.toString()}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {product.salesCount}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {dayjs(product.updatedAt).format("D MMM, YYYY HH:mm")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menú</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(product)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleArchive(product)}>
                      {product.status === "ACTIVE" ? "Archivar" : "Activar"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleOpenDeleteModal(product)}
                    >
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {productToEdit && (
        <EditProductDialog
          product={productToEdit}
          open={!!productToEdit}
          onClose={handleCloseEditModal}
        />
      )}

      {productToDelete && (
        <ConfirmProductRemovalDialog
          productName={productToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteModal}
          open={!!productToDelete}
          isLoading={isExecutingDelete}
        />
      )}
    </>
  );
}
