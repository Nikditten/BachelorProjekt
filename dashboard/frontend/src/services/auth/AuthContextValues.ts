import { useBackend, useCookies } from "@/utils/hooks";
import { AuthState, User } from "@/utils/types";
import { useState } from "react";

type AuthProps = {
  authState: AuthState;
  checkAuth: () => void;
  login: (token: string) => void;
  logout: () => void;
  user?: User;
};

export const AuthContextValue = (): AuthProps => {
  const [authState, setAuthState] = useState<AuthState>(
    AuthState.NotAuthenticated,
  );
  const [user, setUser] = useState<User | undefined>(undefined);

  const { setCookie, deleteCookie } = useCookies();
  const { getUser } = useBackend();

  const checkAuth = async () => {
    setAuthState(AuthState.Authenticating);

    const res = await getUser();

    if (res.status === 200) {
      setAuthState(AuthState.Authenticated);
      const user: User = {
        id: res.content.id,
        name: res.content.name,
      };
      setUser(user);
    } else {
      setAuthState(AuthState.NotAuthenticated);
      setUser(undefined);
    }
  };

  const login = async (token: string) => {
    setCookie("auth", token);

    await checkAuth();
  };

  const logout = () => {
    setAuthState(AuthState.NotAuthenticated);
    setUser(undefined);
    deleteCookie("auth");
  };

  return {
    authState,
    checkAuth,
    login,
    logout,
    user,
  };
};
