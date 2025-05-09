import { useState } from 'react';

export const useStatus = (initialValue: string = 'Pendente') => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState<string | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement> | string) => {
        const newValue = typeof e === 'string' ? e : e.target.value;
        setValue(newValue);
    };

    return { value, onChange, error, setError };
};