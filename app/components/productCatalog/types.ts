import type { IProduct } from "~/types";

export interface IProductCatalogProps {
  products: IProduct[];
  loading: boolean;
}
