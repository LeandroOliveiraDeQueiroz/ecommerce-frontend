import type { IFavoriteProductsForm } from "./types"

export function FavoriteProductsForm({ onSubmit, title, onTitleChange, description, onDescriptionChange, buttons, isTitleDisable, isDescriptionDisable }: IFavoriteProductsForm) {

    return (
        <form onSubmit={onSubmit} className="p-4 border-2 rounded-md border-gray-500">
            <h1 className="text-2xl m-auto mt-3 mb-3">Lista de favoritos</h1>
            <div>
                <div>
                    <label>Título</label>
                    <input value={title} onChange={onTitleChange} type="text" disabled={isTitleDisable} />
                </div>
                <div>
                    <label>Descrição</label>
                    <textarea value={description} onChange={onDescriptionChange} disabled={isDescriptionDisable} />
                </div>
                <div className="text-center">
                    {buttons}
                </div>
            </div>
        </form>
    )
}