import type { IFavoriteProductsFormProps } from "./types"

export function FavoriteProductsFormFields({ description, title }: IFavoriteProductsFormProps) {

    return (
        <>
            <div>
                <div>
                    <label>Título</label>
                    <input defaultValue={title || ""} type="text" name="title" />
                </div>
                <div>
                    <label>Descrição</label>
                    <textarea defaultValue={description || ""} name="description" />
                </div>
            </div>
        </>
    )
}