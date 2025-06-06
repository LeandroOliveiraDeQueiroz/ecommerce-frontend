import { render } from '@testing-library/react'
import { Login } from './login'
import { createRoutesStub } from 'react-router';

it('should render correctly and matches snapshot', () => {

    const Stub = createRoutesStub([
        {
            path: "/login",
            Component: Login,
        }
    ]);

    const { container } = render(<Stub initialEntries={["/login"]} />);

    expect(container).toMatchSnapshot();
});