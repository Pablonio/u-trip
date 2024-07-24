import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ToggleDarkWhite() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="relative flex items-center justify-between w-20 h-10 bg-gray-200 dark:bg-gray-800 rounded-full p-1 transition-colors duration-200 focus:outline-none"
      onClick={toggleTheme}
    >
      <div className="flex items-center justify-center w-8 h-8">
        <span className="flex items-center justify-center text-yellow-500 rounded-full p-2 transition-transform duration-300">
          <FaSun />
        </span>
      </div>
      <span className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full p-2 transition-transform duration-300">
        <FaMoon className="dark:text-black" />
      </span>
      <span
        className={`absolute left-1 bg-white dark:bg-gray-700 w-8 h-8 rounded-full shadow-md transform transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-10 scale-110' : 'translate-x-0 scale-100'
        }`}
      ></span>
    </button>
  );
}
