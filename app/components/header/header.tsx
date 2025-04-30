import { useSnackbar } from "notistack";
import { NavLink, useNavigate } from "react-router";
import { useAuthContext } from "~/contexts/auth/auth";
import { useFavoriteProductListContext } from "~/contexts/favoriteProductsList/favoriteProductsList";

export function Header() {
    const { isAuthenticated, userData, logOut } = useAuthContext();
    const navigate = useNavigate();
    const { clear } = useFavoriteProductListContext();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogout = () => {
        navigate("/");

        setTimeout(() => {
            logOut();
            clear();
            enqueueSnackbar("Log out", { variant: "success" })
        }, 500)
    }

    return <header className="bg-blue-100 flex gap-4 p-3 pr-4 justify-between">
        <div>
            <NavLink to="/">Home</NavLink>
        </div>
        <div className="flex justify-between">

            {isAuthenticated ?
                <>
                    <NavLink to="/favorite-products" className="mr-8">Produtos favoritos</NavLink>
                    <p className="mr-8">{userData?.name}</p>
                    <button onClick={handleLogout} >Sair</button>
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