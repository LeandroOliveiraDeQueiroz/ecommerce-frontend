import { ProductShimmer } from "./productShimmer";

export function ProductCatalogShimmer({ itemsQuantity = 10 }: { itemsQuantity?: number }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {new Array(itemsQuantity).fill(undefined).map((_, index) => {
                return (
                    <ProductShimmer key={index} />
                )
            })}

        </div>
    );
}