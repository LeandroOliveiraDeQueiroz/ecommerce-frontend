import axios from 'axios';
import type { ILoginData, ILoginParams, ISigninParams } from './types';
import { handleServiceError } from '../utils/utils';

const AuthService = () => {
  const signin = async ({ name, email, password }: ISigninParams) => {
    try {
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
    } catch (error) {
      const serviceError = handleServiceError(error);
      throw serviceError;
    }
  };

  const login = async ({
    email,
    password,
  }: ILoginParams): Promise<ILoginData | null> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MONOLITH_API}/user/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        return response.data;
      }

      return null;
    } catch (error) {
      const serviceError = handleServiceError(error);
      throw serviceError;
    }
  };

  return {
    login,
    signin,
  };
};

const authService = AuthService();

export default authService;
