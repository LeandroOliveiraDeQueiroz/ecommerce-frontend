import { Signin } from "~/pages/signin/signin";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Luizalabs Cadastro" },
    { name: "Cadastrar", content: "Pagina de cadastro" },
  ];
}

export default function SigninPage() {
  return <Signin />;
}
