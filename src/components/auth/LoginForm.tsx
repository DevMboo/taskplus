import { useAuth } from "@/contexts/AuthContext";
import useEmail from "@/hooks/useEmail";
import usePassword from "@/hooks/usePassword";
import { useRouter } from "next/router";
import { useState } from "react";
import InputField from "../common/InputField";

export function LoginForm() {
    const { login } = useAuth();
    const router = useRouter();

    // Usando os hooks para email e senha
    const { value: email, onChange: setEmail, error: emailError } = useEmail();
    const { value: password, onChange: setPassword, error: passwordError } = usePassword();

    const [formError, setFormError] = useState<string | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Validação do formulário
        if (emailError || passwordError) {
            setFormError("Por favor, corrija os erros antes de continuar.");
            return;
        }

        if (!email || !password) {
            setFormError("Por favor, preencha todos os campos.");
            return;
        }

        const fakeToken = "abc123";

        login(fakeToken);

        router.push('/tasks');
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
                <span className="block w-full rounded-md shadow-sm">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                        Entrar com minha conta
                    </button>
                </span>
            </div>
        </form>
    );
}