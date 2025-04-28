import axios, { type AxiosResponse } from "axios";
import type { IProduct } from "~/types";

const ProductService = () => {
  const getProducts = () => {
    return axios.get(`${import.meta.env.VITE_FAKE_API}?limit=20`);
  };

  const getProductsByIds = async (ids: number[]): Promise<IProduct[]> => {
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
  };

  return {
    getProducts,
    getProductsByIds,
  };
};

const productService = ProductService();

export default productService;
