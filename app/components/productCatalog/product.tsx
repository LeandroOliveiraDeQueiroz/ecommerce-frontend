import { HeartICon } from "~/icons/heartIcon/heartICon";
import type { IFavoriteProduct } from "~/types";

export function Product({ title, price, id, image, isFavorite, onFavorite }: IFavoriteProduct) {
    const fill = isFavorite ? "var(--color-red-500)" : "none";
    const handleHeartClick = () => {
        onFavorite(id, !!isFavorite);
    }

    return (
        <div className="relative shadow-sm p-1 bg-white border border-gray-200 rounded-lg">
            <div className="absolute right-0 z-1">
                < HeartICon fill={fill} onClick={handleHeartClick} />
            </div>
            <div className="h-80 flex justify-center mt-2 mb-1">
                <img className="max-w-full max-h-full m-auto" src={image} />
            </div>
            <div className="space-y-0.5">
                <p>{title}</p>
                <p className="text-right font-bold mr-1.5 text-lg">${price}</p>
            </div>

        </div>
    );
}