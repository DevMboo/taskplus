import { useState } from 'react';

export const usePassword = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError(null);
  };

  const setValueDirectly = (newValue: string) => {
    setValue(newValue);
  };

  const validate = () => {
    if (!value.trim()) {
      setError('Senha é obrigatória');
      return false;
    }
    if (value.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };

  return { 
    value, 
    onChange, 
    setValue: setValueDirectly,
    error, 
    validate 
  };
};