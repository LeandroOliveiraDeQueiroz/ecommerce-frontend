import { NavLink } from "react-router";
import { useAuthContext } from "~/contexts/auth/auth";

export function Header() {
    const { isLogged, name, logOut } = useAuthContext();

    return <header className="bg-blue-100 flex gap-4 p-3 pr-4 justify-between">
        <div>
            <NavLink to="/">Home</NavLink>
        </div>
        <div className="flex justify-between">

            {isLogged ?
                <>
                    <NavLink to="/favorite-products" className="mr-8">Produtos favoritos</NavLink>
                    <p className="mr-8">{name}</p>
                    <button onClick={logOut} >Sair</button>
                </>
                :
                <>
                    <NavLink to="/signin" className="mr-8">Sign in</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </>
            }
        </div>

    </header>
}