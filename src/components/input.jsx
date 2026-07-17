import React, { useId } from "react";

function Input(
  { label, type = "text", className = "", name, required = true, placeholder = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        ref={ref}
        className={`px-4 py-2.5 w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors duration-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 ${className}`}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Input);