import { render } from "@testing-library/react"
import { SignUp } from "./signUp";
import { createRoutesStub } from 'react-router';

it("should render the SignUp page and matches snapshot", () => {
    const Stub = createRoutesStub([
        {
            path: "/signup",
            Component: SignUp,
        }
    ]);

    const { container } = render(<Stub initialEntries={["/signup"]} />);

    expect(container).toMatchSnapshot();
})


