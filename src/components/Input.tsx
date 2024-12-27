import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAsterisk } from "react-icons/fa";

interface InputProps {
  classnames?: string;
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  required?: boolean;
  error?: string;
  type: string;
  disabled?: boolean;
  defaultValue?: any;
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
  defaultValue,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleOpen = (type: string) => {
    if (type === "date") {
      setIsOpen(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`w-full ${classnames}`}>
      {/* Label */}
      <label
        htmlFor="input-field"
        className="block text-lg font-medium text-gray-700 mb-1"
      >
        {label ? label : placeHolder}
        {required && <span className="text-red-500  absolute -mt-1"><FaAsterisk size={8} /></span>}
      </label>

      {/* Input Field */}
      <div className="relative">
        <input
          type={
            type === "password" && showPassword
              ? "text"
              : type === "date" ? "text" : type
          }
          id="input-field"
          value={value}
          onChange={onChange}
          className={`block w-full px-4 py-3 border text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            ${error ? "border-red-500" : "border-gray-300"} bg-gray-50 shadow-sm transition-all ease-in-out`}
          placeholder={placeHolder}
          aria-required={required}
          aria-invalid={!!error}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          onClick={() => handleOpen(type)}
          readOnly={type === 'date'}
        />

        {/* Date/Time Picker */}
        <div className="fixed z-50 shadow-2xl">
          {isOpen && (type === "date") && (
            <ReactDatePicker
              selected={value}
              onChange={onChange}
              inline
              minDate={type === "date" ? new Date() : null} // Only set minDate if it's a date picker
              maxDate={type === "date" ? new Date().setMonth(new Date().getMonth() + 3) : null} // 3 months ahead only for date type
              dateFormat={"yyyy-MM-dd"} // Show only time format for time type
              // Show time picker only if type is 'time'

              locale="en-GB"
              onClickOutside={() => setIsOpen(false)}
              shouldCloseOnSelect={false} // Keep calendar open after selecting a date/time
              // Make sure no calendar is shown when type is 'time'
              showMonthDropdown={false} // Hide month dropdown
              showYearDropdown={false} // Hide year dropdown
              showPopperArrow={false}
            />



          )}
        </div>

        {/* Password Toggle Icon */}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center focus:outline-none z-50"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-black">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-black">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            )}
          </button>
        )}
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