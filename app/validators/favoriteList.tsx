import * as yup from 'yup'

export const favoriteProductsListSchema = yup.object().shape({
    title: yup
        .string()
        .required("Título é obrigatório"),
    description: yup
        .string()
        .required('Descrição é obrigatório')
});