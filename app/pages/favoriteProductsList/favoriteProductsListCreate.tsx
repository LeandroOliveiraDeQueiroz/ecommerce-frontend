import { Form, } from "react-router";
import { FavoriteProductsFormFields } from "~/components/favoriteProductsFormFields/favoriteProductsFormFields";
import { BlueButton } from "~/components/styledButton/styledButton";

export function FavoriteProductsListCreate() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <Form method="post" className="p-4 border-2 rounded-md border-gray-500">
                <FavoriteProductsFormFields />
                <div className="text-center">
                    <BlueButton type="submit">Criar</BlueButton>
                </div>
            </Form>
        </div>
    )

}






