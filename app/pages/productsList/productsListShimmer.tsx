import { ProductCatalogShimmer } from "~/components/productCatalog/productCatalogShimmer";

export function ProductsListShimmer() {
  return (
    <div className="flex-1 flex flex-col pl-3 pr-3">
      <h1 className="text-2xl m-auto mt-3 mb-3">Lista de Produtos</h1>
      <ProductCatalogShimmer />
    </div>
  );
}

