import type { IProduct } from "~/types";

export interface IProductCatalogProps {
  products: IProduct[];
  isFavorite?: (id: number) => boolean;
  onFavorite: (productId: number, isFavorite: boolean) => void;
}
