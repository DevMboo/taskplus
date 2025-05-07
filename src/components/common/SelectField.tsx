// components/SelectField.tsx
import React from 'react';

interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
    id,
    label,
    value,
    onChange,
    options,
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
                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    className={`appearance-none block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none focus:shadow-outline-purple transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        </div>
    );
};

export default SelectField;
