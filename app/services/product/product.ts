import axios, { type AxiosResponse } from 'axios';
import type { IProduct } from '~/types';
import { handleServiceError } from '../utils/utils';

const ProductService = () => {
  const getProducts = async () => {
    try {
      return await axios.get(`${import.meta.env.VITE_FAKE_API}?limit=20`);
    } catch (error) {
      const serviceError = handleServiceError(
        error,
        'Eu inesperado ao buscar produtos. Tente novamente depois de algum tempo'
      );
      throw serviceError;
    }
  };

  const getProductsByIds = async (ids: number[]): Promise<IProduct[]> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const promises: Promise<AxiosResponse<any, any>>[] = [];
      const products: IProduct[] = [];

      ids.forEach((id) => {
        const promise = axios.get(`${import.meta.env.VITE_FAKE_API}/${id}`);
        promises.push(promise);
      });

      const responses = await Promise.all(promises);

      responses.forEach((response) => {
        products.push(response.data);
      });

      return products;
    } catch (error) {
      const serviceError = handleServiceError(
        error,
        'Eu inesperado ao buscar produtos. Tente novamente depois de algum tempo'
      );
      throw serviceError;
    }
  };

  return {
    getProducts,
    getProductsByIds,
  };
};

const productService = ProductService();

export default productService;
