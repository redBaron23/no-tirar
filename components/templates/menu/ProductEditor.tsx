import { ProductStatus, ProductType } from "@prisma/client";
import dayjs from "dayjs";
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import Image from "next/image";

import UserAvatar from "@/components/atoms/profile/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts } from "@/lib/queries/productQueries";

interface Props {
  restaurantId: string;
}

const getStatusBadgeVariant = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "default";
    case ProductStatus.DRAFT:
      return "secondary";
    case ProductStatus.ARCHIVED:
      return "destructive";
    default:
      return "outline";
  }
};

const translateStatus = (status: ProductStatus) => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "Activo";
    case ProductStatus.DRAFT:
      return "Borrador";
    case ProductStatus.ARCHIVED:
      return "Archivado";
    default:
      return status;
  }
};

const translateProductType = (type: ProductType) => {
  switch (type) {
    case ProductType.SURPRISE:
      return "Sorpresa";
    default:
      return type;
  }
};

export async function ProductEditor({ restaurantId }: Props) {
  const products = await getProducts(restaurantId);

  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:px-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-0">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-full rounded-lg bg-background pl-8 md:w-[320px] lg:w-[400px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <UserAvatar />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Soporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main>
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Activos</TabsTrigger>
                <TabsTrigger value="draft">Borradores</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archivados
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filtrar
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Activos
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Borradores
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archivados
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Exportar
                  </span>
                </Button>
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Añadir Producto
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Productos</CardTitle>
                  <CardDescription>
                    Gestiona tus productos y visualiza su rendimiento de ventas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Imagen</span>
                        </TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Tipo
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Categoría
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Precio Regular
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Ventas
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Última Modificación
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Acciones</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="hidden sm:table-cell">
                            <Image
                              alt={`Imagen de ${product.name}`}
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={product.imageUrl || "/placeholder.svg"}
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(product.status)}
                            >
                              {translateStatus(product.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            ${product.currentPrice.toFixed(2)}
                          </TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {translateProductType(product.type)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.category || "N/A"}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            ${product.regularPrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {product.salesCount}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {dayjs(product.updatedAt).format(
                              "D MMM, YYYY HH:mm",
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Abrir menú</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Eliminar</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Mostrando <strong>{products.length}</strong> productos
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
