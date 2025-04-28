import { useState } from "react";
import { useNavigate } from "react-router";
import { getStyledButton } from "~/components/styledButton/styledButton";
import { useAuthContext } from "~/contexts/auth/auth";
import authService from "~/services/auth/auth";


const StyledButton = getStyledButton("blue-500", "white");


export function Login() {
    const navigate = useNavigate();
    const { setLoggedUser, isLogged } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const logged = await authService.login({ email, password });
            console.log("logged", logged);
            //TODO setLogged context

            if (logged) {
                setLoggedUser({
                    name: logged.name, accessToken: logged.accessToken
                })

                navigate('/');
            }

        } catch (error) {
            console.log("error:", error);
        }
    }

    const handleChangeEmail = (value: string) => {
        setEmail(value)
    }

    const handleChangePassword = (value: string) => {
        setPassword(value)
    }

    if (isLogged)
        navigate("/")

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <div className="p-4 border-2 rounded-md border-gray-500">
                <h1 className="text-2xl m-auto mt-3 mb-3">Login</h1>
                <div>
                    <div>
                        <label>Email</label>
                        <input value={email} onChange={(ev) => { handleChangeEmail(ev.target.value) }} type="email" />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input value={password} onChange={(ev) => { handleChangePassword(ev.target.value) }} type="password" />
                    </div>
                    <div className="text-center">
                        <StyledButton onClick={handleLogin}>Logar</StyledButton>
                    </div>
                </div>
            </div>
        </div>
    )
}