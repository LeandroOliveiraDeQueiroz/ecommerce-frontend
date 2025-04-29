import type { IProduct } from "~/types";

export interface IProductCatalogProps {
  products: IProduct[];
  isFavorite?: (id: number) => boolean;
}
