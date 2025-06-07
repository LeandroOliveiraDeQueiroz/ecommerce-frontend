import type { IProduct } from '~/types';

export interface IProductsLit {
  products: IProduct[];
  isFavorite?: (id: number) => boolean;
  onFavorite: (product_id: number, isFavorite: boolean) => void;
}
