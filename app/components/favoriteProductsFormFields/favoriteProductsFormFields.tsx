import { StyledInput } from "../styledInput/styledInput"
import { StyledInputLabel } from "../styledInputLabel/styledInputLabel"
import { StyledTextArea } from "../styledTextArea/styledTextArea"
import type { IFavoriteProductsFormProps } from "./types"

export function FavoriteProductsFormFields({ description, title }: IFavoriteProductsFormProps) {

    return (
        <>
            <div>
                <div>
                    <StyledInputLabel>Título</StyledInputLabel>
                    <StyledInput defaultValue={title || ""} type="text" name="title" />
                </div>
                <div>
                    <StyledInputLabel>Descrição</StyledInputLabel>
                    <StyledTextArea defaultValue={description || ""} name="description" />
                </div>
            </div>
        </>
    )
}