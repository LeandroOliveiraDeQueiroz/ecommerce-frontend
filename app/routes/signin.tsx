import { Signin } from "~/pages/signin/signin";
import type { Route } from "./+types/home";
import authService from "~/services/auth/auth";
import { useNavigate } from "react-router";
import { useAuthContext } from "~/contexts/auth/auth";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Luizalabs Cadastro" },
    { name: "Cadastrar", content: "Pagina de cadastro" },
  ];
}


export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  let formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  let password = formData.get("password");

  try {
    console.log(email, password)
    const signed = await authService.signin({ email, name, password });
    return { success: signed, redirectTo: '/login' }
  } catch (error) {
    return { error: true, }

  }
}

export default function SigninPage({
  actionData,
}: Route.ComponentProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      enqueueSnackbar('Usuário já logado', { variant: 'success' });
      navigate("/");
    }
  }, [isAuthenticated])


  useEffect(() => {
    if (actionData?.success) {
      enqueueSnackbar('Cadastro realizado com sucesso!', { variant: 'success' });
      navigate(actionData.redirectTo);
    } else if (actionData?.error) {
      console.log("Error:", actionData?.error)
    }
  }, [actionData, navigate]);

  return <Signin />;
}
