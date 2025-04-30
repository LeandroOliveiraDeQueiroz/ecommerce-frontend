import { Form } from "react-router";
import { FavoriteProductsFormFields } from "~/components/favoriteProductsFormFields/favoriteProductsFormFields";
import { BlueButton, RedButton } from "~/components/styledButton/styledButton";
import type { IFavoriteProductList } from "~/types";

export function FavoriteProductsListEdit({ description, title }: Pick<IFavoriteProductList, "title" | "description">) {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <Form method="post" className="p-4 border-2 rounded-md border-gray-500">
                <FavoriteProductsFormFields title={title} description={description} />
                <div className="text-center">
                    <BlueButton name="intent" value="update" type="submit">Editar</BlueButton>
                    <RedButton name="intent" value="delete" type="submit">Excluir</RedButton>
                </div>
            </Form>
        </div>
    )

}






