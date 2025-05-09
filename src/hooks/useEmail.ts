import { useState } from 'react';

export const useEmail = (initialValue = '') => {
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
      setError('Email é obrigatório');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Email inválido');
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