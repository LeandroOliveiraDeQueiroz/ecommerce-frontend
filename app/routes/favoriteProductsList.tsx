import { useCallback, useEffect } from "react";
import type { Route } from "./+types/home";
import { PrivateRoute } from "~/components-hoc/privateRoute/privateRoute";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";
import { FavoriteProductsList } from "~/pages/favoriteProductsList/favoriteProductList";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import productService from "~/services/product/product";
import type { IProduct } from "~/types";
import { useRevalidator, useSubmit } from "react-router";
import { useSnackbar } from "notistack";
import { isIServiceError } from "~/services/utils/utils";
import { FavoriteProductsListShimmer } from "~/pages/favoriteProductsList/favoriteProductListShimmer";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "E-commerce - Criar lista de Produtos favoritos" },
        { name: "Lista de todos os produtos", content: "List of the products" },
    ];
}

export async function clientAction({
    request,
}: Route.ClientActionArgs) {
    const formData = await request.formData();
    const productId = formData.get("productId");
    const storedToken = localStorage.getItem('authToken');

    if (!storedToken) {
        return { error: true, message: "Erro inesperado. Saia e logue novamente" }
    }

    try {
        return await deleteFavoriteProduct({ storedToken, productId });
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

async function deleteFavoriteProduct({ storedToken, productId }: IHandleIntentParams) {
    const parserProductId = parseInt(productId);
    const success = await favoriteProductsListService.removeProduct({ accessToken: storedToken, productId: parserProductId });

    if (!success) {
        throw Error(`${success}`);
    }

    return { success: true, message: "Produto excluido com sucesso", method: "delete", productId: parserProductId }
}

export const clientLoader = async ({ }: Route.ClientLoaderArgs) => {
    const favoriteProducts = JSON.parse(localStorage.getItem('favorite_products') || "[]");

    try {
        if (!favoriteProducts) {
            return { error: true, message: "Cache erro, logue novamente" }
        }

        const products: IProduct[] = await productService.getProductsByIds(favoriteProducts);
        return { products };
    } catch (error) {
        if (isIServiceError(error)) {
            return { products: [], error: true, message: error.message }
        }

        console.error(error);
        return { products: [], error: true, message: "Erro inesperado ao carregar dados" }
    }
}

export function HydrateFallback() {
    return <FavoriteProductsListShimmer />
        ;
}

export default function FavoriteProductsPage({ loaderData, actionData }: Route.ComponentProps) {
    const { products, error, message } = loaderData;
    const { list, deleteFavoriteProduct } = useFavoriteProductListContext();
    const { enqueueSnackbar } = useSnackbar();
    const submit = useSubmit();
    const { revalidate } = useRevalidator();

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
            if (actionData?.method === "delete") {
                deleteFavoriteProduct({ favorite_product_id: actionData?.productId })
                revalidate()
            }
            enqueueSnackbar(actionData?.message, { variant: 'success' });
        }

    }, [actionData, enqueueSnackbar, deleteFavoriteProduct, revalidate])


    const handleIsFavorite = useCallback((id: number) => {
        const set = new Set(list?.favorite_products);
        return set.has(id);
    }, [list])

    const handleRemoveFavorite = useCallback((productId: number, _: boolean) => {
        const formData = new FormData();
        formData.append('productId', `${productId}`);
        submit(formData, { method: 'post' });
    }, [submit]);


    return (
        <PrivateRoute>
            <FavoriteProductsList products={products} list={list} isFavorite={handleIsFavorite} onFavorite={handleRemoveFavorite} />
        </PrivateRoute>
    );
}
