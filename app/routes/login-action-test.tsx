import { Login } from "~/pages/login-action-test/login";
import type { Route } from "./+types/home";
import authService from "~/services/auth/auth";
import { Form, useNavigate } from "react-router";
import React, { useEffect } from "react";
import { useAuthContext } from "~/contexts/auth/auth";
import { useSnackbar } from "notistack";
import type { IFavoriteProductList } from "~/types";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Luizalabs login" },
    { name: "Login", content: "Pagina de login" },
  ];
}

export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  try {

    console.log(email, password)

    const userData = await authService.login({ email, password });

    if (!userData) {
      return { error: true }
    }

    const list: IFavoriteProductList | null = await favoriteProductsListService.read({ accessToken: userData?.accessToken });


    return { success: true, userData: userData, redirectTo: '/', list: list }
  } catch (error) {
    return { error: true, }

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
      console.log("Error:", actionData?.error)
    }
  }, [actionData, navigate]);


  if (actionData) {
    console.log("action", actionData)
  }

  return (
    <Login />
  )
}
