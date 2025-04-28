import { useState } from "react";
import { useNavigate, } from "react-router";
import { getStyledButton } from "~/components/styledButton/styledButton";
import authService from "~/services/auth/auth";

const StyledButton = getStyledButton("blue-500", "white");

export function Signin() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignin = async () => {
        try {
            const signed = await authService.signin({ email, name, password });
            if (signed) {
                navigate("/login");
            }
        } catch (error) {
            console.log("error:", error);
        }
    }

    const handleChangeName = (value: string) => {
        setName(value);
    }

    const handleChangeEmail = (value: string) => {
        setEmail(value)
    }

    const handleChangePassword = (value: string) => {
        setPassword(value)
    }

    const handleChangeConfirmPassword = (value: string) => {
        setConfirmPassword(value)
    }

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <div>
                <h1 className="text-2xl m-auto mt-3 mb-3">Sign In</h1>
                <div className="p-4 border-2 rounded-md border-gray-500">
                    <div>
                        <label>Nome</label>
                        <input value={name} onChange={(ev) => { handleChangeName(ev.target.value) }} type="text" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input value={email} onChange={(ev) => { handleChangeEmail(ev.target.value) }} type="email" />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input value={password} onChange={(ev) => { handleChangePassword(ev.target.value) }} type="password" />
                    </div>
                    <div>
                        <label>Confirmar senha</label>
                        <input value={confirmPassword} onChange={(ev) => { handleChangeConfirmPassword(ev.target.value) }} type="password" />
                    </div>
                    <div className="text-center">
                        <StyledButton onClick={handleSignin}>Criar</StyledButton>
                    </div>
                </div>
            </div>
        </div>
    )
}