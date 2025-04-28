import { Navigate } from "react-router";
import { useAuthContext } from "~/contexts/auth/auth";

export function PrivateRoute({ children }: React.PropsWithChildren) {
    const { isLogged } = useAuthContext();

    if (!isLogged) {
        return <Navigate to="/login" replace />
    }

    return children;
};