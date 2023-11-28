import { AuthState } from "@/utils/types";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";
import { useAuth } from "./useAuth";

interface Props {}

const AuthGuard: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { authState, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (
      authState === AuthState.NotAuthenticated &&
      router.pathname !== "/auth/login" &&
      router.pathname !== "/auth/signup"
    ) {
      router.push("/auth/login");
    }
  }, [authState, router]);

  if (authState === AuthState.Authenticating) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthGuard;
