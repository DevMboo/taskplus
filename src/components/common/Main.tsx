import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import { Header } from "./Header";
// import "../styles/globals.css";

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {

const { isAuthenticated } = useAuth();
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
      "
    >
        { isAuthenticated && <Header />}
      {children}
    </main>
  );
}
