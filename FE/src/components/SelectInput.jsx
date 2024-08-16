import React from 'react';

const SelectInput = ({ label, name, value, onChange, options, className }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className={"block mb-2 text-sm font-medium text-gray-900"}>
                {label}
            </label>
            <select 
                id={name} 
                name={name} 
                value={value} 
                onChange={onChange} 
                className={`text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
            >
                <option value="">Choose a {label}</option>
                {options?.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
