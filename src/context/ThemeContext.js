import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorage';

// 1. Create the Context
const ThemeContext = createContext();

// 2. Custom hook for easy access
export const useTheme = () => useContext(ThemeContext);

// 3. Theme Provider Component (REQUIRED for dark mode)
export const ThemeProvider = ({ children }) => {
    // Load theme from localStorage utility or default to 'light'
    const [theme, setTheme] = useState(
        () => getFromLocalStorage('appTheme') || 'light'
    );

    // Function to toggle between 'light' and 'dark'.
    const toggleTheme = useCallback(() => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    }, []);

    // Effect to apply the theme class and update localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        // Persist the theme choice using the utility function (REQUIRED)
        setToLocalStorage('appTheme', theme);
    }, [theme]); 

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};