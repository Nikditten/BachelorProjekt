import { useBackend, useCookies } from "@/utils/hooks";
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

  const { setCookie, deleteCookie } = useCookies();
  const { getUser } = useBackend();

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
      setAuthState(AuthState.NotAuthenticated);
      setUser(null);
    }
  }, [getUser]);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = useCallback(
    async (token: string) => {
      setCookie("auth", token);

      await checkAuth();
    },
    [checkAuth, setCookie],
  );

  const logout = useCallback(() => {
    setAuthState(AuthState.NotAuthenticated);
    setUser(null);
    deleteCookie("auth");
  }, [deleteCookie]);

  return {
    authState,
    checkAuth,
    login,
    logout,
    user,
  };
};
