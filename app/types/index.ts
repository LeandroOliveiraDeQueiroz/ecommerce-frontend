export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface IFavoriteProduct extends IProduct {
  isFavorite?: boolean;
}

export interface IFavoriteProductList {
  description: string;
  favorite_products: number[];
  product_quantity: number;
  title: string;
}

export interface IGetNavLinkStyle {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}
