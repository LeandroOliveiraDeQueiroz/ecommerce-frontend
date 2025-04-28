import { Login } from "~/pages/login/login";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Luizalabs login" },
    { name: "Login", content: "Pagina de login" },
  ];
}

export default function LoginPage() {
  return <Login />;
}
