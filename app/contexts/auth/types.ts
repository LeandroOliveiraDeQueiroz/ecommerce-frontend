export interface AuthContextData {
  isLogged: boolean;
  name: string;
  accessToken: string;
  setLoggedUser: setLoggedUser;
  logOut: () => void;
}

export type setLoggedUser = (
  param: Pick<AuthContextData, "name" | "accessToken">
) => void;
