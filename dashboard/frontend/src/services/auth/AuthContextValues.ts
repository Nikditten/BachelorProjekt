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
    AuthState.Authenticating,
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

    const { status, content } = await getUser();

    if (status === 200) {
      setAuthState(AuthState.Authenticated);
      const fetchedUser: IUser = {
        id: content.id,
        name: content.name,
        username: content.username,
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
