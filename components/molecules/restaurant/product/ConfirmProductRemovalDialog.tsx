"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface Props {
  productName: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ConfirmProductRemovalDialog({
  productName,
  open,
  onConfirm,
  onCancel,
  isLoading,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-red-600">
            <div className="rounded-full bg-red-100 p-2">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <span>Confirmar Eliminación</span>
          </DialogTitle>
          <DialogDescription className="pt-4 text-sm">
            ¿Estás seguro de que deseas eliminar el producto{" "}
            <span className="font-semibold">{`"${productName}"`}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 pt-4 sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            className="w-full sm:w-auto"
            isLoading={isLoading}
          >
            Sí, Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
