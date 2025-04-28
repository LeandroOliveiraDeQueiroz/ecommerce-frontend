import { PrivateRoute } from "~/components-hoc/privateRoute/privateRoute";
import type { Route } from "./+types/home";
import { FavoriteProductsListCreate } from "~/pages/favoriteProductsList/favoriteProductsListCreate";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Luizalabs Criar lista de Produtos favoritos" },
        { name: "Lista de todos os produtos", content: "List of the products" },
    ];
}

export default function FavoriteProductsListCreatePage() {

    return (
        <PrivateRoute>
            <FavoriteProductsListCreate />
        </PrivateRoute>
    );
}
