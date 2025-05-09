import { useState } from 'react';

export const useTitle = (isRequired: boolean, initialValue: string = '') => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState<string | null>(null);
  
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const newValue = typeof e === 'string' ? e : e.target.value;
      setValue(newValue);
      if (isRequired && !newValue.trim()) {
        setError('Este campo é obrigatório');
      } else {
        setError(null);
      }
    };
  
    return { value, onChange, error, setError };
  };