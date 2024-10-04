import React from "react";

function Input({
  classnames,
  value,
  onChange,
}: {
  classnames: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={`max-w-md ${classnames}`}>
      <label htmlFor="phone-input" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Phone Number
      </label>
      <div className="relative flex items-start">
        <input
          type="tel"
          id="phone"
          value={value}
          onChange={onChange}
          className="block w-full p-4 text-sm font-bold text-black border border-gray-300 rounded-lg bg-white placeholder-black"
          placeholder="Enter Number"
          required
        />
      </div>
    </div>
  );
}

export default Input;
