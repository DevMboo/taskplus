import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ComponentType } from "react";
import { isAuthenticated } from "@/services/authService";

export function withPublic<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithPublicComponent(props: P) {
    const { isAuthenticated: contextAuth, setAuthState } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const hasToken = isAuthenticated();
        
        if (hasToken && !contextAuth) {
          setAuthState({ isAuthenticated: true });
        }

        if (hasToken) {
          router.push("/tasks");
        }
      };

      checkAuth();
    }, [contextAuth, router, setAuthState]);

    if (contextAuth) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}