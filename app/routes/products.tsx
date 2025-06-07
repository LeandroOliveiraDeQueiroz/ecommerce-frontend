import type { IProduct } from "~/types";
import type { Route } from "./+types/home";
import { ProductsList } from "~/pages/productsList/productsList";
import productService from "~/services/product/product";
import { Loading } from "~/components/loading/loading";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";
import { useCallback, useEffect } from "react";
import { useSubmit } from "react-router";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import { useSnackbar } from "notistack";
import { isIServiceError } from "~/services/utils/utils";
import { ProductsListShimmer } from "~/pages/productsList/productsListShimmer";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "E-commerce - Produtos" },
    { name: "Lista de todos os produtos", content: "List of the products" },
  ];
}

export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const productId = formData.get("productId");
  const intent = formData.get("intent");
  const storedToken = localStorage.getItem('authToken');

  if (!storedToken) {
    return { error: true, message: "Usuário não logado" }
  }

  try {

    if (intent === "addProduct") {
      return await addFavoriteProduct({ storedToken, productId });
    } else if (intent === "deleteProduct") {
      return await deleteFavoriteProduct({ storedToken, productId });
    } else {
      throw Error('No existent intent');
    }

  } catch (error) {
    if (isIServiceError(error)) {
      return { error: true, message: error.message }
    }

    console.error(error);
    return { error: true, message: "Erro inesperado" }
  }

}

interface IHandleIntentParams {
  storedToken: string;
  productId: string
}

async function addFavoriteProduct({ storedToken, productId }: IHandleIntentParams) {
  const parserProductId = parseInt(productId);
  const success = await favoriteProductsListService.addProduct({ accessToken: storedToken, productId: parserProductId });

  if (!success) {
    throw Error(`${success}`);
  }

  return {
    success: true, message: "Produto adicionado com sucesso", method: "add", productId: parserProductId
  }

}

async function deleteFavoriteProduct({ storedToken, productId }: IHandleIntentParams) {
  const parserProductId = parseInt(productId);
  const success = await favoriteProductsListService.removeProduct({ accessToken: storedToken, productId: parserProductId });

  if (!success) {
    throw Error(`${success}`);
  }

  return { success: true, message: "Produto excluido com sucesso", method: "delete", productId: parserProductId }
}

export const clientLoader = async (): Promise<{ products: IProduct[], error?: boolean, message?: string }> => {
  try {
    const response = await productService.getProducts();
    const products: IProduct[] = response.data;
    return { products, };
  } catch (error) {
    if (isIServiceError(error)) {
      return { products: [], error: true, message: error.message }
    }

    console.error(error);
    return { products: [], error: true, message: "Erro inesperado ao carregar dados" }
  }
}

export function HydrateFallback() {
  return <ProductsListShimmer />;
}

export default function Products({ loaderData, actionData }: Route.ComponentProps) {
  const { products, error, message } = loaderData;
  const { list, addFavoriteProduct, deleteFavoriteProduct } = useFavoriteProductListContext();
  const submit = useSubmit();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(message, { variant: 'error' });
    }
  }, [error, message, enqueueSnackbar])

  useEffect(() => {
    if (actionData?.error) {
      enqueueSnackbar(actionData?.message || "Erro inesperado", { variant: 'error' });
      return;
    }

    if (actionData?.success) {
      if (actionData?.method === "add") addFavoriteProduct({ favorite_product_id: actionData?.productId })
      if (actionData?.method === "delete") deleteFavoriteProduct({ favorite_product_id: actionData?.productId })
      enqueueSnackbar(actionData?.message, { variant: 'success' });
    }

  }, [actionData, enqueueSnackbar])


  const handleIsFavorite = useCallback((id: number) => {
    const set = new Set(list?.favorite_products);
    return set.has(id);
  }, [list])

  const handleFavorite = useCallback((productId: number, isFavorite: boolean) => {
    const formData = new FormData();
    formData.append('productId', `${productId}`);
    formData.append('intent', `${isFavorite ? "deleteProduct" : "addProduct"}`);
    submit(formData, { method: 'post' });
  }, [submit]);


  return <ProductsList products={products} isFavorite={list ? handleIsFavorite : undefined} onFavorite={handleFavorite} />;
}
