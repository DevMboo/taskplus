import { useState } from 'react';

export const useStatus = () => {
    const [value, setValue] = useState('Pendente');
    const [error, setError] = useState<string | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    return { value, onChange, error, setError };
};
