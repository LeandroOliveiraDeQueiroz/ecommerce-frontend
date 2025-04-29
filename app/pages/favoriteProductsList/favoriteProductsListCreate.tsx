import { Form, useNavigate } from "react-router";
import { FavoriteProductsFormFields } from "~/components/favoriteProductsFormFields/favoriteProductsFormFields";
import { getStyledButton } from "~/components/styledButton/styledButton";
const StyledButton = getStyledButton("blue-500", "white");

export function FavoriteProductsListCreate() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <Form method="post" className="p-4 border-2 rounded-md border-gray-500">
                <FavoriteProductsFormFields />
                <div className="text-center">
                    <StyledButton type="submit">Criar</StyledButton>
                </div>
            </Form>
        </div>
    )

}






