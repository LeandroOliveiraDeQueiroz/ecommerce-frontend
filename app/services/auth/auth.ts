import axios from "axios";
import type { ILoginData, ILoginParams, ISigninParams } from "./types";

const AuthService = () => {
  const signin = async ({ name, email, password }: ISigninParams) => {
    const response = await axios.post(
      `${import.meta.env.VITE_MONOLITH_API}/user/signin`,
      {
        name,
        email,
        password,
      }
    );

    if (response.status === 200) {
      return true;
    }

    return false;
  };

  const login = async ({
    email,
    password,
  }: ILoginParams): Promise<ILoginData | null> => {
    const response = await axios.post(
      `${import.meta.env.VITE_MONOLITH_API}/user/login`,
      {
        email,
        password,
      }
    );

    if (response.status === 200) {
      //TODO return user
      return response.data;
    }

    return null;
  };

  return {
    login,
    signin,
  };
};

const authService = AuthService();

export default authService;
