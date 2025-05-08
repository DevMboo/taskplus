import { useAuth } from "@/contexts/AuthContext";
import useEmail from "@/hooks/useEmail";
import usePassword from "@/hooks/usePassword";
import { useRouter } from "next/router";
import { useState } from "react";
import InputField from "../common/InputField";
import { login } from "@/services/authService";

export function LoginForm() {
    const { setAuthState } = useAuth();
    const router = useRouter();

    const { value: email, onChange: setEmail, error: emailError } = useEmail();
    const { value: password, onChange: setPassword, error: passwordError } = usePassword();
    const [formError, setFormError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setFormError(null);

        // Validação do formulário
        if (emailError || passwordError || !email || !password) {
            setFormError("Por favor, preencha todos os campos corretamente.");
            setIsLoading(false);
            return;
        }

        try {
            const success = await login(email, password);
            
            if (success) {
                setAuthState({ isAuthenticated: true });
                router.push('/tasks');
            } else {
                setFormError("Credenciais inválidas. Tente novamente.");
            }
        } catch (error) {
            setFormError("Erro ao conectar com o servidor. Tente novamente.");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <InputField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="user@example.com"
                    error={emailError ?? undefined}
                />
            </div>

            <div className="mt-6">
                <InputField
                    id="password"
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    error={passwordError ?? undefined}
                />
            </div>

            {formError && (
                <div className="mt-4 text-red-500 text-sm">{formError}</div>
            )}

            <div className="mt-6">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Autenticando...' : 'Entrar com minha conta'}
                </button>
            </div>
        </form>
    );
}