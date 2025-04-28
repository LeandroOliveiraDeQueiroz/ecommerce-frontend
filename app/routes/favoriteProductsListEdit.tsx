import { PrivateRoute } from "~/components-hoc/privateRoute/privateRoute";
import type { Route } from "./+types/home";
import { FavoriteProductsListEdit } from "~/pages/favoriteProductsList/favoriteProductsEdit";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Luizalabs Criar lista de Produtos favoritos" },
        { name: "Lista de todos os produtos", content: "List of the products" },
    ];
}

export default function FavoriteProductsListEditPage() {
    return (
        <PrivateRoute>
            <FavoriteProductsListEdit />
        </PrivateRoute>
    )
}
