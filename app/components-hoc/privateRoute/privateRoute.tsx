import { useSnackbar } from "notistack";
import { Navigate } from "react-router";
import { useAuthContext } from "~/contexts/auth/auth";

export function PrivateRoute({ children }: React.PropsWithChildren) {
    const { isAuthenticated } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();

    if (!isAuthenticated) {
        enqueueSnackbar('Usuário não logado', { variant: 'warning' });

        return <Navigate to="/login" replace />
    }

    return children;
};