import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ addFocusRef }) => {
    const { theme, toggleTheme } = useTheme();

    // Keyboard shortcut logic for toggling theme (Ctrl + T or Cmd + T) (REQUIRED)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                toggleTheme();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleTheme]);
    
    // Keyboard shortcut logic for focusing input (Ctrl + A or Cmd + A) (REQUIRED)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
                e.preventDefault();
                if (addFocusRef.current) {
                    addFocusRef.current.focus();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [addFocusRef]);


    return (
        <header className="container header">
            <div className="header-top-row">
                <h1>Enhanced Todo App</h1>
                <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Dark/Light Mode (Ctrl/Cmd + T)">
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
            </div>
        </header>
    );
};

export default Header;