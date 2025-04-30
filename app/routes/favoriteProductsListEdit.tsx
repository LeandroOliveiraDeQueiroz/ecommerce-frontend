import { PrivateRoute } from "~/components-hoc/privateRoute/privateRoute";
import type { Route } from "./+types/home";
import { FavoriteProductsListEdit } from "~/pages/favoriteProductsList/favoriteProductsEdit";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import { useCallback, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";

type TClearContext = { action: "update", title: string, description: string } | { action: "delete", title: undefined, description: undefined }

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
    const intent = formData.get("intent");

    if (intent === "delete") {
        return await deleteAction(storedToken);
    } else if (intent === "update") {
        return await updateAction(title, description, storedToken);
    } else {
        console.error("Unknown intention")
    }

}

async function updateAction(title: string, description: string, storedToken: string | null) {
    try {
        if (!storedToken) {
            return { error: true }
        }

        console.log(title, description)

        const success = await favoriteProductsListService.update({ title, description, accessToken: storedToken });
        if (success) {

            return { success: true, redirectTo: '/favorite-products', message: "Lista editada com sucesso", action: "update", title, description }
        } else {
            return { error: true }
        }
    } catch (error) {
        return { error: true, }

    }
}

async function deleteAction(storedToken: string | null) {
    try {
        if (!storedToken) {
            return { error: true }
        }
        const success = await favoriteProductsListService.deleteList({ accessToken: storedToken });
        if (success) {

            return { success: true, redirectTo: '/', message: "Lista deleta com sucesso", action: "delete" }
        } else {
            return { error: true }
        }
    } catch (error) {
        return { error: true, }

    }
}

export default function FavoriteProductsListEditPage({
    actionData,
}: Route.ComponentProps) {
    const context = useFavoriteProductListContext();
    const { list, update, deleteList } = context;
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const clearContext = useCallback(({ action, title, description }: TClearContext) => {
        if (action === "update") {
            update(title, description)
        } else {
            deleteList();
        }
    }, [update, deleteList]);


    useEffect(() => {
        if (actionData?.success) {
            clearContext({ action: actionData.action, title: actionData.title, description: actionData.description });
            enqueueSnackbar(actionData.message, { variant: 'success' });
            navigate(actionData.redirectTo);
        } else if (actionData?.error) {
            console.log("Error:", actionData?.error)
        }
    }, [actionData, navigate, clearContext
    ]);

    return (
        <PrivateRoute>
            <FavoriteProductsListEdit title={list?.title || ""} description={list?.description || ""} />
        </PrivateRoute>
    )
}


