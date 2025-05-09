import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAlert } from '@/contexts/AlertContext';
import { useLoading } from '@/contexts/LoadingContext';
import api from '@/services/api';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';

import { useName } from '@/hooks/useName';
import { useTeam } from '@/hooks/useTeam';
import { useEmail } from '@/hooks/useEmail';
import { usePassword } from '@/hooks/usePassword';
import { registerUser } from '@/services/userService';

type Team = {
  id: number;
  name: string;
};

export function RegisterForm() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { startLoading, stopLoading } = useLoading();
  
  const { value: name, onChange: setValue, error: nameError, validate: validateName } = useName();
  const { value: email, onChange: setEmail, error: emailError, validate: validateEmail } = useEmail();
  const { value: password, onChange: setPassword, error: passwordError, validate: validatePassword } = usePassword();
  const { value: teamId, onChange: setTeamId, error: teamError, validate: validateTeam } = useTeam();
  
  const [perfil, setPerfil] = useState('COLABORADOR');
  const [teams, setTeams] = useState<Team[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadTeams = async () => {
    try {
      const response = await api.get('/teams');
      setTeams(response.data);
    } catch (error) {
      showAlert('danger', 'Erro ao carregar equipes');
    }
  };

  const validateForm = () => {
    const isValidName = validateName();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isValidTeam = validateTeam();
    
    return isValidName && isValidEmail && isValidPassword && isValidTeam;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
  
    if (!validateForm()) return;
  
    startLoading();
    setIsLoading(true);
  
    try {
      const success = await registerUser(
        name,
        email,
        password,
        Number(teamId),
        perfil
      );
  
      if (success) {
        showAlert('success', 'Usuário cadastrado com sucesso!');
        router.push('/tasks');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao cadastrar usuário';
      setFormError(message);
      showAlert('danger', message);
    } finally {
      stopLoading();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputField
        id="name"
        label="Nome completo"
        type="text"
        value={name}
        onChange={setValue}
        error={nameError ?? undefined}
        required
      />

      <InputField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={emailError ?? undefined}
        required
      />

      <InputField
        id="password"
        label="Senha"
        type="password"
        value={password}
        onChange={setPassword}
        error={passwordError ?? undefined}
        required
      />

      <SelectField
        id="teamId"
        label="Equipe"
        value={teamId}
        onChange={setTeamId}
        options={teams.map(team => ({
          value: team.id.toString(),
          label: team.name
        }))}
        error={teamError ?? undefined}
        required
      />

      {formError && (
        <div className="mt-4 text-red-500 text-sm">{formError}</div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 cursor-pointer border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar novo usuário'}
        </button>
      </div>
    </form>
  );
}