import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loading } from "~/components/loading/loading";
import { useAuthContext } from "~/contexts/auth/auth";

export function PrivateRoute({ children }: React.PropsWithChildren) {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!isAuthenticated) {
            enqueueSnackbar('Usuário não logado', { variant: 'warning' });
            navigate("/login")
        }
    }, [
        isAuthenticated, enqueueSnackbar, navigate
    ])

    if (!isAuthenticated) {

        return <Loading />
    }

    return children;
};