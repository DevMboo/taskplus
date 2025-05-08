// utils/withAuth.tsx
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ComponentType } from "react";
import { isAuthenticated } from "@/services/authService";

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const { isAuthenticated: contextAuth, setAuthState } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const hasToken = isAuthenticated();
        
        if (!hasToken) {
          router.push("/login");
          return;
        }

        if (hasToken && !contextAuth) {
          setAuthState({ isAuthenticated: true });
        }
      };

      checkAuth();
    }, [contextAuth, router, setAuthState]);

    if (!contextAuth) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}