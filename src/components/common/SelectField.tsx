import React from 'react';

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
  disabled,
  required = false,
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const baseClasses = `block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
    disabled ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'
  }`;

  const borderClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300';

  return (
    <div className={`mt-4 ${className}`}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium ${
          error ? 'text-red-600' : 'text-gray-700'
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="mt-1 relative rounded-md shadow-sm">
        <select
          id={id}
          name={id}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`${baseClasses} ${borderClasses}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <option value="">Selecione...</option>
          
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-900"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;