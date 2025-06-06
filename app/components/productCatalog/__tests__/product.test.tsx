import { render } from "@testing-library/react"
import type { IFavoriteProduct } from "~/types"
import { Product } from "../product"

const product: IFavoriteProduct = {
    title: "T-shirt",
    description: "Blue oversized T-shirt of cotton",
    category: "clothes",
    price: 12,
    id: 1,
    image: "test",
    isFavorite: true,
    onFavorite: () => { }
}


it("should render as favorite product and show snapshot", () => {
    const { container } = render(<Product {...product} />);

    expect(container).toMatchSnapshot();

})


it("should render as NO favorite product and show snapshot", () => {
    const noFavoriteProduct = { ...product, isFavorite: false };
    const { container } = render(<Product {...noFavoriteProduct} />);

    expect(container).toMatchSnapshot();
})