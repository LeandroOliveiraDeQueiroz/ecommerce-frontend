import type { IProduct } from "~/types";
import type { Route } from "./+types/home";
import { ProductsList } from "~/pages/productsList/productsList";
import productService from "~/services/product/product";
import { Loading } from "~/components/loading/loading";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";
import { useCallback } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Luizalabs Produtos" },
    { name: "Lista de todos os produtos", content: "List of the products" },
  ];
}

export const clientLoader = async (): Promise<{ products: IProduct[] }> => {
  try {

    const response = await productService.getProducts();
    const products: IProduct[] = response.data;
    return { products };
  } catch (error) {
    return { products: [] }
  }
}

export function HydrateFallback() {
  return <Loading />;
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  const { list } = useFavoriteProductListContext();
  console.log("products:", products)

  const handleFavorite = useCallback((id: number) => {
    const set = new Set(list?.favorite_products);
    return set.has(id);
  }, [list])


  return <ProductsList products={products} isFavorite={list ? handleFavorite : undefined} />;
}
