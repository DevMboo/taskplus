import { useState, useEffect } from 'react';

interface UseSelectProps<T> {
  options: T[];
  initialValue?: string | null;
  isRequired?: boolean;
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
  validationMessage?: string;
}

export const useSelect = <T,>({
  options,
  initialValue = null,
  isRequired = true,
  getValue,
  getLabel,
  validationMessage = 'Este campo é obrigatório'
}: UseSelectProps<T>) => {
  const [value, setValue] = useState<string | null>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  const validate = (): boolean => {
    if (!isRequired) return true;
    
    const isValid = value !== null && value !== '';
    setError(isValid ? null : validationMessage);
    return isValid;
  };

  useEffect(() => {
    if (isTouched) {
      validate();
    }
  }, [value, isTouched]);

  return {
    value,
    error,
    isTouched,
    setError,
    options: options.map(item => ({
      value: getValue(item),
      label: getLabel(item)
    })),
    onChange: (newValue: string) => {
      setValue(newValue);
      setIsTouched(true);
    },
    reset: () => {
      setValue(null);
      setError(null);
      setIsTouched(false);
    },
    validate,
    setTouched: () => setIsTouched(true)
  };
};