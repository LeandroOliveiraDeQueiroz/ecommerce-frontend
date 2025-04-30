import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from "react";
import type { PropsWithChildren } from 'react';
import type { IFavoriteProductListContextData, THandleFavoriteProductParam, } from "./types";
import type { IFavoriteProductList } from "~/types";

export const FavoriteProductListContext = createContext<IFavoriteProductListContextData>({
    list: null,
    update: () => { },
    deleteList: () => { },
    create: () => { },
    get: () => { },
    addFavoriteProduct: () => { },
    deleteFavoriteProduct: () => { },
    clear: () => { }
});

export const FavoriteProductListProvider = ({ children }: PropsWithChildren) => {
    const [list, setList] = useState<IFavoriteProductList | null>(null);

    useEffect(() => {
        const title = localStorage.getItem('title');
        const description = localStorage.getItem('description');
        const favoriteProducts = JSON.parse(localStorage.getItem('favorite_products') || "[]");

        let favoriteProductsList: IFavoriteProductList | null = null;
        if (title && description && favoriteProducts) {
            favoriteProductsList = {
                title,
                description, favorite_products: favoriteProducts,
                product_quantity: favoriteProducts.length
            }

            setList(favoriteProductsList);
        }
    }, []);


    const create = useCallback((title: string, description: string) => {
        const favoriteProductsList: IFavoriteProductList = {
            title,
            description,
            favorite_products: [],
            product_quantity: 0
        }

        setList(favoriteProductsList);
        localStorage.setItem('title', title)
        localStorage.setItem('description', description)
        localStorage.setItem('favorite_products', JSON.stringify([]))

    }, []);

    const get = useCallback((newList: IFavoriteProductList | null) => {
        setList(newList);

        if (newList) {
            localStorage.setItem('title', newList.title)
            localStorage.setItem('description', newList.description)
            localStorage.setItem('favorite_products', JSON.stringify(newList.favorite_products))
        }

    }, []);

    const update = useCallback((title: string, description: string) => {
        setList((prevList) => {
            if (!prevList)
                return prevList

            return { ...prevList, title, description }
        })

        localStorage.setItem('title', title)
        localStorage.setItem('description', description)

    }, []);

    const deleteList = useCallback(() => {
        setList(null)
        localStorage.removeItem('title');
        localStorage.removeItem('description');
        localStorage.removeItem('favorite_products');
    }, [])

    const addFavoriteProduct = useCallback(({ favorite_product_id }: THandleFavoriteProductParam) => {
        setList((prevList) => {
            if (!prevList) return prevList;

            const favoriteCopies = [...prevList.favorite_products]
            favoriteCopies.push(favorite_product_id)
            localStorage.setItem('favorite_products', JSON.stringify(favoriteCopies))

            return { ...prevList, favorite_products: favoriteCopies };
        })
    }, [])

    const deleteFavoriteProduct = useCallback(({ favorite_product_id }: THandleFavoriteProductParam) => {
        setList((prevList) => {
            if (!prevList) return prevList;

            const favoriteCopies = prevList.favorite_products.filter((id) => id !== favorite_product_id);
            localStorage.setItem('favorite_products', JSON.stringify(favoriteCopies))

            return { ...prevList, favorite_products: favoriteCopies };
        })
    }, []);

    const clear = useCallback(() => {
        setList(null);
        localStorage.clear();
    }, [])

    const value = useMemo(() => ({
        list, create, update, deleteList, get, addFavoriteProduct, deleteFavoriteProduct, clear
    }), [list, create, update, deleteList, get, addFavoriteProduct, deleteFavoriteProduct, clear])

    return (
        <FavoriteProductListContext.Provider value={value}>
            {children}
        </FavoriteProductListContext.Provider>
    );

}

export const useFavoriteProductListContext = () => {
    return useContext(FavoriteProductListContext);
}