import { deleteCookie, setCookie } from "@/utils/cookie";
import { useBackendAuth } from "@/utils/hooks";
import { AuthState, IUser } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";

type AuthProps = {
  authState: AuthState;
  checkAuth: () => void;
  login: (token: string) => void;
  logout: () => void;
  user: IUser | null;
};

export const AuthContextValue = (): AuthProps => {
  const [authState, setAuthState] = useState<AuthState>(
    AuthState.NotAuthenticated,
  );
  const [user, setUser] = useState<IUser | null>(null);
  const { getUser } = useBackendAuth();

  const logout = useCallback(() => {
    setAuthState(AuthState.NotAuthenticated);
    setUser(null);
    deleteCookie("auth");
  }, []);

  const checkAuth = useCallback(async () => {
    setAuthState(AuthState.Authenticating);

    const res = await getUser();

    if (res.status === 200) {
      setAuthState(AuthState.Authenticated);
      const fetchedUser: IUser = {
        id: res.content.id,
        name: res.content.name,
        username: res.content.username,
      };

      setUser(fetchedUser);
    } else {
      await logout();
    }
  }, [getUser, logout]);

  const login = useCallback(
    async (token: string) => {
      setCookie("auth", token);

      await checkAuth();
    },
    [checkAuth],
  );

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    authState,
    checkAuth,
    login,
    logout,
    user,
  };
};
