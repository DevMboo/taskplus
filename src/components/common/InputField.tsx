// components/InputField.tsx
import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
}) => {
    return (
        <div className="mt-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-5 text-gray-700"
            >
                {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`appearance-none block w-full px-3 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none focus:shadow-outline-purple transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                />
            </div>
            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        </div>
    );
};

export default InputField;
