import { Form } from "react-router";
import { BlueButton } from "~/components/styledButton/styledButton";
import { StyledInput } from "~/components/styledInput/styledInput";
import { StyledInputLabel } from "~/components/styledInputLabel/styledInputLabel";

export function Login() {

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <div className="p-4 border-2 rounded-md border-gray-500">
                <h1 className="text-2xl m-auto mt-3 mb-3 text-center">Login</h1>
                <Form method="post">
                    <div>
                        <StyledInputLabel>Email</StyledInputLabel>
                        <StyledInput name="email" type="email" />
                    </div>
                    <div>
                        <StyledInputLabel>Senha</StyledInputLabel>
                        <StyledInput name="password" type="password" />
                    </div>
                    <div className="text-center">
                        <BlueButton type="submit">Logar</BlueButton>
                    </div>
                </Form>
            </div>
        </div>
    )
}