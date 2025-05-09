import { ChangeEvent, useState } from 'react';

export const useName = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError(null);
  };

  const setValueDirectly = (newValue: string) => {
    setValue(newValue);
  };

  const validate = () => {
    if (!value.trim()) {
      setError('Nome é obrigatório');
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