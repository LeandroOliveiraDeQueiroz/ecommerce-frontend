import { NoProducts } from "./noProducts";
import { Product } from "./product";
import type { IProductCatalogProps } from "./types";

export function ProductCatalog({ products, isFavorite, onFavorite }: IProductCatalogProps) {
    const handleFavorite = isFavorite ? isFavorite : () => false;

    if (products.length === 0)
        return <NoProducts />

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products.map((product, index) => {
                const isFavoriteProduct = handleFavorite(product.id);
                return (
                    <Product key={index} {...product} isFavorite={isFavoriteProduct} onFavorite={onFavorite} />
                )
            })}

        </div>
    );
}