import type { IFavoriteProductList, IProduct } from '~/types';

export interface IFavoriteProductsList {
  products?: IProduct[];
  list: IFavoriteProductList | null;
  isFavorite: (id: number) => boolean;
  onFavorite: (product_id: number, isFavorite: boolean) => void;
}
