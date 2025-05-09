import { useState } from 'react';

export const useTeam = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = (newValue: string) => {
    setValue(newValue);
    if (error) setError(null);
  };

  const validate = () => {
    if (!value) {
      setError('Equipe é obrigatória');
      return false;
    }
    return true;
  };

  return { value, onChange, error, validate };
};