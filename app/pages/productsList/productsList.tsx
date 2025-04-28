import { useCallback, useEffect, useState } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import axios from "axios";
import type { IProduct } from "~/types";
import { ProductCatalog } from "~/components/productCatalog/productCatalog";
import productService from "~/services/product/product";


export function ProductsList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = useCallback(async () => {
    try {
      const response = await productService.getProducts();
      const products: IProduct[] = response.data;
      setProducts(products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    getProducts();
  }, [getProducts]);


  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-2xl m-auto mt-3 mb-3">Lista de Produtos</h1>
      <ProductCatalog products={products} loading={loading} />
    </div>
  );
}

