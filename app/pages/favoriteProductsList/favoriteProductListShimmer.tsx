import { ProductCatalogShimmer } from "~/components/productCatalog/productCatalogShimmer";

export function FavoriteProductsListShimmer() {

    return (
        <div className="flex-1 flex flex-col">
            <div className="h-8 m-auto mt-3 mb-3 w-40 bg-gray-200 animate-pulse rounded" />
            <div className="flex justify-center">
                <div className="inline-block rounded-md w-19 h-10 bg-gray-200 animate-pulse" />
            </div>
            <div className="flex-1 flex flex-col pl-3 pr-3 mt-4">
                <ProductCatalogShimmer itemsQuantity={5} />
            </div>
        </div>
    )
}