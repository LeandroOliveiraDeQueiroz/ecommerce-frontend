import type { IFavoriteProductList } from "~/types";

export interface IFavoriteProductListContextData {
  list: IFavoriteProductList | null;
  update: (title: string, description: string) => void;
  deleteList: () => void;
  create: (title: string, description: string) => void;
  get: (list: IFavoriteProductList) => void;
}
