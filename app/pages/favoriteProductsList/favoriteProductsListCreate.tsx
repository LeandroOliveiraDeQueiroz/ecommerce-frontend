import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { FavoriteProductsForm } from "~/components/favoriteProductsForm/favoriteProductsForm";
import { useAuthContext } from "~/contexts/auth/auth";
import favoriteProductsListService from "~/services/favoriteProductsList/favoriteProductsList";

export function FavoriteProductsListCreate() {
    const navigate = useNavigate();
    const { accessToken } = useAuthContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

    const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }, []);

    const handleSubmit = async () => {
        try {
            //TODO get cookie and send as header
            await favoriteProductsListService.create({ title, description, accessToken });
            navigate('/favorite-products');
        } catch (error) {
            console.log("error:", error);
        }
    }

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <FavoriteProductsForm
                title={title}
                description={description}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                buttons={<CreateButton />}
                onSubmit={handleSubmit}
            />
        </div>
    )

}

function CreateButton() {
    return <div>
        <input type="submit" value="Criar" /></div>
}





