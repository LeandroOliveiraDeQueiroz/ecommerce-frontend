import type { Route } from "./+types/home";
import { PrivateRoute } from "~/components-hoc/privateRoute/privateRoute";
import { FavoriteProductsList } from "~/pages/favoriteProductsList/favoriteProductList";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Luizalabs Criar lista de Produtos favoritos" },
        { name: "Lista de todos os produtos", content: "List of the products" },
    ];
}

export default function FavoriteProductsPage() {

    return (
        <PrivateRoute>
            <FavoriteProductsList />
        </PrivateRoute>
    );
}
