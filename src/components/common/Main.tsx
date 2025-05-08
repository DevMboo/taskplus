// components/Main.tsx
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ReactNode } from "react";
import { Header } from "./Header";

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {
  const { isAuthenticated } = useAuth();
  const { isLoading } = useLoading();

  return (
    <main
      className="
        mx-auto
        px-4
        py-8
        sm:px-6
        lg:px-8
        w-full
        min-h-screen
        bg-neutral-50
        relative
      "
    >
      {isAuthenticated && <Header />}
      {children}
      {isLoading && <LoadingOverlay />}
    </main>
  );
}