export function ProductShimmer() {
    return (
        <div className="relative shadow-sm p-1 bg-white border border-gray-200 rounded-lg">
            <div className="h-80 flex justify-center mt-2 mb-1">
                <div className="max-w-full max-h-full m-auto w-full h-full bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="space-y-0.5">
                <div className="text-right bg-gray-200 animate-pulse w-full h-4.5 rounded" />
                <div className="text-right bg-gray-200 animate-pulse w-full h-4.5 rounded" />
                <div className="ml-auto bg-gray-200 animate-pulse w-16 h-7 rounded" />
            </div>

        </div>
    );
}