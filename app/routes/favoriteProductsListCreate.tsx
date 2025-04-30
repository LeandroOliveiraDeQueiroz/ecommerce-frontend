import { PrivateRoute } from "~/components-hoc/privateRoute/privateRoute";
import type { Route } from "./+types/home";
import { FavoriteProductsListCreate } from "~/pages/favoriteProductsList/favoriteProductsListCreate";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";
import { isIServiceError } from "~/services/utils/utils";
import * as yup from 'yup'

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Luizalabs Criar lista de Produtos favoritos" },
        { name: "Lista de todos os produtos", content: "List of the products" },
    ];
}

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Título é obrigatório"),
    description: yup
        .string()
        .required('Descrição é obrigatório')
});

export async function clientAction({
    request,
}: Route.ClientActionArgs) {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const storedToken = localStorage.getItem('authToken');

    if (!storedToken) {
        return { error: true, message: "Usuário não logado" }
    }

    try {
        await schema.validate({ title, description });
        const success = await favoriteProductsListService.create({ title, description, accessToken: storedToken });

        if (!success) {
            throw Error(`${success}`);
        }

        return { success: true, redirectTo: '/favorite-products', title, description }
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return { error: true, message: error.message }
        }

        if (isIServiceError(error)) {
            return { error: true, message: error.message }
        }

        console.error(error);
        return { error: true, message: "Erro inesperado" }
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
            enqueueSnackbar(actionData.message, { variant: 'error' });
        }
    }, [actionData, navigate, create]);


    return (
        <PrivateRoute>
            <FavoriteProductsListCreate />
        </PrivateRoute>
    );
}
