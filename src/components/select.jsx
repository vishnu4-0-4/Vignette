import React, { useId } from 'react';

const Select = ({ options, label, className = '', ...props }, ref) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`px-4 py-2.5 w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-900 outline-none transition-colors duration-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 cursor-pointer ${className}`}
        {...props}
      >
        {options
          ? options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);