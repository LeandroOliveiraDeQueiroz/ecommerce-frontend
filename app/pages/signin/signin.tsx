// import { useState } from "react";
import { Form, useNavigate, } from "react-router";
import { getStyledButton } from "~/components/styledButton/styledButton";
// import authService from "~/services/auth/auth";

const StyledButton = getStyledButton("blue-500", "white");

export function Signin() {
    // const navigate = useNavigate();
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <div>
                <h1 className="text-2xl m-auto mt-3 mb-3">Sign In</h1>
                <Form method="post" className="p-4 border-2 rounded-md border-gray-500">
                    <div>
                        <label>Nome</label>
                        <input name="name" type="text" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input name="email" type="email" />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input name="password" type="password" />
                    </div>
                    <div>
                        <label>Confirmar senha</label>
                        <input name="confirmPassword" />
                    </div>
                    <div className="text-center">
                        <StyledButton type="submit">Criar</StyledButton>
                    </div>
                </Form>
            </div>
        </div>
    )
}