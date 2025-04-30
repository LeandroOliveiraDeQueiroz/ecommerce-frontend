import { PrivateRoute } from "~/components-hoc/privateRoute/privateRoute";
import type { Route } from "./+types/home";
import { FavoriteProductsListCreate } from "~/pages/favoriteProductsList/favoriteProductsListCreate";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Luizalabs Criar lista de Produtos favoritos" },
        { name: "Lista de todos os produtos", content: "List of the products" },
    ];
}

export async function clientAction({
    request,
}: Route.ClientActionArgs) {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const storedToken = localStorage.getItem('authToken');

    try {
        if (!storedToken) {
            return { error: true }
        }

        console.log(title, description)

        const success = await favoriteProductsListService.create({ title, description, accessToken: storedToken });
        if (success) {
            return { success: true, redirectTo: '/favorite-products', title, description }
        } else {
            return { error: true }
        }
    } catch (error) {
        return { error: true, }

    }
}

export default function FavoriteProductsListCreatePage({
    actionData,
}: Route.ComponentProps) {
    const { create } = useFavoriteProductListContext();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData?.success) {
            create(actionData.title, actionData.description)
            enqueueSnackbar('Lista criada com sucesso', { variant: 'success' });
            navigate(actionData.redirectTo);
        } else if (actionData?.error) {
            console.log("Error:", actionData?.error)
        }
    }, [actionData, navigate, create]);


    return (
        <PrivateRoute>
            <FavoriteProductsListCreate />
        </PrivateRoute>
    );
}
