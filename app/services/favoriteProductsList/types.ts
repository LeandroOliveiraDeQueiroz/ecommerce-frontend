export interface ICreateParams {
  title: string;
  description: string;
  accessToken: string;
}

export interface IGetParams {
  accessToken: string;
}

export interface IUpdateParams {
  title: string;
  description: string;
  accessToken: string;
}

export interface IDeleteParams {
  accessToken: string;
}

export interface IAddProductParams {
  productId: number;
  accessToken: string;
}

export interface IRemoveProductParams {
  productId: number;
  accessToken: string;
}
