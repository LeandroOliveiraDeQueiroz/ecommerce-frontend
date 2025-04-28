import type { Route } from "./+types/home";
import { ProductsList } from "~/pages/productsList/productsList";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Luizalabs Produtos" },
    { name: "Lista de todos os produtos", content: "List of the products" },
  ];
}

export default function Products() {
  return <ProductsList />;
}
