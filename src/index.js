import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css'; 
import App from './App';

import { ThemeProvider } from './context/ThemeContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 1. BrowserRouter: Required for routing */}
    <BrowserRouter>
      {/* 2. ThemeProvider: Required for Dark Mode context */}
      <ThemeProvider>
        {/* 3. The Main Application Component */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);