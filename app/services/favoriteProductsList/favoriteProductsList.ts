import axios from 'axios';
import type {
  IAddProductParams,
  ICreateParams,
  IDeleteParams,
  IGetParams,
  IUpdateParams,
} from './types';
import type { IFavoriteProductList } from '~/types';
import { handleServiceError } from '../utils/utils';

const FavoriteProductsListService = () => {
  const create = async ({ title, description, accessToken }: ICreateParams) => {
    try {
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
    } catch (error) {
      const serviceError = handleServiceError(error);
      throw serviceError;
    }
  };

  const read = async ({
    accessToken,
  }: IGetParams): Promise<IFavoriteProductList | null> => {
    try {
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
    } catch (error) {
      const serviceError = handleServiceError(error);
      throw serviceError;
    }
  };

  const update = async ({ title, description, accessToken }: IUpdateParams) => {
    try {
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
    } catch (error) {
      const serviceError = handleServiceError(error);
      throw serviceError;
    }
  };

  const deleteList = async ({ accessToken }: IDeleteParams) => {
    try {
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
    } catch (error) {
      const serviceError = handleServiceError(error);
      throw serviceError;
    }
  };

  const addProduct = async ({ productId, accessToken }: IAddProductParams) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_MONOLITH_API
        }/favorite-products-list/add-product`,
        {
          product_id: productId,
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
    } catch (error) {
      const serviceError = handleServiceError(error);
      throw serviceError;
    }
  };

  const removeProduct = async ({
    productId,
    accessToken,
  }: IAddProductParams) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_MONOLITH_API
        }/favorite-products-list/remove-product`,
        {
          product_id: productId,
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
    } catch (error) {
      const serviceError = handleServiceError(error);
      throw serviceError;
    }
  };

  return {
    create,
    read,
    update,
    deleteList,
    addProduct,
    removeProduct,
  };
};

const favoriteProductsListService = FavoriteProductsListService();

export default favoriteProductsListService;
