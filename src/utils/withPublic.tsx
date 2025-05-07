import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { ComponentType } from "react";

export function withPublic<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithPublicComponent(props: P) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        router.push("/tasks"); // redireciona usuário logado para página inicial
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
      return null; // ou um loader
    }

    return <WrappedComponent {...props} />;
  };
}
