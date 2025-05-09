import { useAuth } from "@/contexts/AuthContext";
import { logout as logoutService } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/router";

export function Header() {
    const { setAuthState } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logoutService(); 
        setAuthState({ isAuthenticated: false });
        router.push('/login');
    };

    return (
        <header className="w-full bg-purple-600 shadow rounded-2xl">
            <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center ">
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                    </svg>
                    <h1 className="text-xl font-bold text-white">
                        Task Plus
                    </h1>
                </div>

                <nav className="flex space-x-4">
                    <Link href="/register" className="text-white hover:text-gray-900">
                        Adicionar membro
                    </Link>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="text-white hover:text-red-300 !cursor-pointer"
                    >
                        Sair
                    </button>
                </nav>
            </div>
        </header>
    );
}
