// hooks/useTitle.ts
import { useState } from 'react';

export const useTitle = (required: boolean = false) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);

        if (required && e.target.value.trim() === '') {
            setError('Este campo é obrigatório');
        } else {
            setError('');
        }
    };

    return { value, onChange, error, setError };
};