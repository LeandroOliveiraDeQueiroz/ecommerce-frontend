import type { ILoginData } from "~/services/auth/types";

export interface AuthContextData {
  isAuthenticated: boolean;
  userData: TUser | null;
  loading: boolean;
  login: (param: TUser) => void;
  logOut: () => void;
}

export type TUser = ILoginData;
