import React from "react";

interface InputProps {
  classnames?: string;
  label?: string,
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  required?: boolean;
  error?: string; // Optional error message
  type: string
  disabled?: boolean
  defaultValue?: any

}

export default function Input({
  classnames = "",
  label = "",
  value,
  onChange,
  placeHolder,
  required = false,
  error,
  type = "text",
  disabled,
  defaultValue

}: InputProps) {
  const handleClear = () => {
    onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={`w-full ${classnames}`}>
      {/* Label */}
      <label
        htmlFor="input-field"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label ? label : placeHolder}
        {required && <span className="text-red-500  text-xl">*</span>}
      </label>

      {/* Input Field */}
      <div className="relative">
        <input
          type={type}
          id="input-field"
          value={value}
          onChange={onChange}
          className={`block w-full  px-4 py-3 border  text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            ${error ? "border-red-500" : "border-gray-300"} bg-gray-50 shadow-sm transition-all ease-in-out`}
          placeholder={placeHolder}
          aria-required={required}
          aria-invalid={!!error}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      </div>

      {/* Error Message */}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}




interface CheckboxProps {
  classnames?: string;
  label?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string; // Optional error message
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  classnames = "",
  label = "",
  checked,
  onChange,
  required = false,
  error,
  disabled,
}) => {
  return (
    <div className={`flex items-center ${classnames}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`h-4 w-4 text-blue-600 border-gray-300 rounded-xl focus:ring-blue-500 
          ${error ? "border-red-500" : "border-gray-300"} transition-all`}
        aria-required={required}
        aria-invalid={!!error}
        disabled={disabled}
      />
      {label && (
        <label className="ml-2 text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 text-xl">*</span>}
        </label>
      )}
      {/* Error Message */}
      {error && <p className="ml-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};


