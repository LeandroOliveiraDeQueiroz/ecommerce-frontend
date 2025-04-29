import type { IFavoriteProductList } from "~/types";

export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginData {
  name: string;
  accessToken: string;
  favoriteProductsList?: IFavoriteProductList;
}

export interface ISigninParams {
  name: string;
  email: string;
  password: string;
}
