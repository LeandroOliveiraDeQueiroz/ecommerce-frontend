import { useCallback, useEffect } from "react";
import type { Route } from "./+types/home";
import { PrivateRoute } from "~/components-hoc/privateRoute/privateRoute";
import { Loading } from "~/components/loading/loading";
import { useAuthContext } from "~/contexts/auth/auth";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";
import { FavoriteProductsList } from "~/pages/favoriteProductsList/favoriteProductList";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import productService from "~/services/product/product";
import type { IFavoriteProductList, IProduct } from "~/types";
import { useRevalidator, useSubmit } from "react-router";
import { useSnackbar } from "notistack";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Luizalabs Criar lista de Produtos favoritos" },
        { name: "Lista de todos os produtos", content: "List of the products" },
    ];
}

export async function clientAction({
    request,
}: Route.ClientActionArgs) {
    let formData = await request.formData();
    let productId = formData.get("productId");
    let intent = formData.get("intent");
    const storedToken = localStorage.getItem('authToken');
    console.log(productId, intent)

    if (!storedToken) {
        return { error: true, message: "Erro inesperado. Saia e logue novamente" }
    }

    return await deleteFavoriteProduct({ storedToken, productId });
}

interface IHandleIntentParams {
    storedToken: string;
    productId: string
}

async function deleteFavoriteProduct({ storedToken, productId }: IHandleIntentParams) {
    try {

        const parserProductId = parseInt(productId);

        const success = await favoriteProductsListService.removeProduct({ accessToken: storedToken, productId: parserProductId });
        if (success) {
            return { success: true, message: "Produto excluido com sucesso", method: "delete", productId: parserProductId }
        } else {
            return { error: true }
        }
    } catch (error) {
        return { error: true, }

    }
}

export const clientLoader = async ({ }: Route.ClientLoaderArgs) => {
    const favoriteProducts = JSON.parse(localStorage.getItem('favorite_products') || "[]");

    try {
        if (!favoriteProducts) {
            return { error: true }
        }

        const products: IProduct[] = await productService.getProductsByIds(favoriteProducts);
        return { products };
    } catch (error) {
        return { products: [] }
    }
}

export function HydrateFallback() {
    return <Loading />;
}

export default function FavoriteProductsPage({ loaderData, actionData }: Route.ComponentProps) {
    const { list, deleteFavoriteProduct } = useFavoriteProductListContext();
    const { enqueueSnackbar } = useSnackbar();
    const submit = useSubmit();
    const { revalidate } = useRevalidator();
    const { products } = loaderData;

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
