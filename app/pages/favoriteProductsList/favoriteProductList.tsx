import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { ProductCatalog } from "~/components/productCatalog/productCatalog";
import { getStyledButton } from "~/components/styledButton/styledButton";
import { useAuthContext } from "~/contexts/auth/auth";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import productService from "~/services/product/product";
import type { IProduct, IFavoriteProductList, IGetNavLinkStyle } from "~/types";

const StyledButton = getStyledButton("red-500", "white");

export function FavoriteProductsList() {
    const { accessToken } = useAuthContext();
    const [list, setList] = useState<IFavoriteProductList>();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const getFavoriteProducts = useCallback(async () => {
        try {
            const list: IFavoriteProductList | null = await favoriteProductsListService.read({ accessToken });
            if (list) {
                const products: IProduct[] = await productService.getProductsByIds(list.favorite_products);
                setList(list);
                setProducts(products);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        getFavoriteProducts();
    }, [getFavoriteProducts]);


    return (
        <div className="flex-1 flex flex-col">
            <h1 className="text-2xl m-auto mt-3 mb-3">{list ? `Lista: ${list.title}` : "Crie sua lista de favoritos"}</h1>
            <div className="flex justify-center">
                {list ?
                    <>
                        <NavLink to="/favorite-products/edit" className={getEditStyle}>Editar</NavLink>
                        <StyledButton>Deletar</StyledButton>
                    </>
                    :
                    <NavLink to="/favorite-products/create" className={getCreateStyle}>Criar</NavLink>
                }
            </div>
            <div className="flex-1 flex">
                <ProductCatalog products={products} loading={loading} />
            </div>
        </div>
    )
}


const getEditStyle = ({ isPending, }: IGetNavLinkStyle) => {
    if (isPending)
        return (("inline-block border-blue-500 border-2 rounded-md px-4 py-2 transition-colors duration-300 bg-blue-500 text-white mr-10"))

    return ("inline-block border-blue-500 bg-white text-blue-500 border-2 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white mr-10")
}

const getCreateStyle = ({ isPending, }: IGetNavLinkStyle) => {
    if (isPending)
        return (("inline-block border-blue-500 border-2 rounded-md px-4 py-2 transition-colors duration-300 bg-blue-500 text-white"))

    return ("inline-block border-blue-500 bg-white text-blue-500 border-2 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white")
}