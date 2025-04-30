import { Signin } from "~/pages/signin/signin";
import type { Route } from "./+types/home";
import authService from "~/services/auth/auth";
import { useNavigate } from "react-router";
import { useAuthContext } from "~/contexts/auth/auth";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import type { IServiceError } from "~/types"
import * as yup from 'yup'
import { isIServiceError } from "~/services/utils/utils";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Luizalabs Cadastro" },
    { name: "Cadastrar", content: "Pagina de cadastro" },
  ];
}


const schema = yup.object().shape({
  name: yup.
    string()
    .required("Nome é obrigatório")
    .min(1, "Nome deve ter pelo menos 1 caracter")
    .max(256, "Nome deve ter no máximo 256 caracteres"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Email não válido"),
  password: yup
    .string()
    .required('Senha é obrigatório')
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(256, "Senha deve ter no máximo 256 caracteres").required(),
  confirmPassword: yup
    .string()
    .required('Confirma senha é obrigatório')
    .oneOf([yup.ref('password')], 'Confirma senha deve ser igual a senha'),
});


export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  let formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  let password = formData.get("password");
  let confirmPassword = formData.get("confirmPassword");

  try {

    await schema.validate({ name, email, password, confirmPassword })

    const signed = await authService.signin({ email, name, password });
    return { success: signed, redirectTo: '/login' }
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
      enqueueSnackbar(actionData.message || "Erro inesperado", { variant: 'error' });
    }
  }, [actionData, navigate, enqueueSnackbar]);

  return <Signin />;
}
