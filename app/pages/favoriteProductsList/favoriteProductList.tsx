import { NavLink } from "react-router";
import { ProductCatalog } from "~/components/productCatalog/productCatalog";
import type { IGetNavLinkStyle } from "~/types";
import type { IFavoriteProductsList } from "./types";


export function FavoriteProductsList({ products, list, isFavorite, onFavorite }: IFavoriteProductsList) {

    return (
        <div className="flex-1 flex flex-col">
            <h1 className="text-2xl m-auto mt-3 mb-3">{list ? `Lista: ${list.title}` : "Crie sua lista de favoritos"}</h1>
            <div className="flex justify-center">
                {list ?
                    <NavLink to="/favorite-products/edit" className={getEditStyle}>Editar</NavLink>
                    :
                    <NavLink to="/favorite-products/create" className={getCreateStyle}>Criar</NavLink>
                }
            </div>
            <div className="flex-1 flex flex-col pl-3 pr-3 mt-4">
                <ProductCatalog products={products || []} isFavorite={isFavorite} onFavorite={onFavorite} />
            </div>
        </div>
    )
}

const getEditStyle = ({ isPending, }: IGetNavLinkStyle) => {
    if (isPending)
        return (("inline-block border-blue-500 border-2 rounded-md px-4 py-2 transition-colors duration-300 bg-blue-500 text-white"))

    return ("inline-block border-blue-500 bg-white text-blue-500 border-2 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white")
}

const getCreateStyle = ({ isPending, }: IGetNavLinkStyle) => {
    if (isPending)
        return (("inline-block border-blue-500 border-2 rounded-md px-4 py-2 transition-colors duration-300 bg-blue-500 text-white"))

    return ("inline-block border-blue-500 bg-white text-blue-500 border-2 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white")
}