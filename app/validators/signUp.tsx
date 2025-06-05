
import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
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


