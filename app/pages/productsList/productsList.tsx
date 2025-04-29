import type { IProduct } from "~/types";
import { ProductCatalog } from "~/components/productCatalog/productCatalog";

export function ProductsList({ products, isFavorite }: { products: IProduct[], isFavorite?: (id: number) => boolean }) {
  return (
    <div className="flex-1 flex flex-col pl-3 pr-3">
      <h1 className="text-2xl m-auto mt-3 mb-3">Lista de Produtos</h1>
      <ProductCatalog products={products} isFavorite={isFavorite} />
    </div>
  );
}

