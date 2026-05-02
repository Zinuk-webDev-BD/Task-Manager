import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = "",
  inputClassName = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${inputClassName}
        `}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;