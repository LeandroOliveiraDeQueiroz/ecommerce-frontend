import { useCallback } from "react";
import type { Route } from "./+types/home";
import { PrivateRoute } from "~/components-hoc/privateRoute/privateRoute";
import { Loading } from "~/components/loading/loading";
import { useAuthContext } from "~/contexts/auth/auth";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";
import { FavoriteProductsList } from "~/pages/favoriteProductsList/favoriteProductList";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import productService from "~/services/product/product";
import type { IFavoriteProductList, IProduct } from "~/types";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Luizalabs Criar lista de Produtos favoritos" },
        { name: "Lista de todos os produtos", content: "List of the products" },
    ];
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

export default function FavoriteProductsPage({ loaderData }: Route.ComponentProps) {
    const { list } = useFavoriteProductListContext();
    const { products } = loaderData;

    const handleFavorite = useCallback((id: number) => {
        const set = new Set(list?.favorite_products);
        return set.has(id);
    }, [list])



    return (
        <PrivateRoute>
            <FavoriteProductsList products={products} list={list} isFavorite={handleFavorite} />
        </PrivateRoute>
    );
}
