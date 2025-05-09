import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/router";
import { useState } from "react";
import InputField from "../common/InputField";
import { login } from "@/services/authService";
import { useAlert } from "@/contexts/AlertContext";
import { useEmail } from "@/hooks/useEmail";
import { usePassword } from "@/hooks/usePassword";

export function LoginForm() {
    const { setAuthState } = useAuth();
    const { showAlert } = useAlert();
    const router = useRouter();

    const { value: email, onChange: setEmail, error: emailError } = useEmail();
    const { value: password, onChange: setPassword, error: passwordError } = usePassword();
    const [formError, setFormError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setFormError(null);

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
                showAlert('danger', 'E-mail ou senha inválidos', 'Erro');
            }

        } catch (error) {
            setFormError("Erro ao conectar com o servidor. Tente novamente.");
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
                    type="text"
                    value={email}
                    onChange={setEmail}
                    error={emailError ?? undefined}
                    required
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
                    className={`w-full flex justify-center py-2 px-4 cursor-pointer border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Autenticando...' : 'Entrar com minha conta'}
                </button>
            </div>
        </form>
    );
}