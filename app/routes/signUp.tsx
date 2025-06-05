import { SignUp } from "~/pages/signUp/signUp";
import type { Route } from "./+types/home";
import authService from "~/services/auth/auth";
import { useNavigate } from "react-router";
import { useAuthContext } from "~/contexts/auth/auth";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { isIServiceError } from "~/services/utils/utils";
import { signUpSchema } from "~/validators/signUp"
import * as yup from 'yup'

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "E-commerce - Cadastro" },
    { name: "Cadastrar", content: "Pagina de cadastro" },
  ];
}

export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  try {
    await signUpSchema.validate({ name, email, password, confirmPassword })

    const signed = await authService.signUp({ email, name, password });
    return { success: signed, redirectTo: '/login' }
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

export default function SignUpPage({
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
      enqueueSnackbar(actionData.message || "Erro inesperado", { variant: 'error' });
    }
  }, [actionData, navigate, enqueueSnackbar]);

  return <SignUp />;
}
