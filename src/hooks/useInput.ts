import { useState, ChangeEvent } from "react";

// Tipagem do hook
type UseInputProps = {
  type: string;
  initialValue: string;
  validate: (value: string) => string | null;
};

const useInput = ({ type, initialValue = "", validate }: UseInputProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (validate) {
      const validationError = validate(e.target.value);
      setError(validationError);
    }
  };

  return {
    value,
    error,
    onChange: handleChange,
    setValue,
  };
};

export default useInput;
