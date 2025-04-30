import { Login } from "~/pages/login/login";
import type { Route } from "./+types/home";
import authService from "~/services/auth/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthContext } from "~/contexts/auth/auth";
import { useSnackbar } from "notistack";
import type { IFavoriteProductList } from "~/types";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";
import * as yup from 'yup'
import { isIServiceError } from "~/services/utils/utils";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Luizalabs login" },
    { name: "Login", content: "Pagina de login" },
  ];
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Email não válido"),
  password: yup
    .string()
    .required('Senha é obrigatório')
});


export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {

    console.log(email, password)

    await schema.validate({ email, password });

    const userData = await authService.login({ email, password });

    if (!userData) {
      return { error: true }
    }

    const list: IFavoriteProductList | null = await favoriteProductsListService.read({ accessToken: userData?.accessToken });

    return { success: true, userData: userData, redirectTo: '/', list: list }
  } catch (error) {

    if (error instanceof yup.ValidationError) {
      return { error: true, message: error.message }
    }

    if (isIServiceError(error)) {
      return { error: true, message: error.message }
    }

    return { error: true, message: "Erro inesperado" }
  }
}


export default function LoginPage({
  actionData,
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthContext();
  const { get } = useFavoriteProductListContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuthenticated && !actionData?.success) {
      enqueueSnackbar('Usuário já logado', { variant: 'success' });
      navigate("/");
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (actionData?.success) {
      enqueueSnackbar('Login realizado com sucesso!', { variant: 'success' });
      login(actionData.userData)
      get(actionData.list as IFavoriteProductList);
      navigate(actionData.redirectTo);
    } else if (actionData?.error) {
      enqueueSnackbar(actionData.message || "Erro inesperado", { variant: 'error' });
      console.error("Error:", actionData?.error)
    }
  }, [actionData, navigate]);


  if (actionData) {
    console.log("action", actionData)
  }

  return (
    <Login />
  )
}
