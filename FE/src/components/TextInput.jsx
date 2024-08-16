import React from 'react';

const TextInput = ({ label, name, type, value, onChange, className, placeholder }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className={"block mb-2 text-sm font-medium text-gray-900 "}>
                {label}
            </label>
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                className={` text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
            />
        </div>
    );
};

export default TextInput;
