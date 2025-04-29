import { Form } from "react-router";
import { getStyledButton } from "~/components/styledButton/styledButton";


const StyledButton = getStyledButton("blue-500", "white");


export function Login() {

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <div className="p-4 border-2 rounded-md border-gray-500">
                <h1 className="text-2xl m-auto mt-3 mb-3">Login</h1>
                <Form method="post">
                    <div>
                        <label>Email</label>
                        <input name="email" type="email" />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input name="password" type="password" />
                    </div>
                    <div className="text-center">
                        <StyledButton type="submit">Logar</StyledButton>
                    </div>
                </Form>
            </div>
        </div>
    )
}