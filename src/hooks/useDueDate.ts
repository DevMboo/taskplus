import { useState } from 'react';

export const useDueDate = (required: boolean = false) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

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
