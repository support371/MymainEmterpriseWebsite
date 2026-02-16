import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { validateClientConfig } from './config';
import './index.css';

// Fail-fast: validate config on startup
validateClientConfig();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
