import axios from "axios";
import type {
  ICreateParams,
  IDeleteParams,
  IGetParams,
  IUpdateParams,
} from "./types";
import type { IFavoriteProductList } from "~/types";

const FavoriteProductsListService = () => {
  const create = async ({ title, description, accessToken }: ICreateParams) => {
    const response = await axios.post(
      `${import.meta.env.VITE_MONOLITH_API}/favorite-products-list/create`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return true;
    }

    return false;
  };

  const read = async ({
    accessToken,
  }: IGetParams): Promise<IFavoriteProductList | null> => {
    const response = await axios.get(
      `${import.meta.env.VITE_MONOLITH_API}/favorite-products-list/`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data as IFavoriteProductList;
    }

    return null;
  };

  const update = async ({ title, description, accessToken }: IUpdateParams) => {
    const response = await axios.put(
      `${import.meta.env.VITE_MONOLITH_API}/favorite-products-list/update`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return true;
    }

    return false;
  };

  const deleteList = async ({ accessToken }: IDeleteParams) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_MONOLITH_API}/favorite-products-list/delete`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return true;
    }

    return false;
  };

  return {
    create,
    read,
    update,
    deleteList,
  };
};

const favoriteProductsListService = FavoriteProductsListService();

export default favoriteProductsListService;
