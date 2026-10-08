import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DisasterProvider } from './context/DisasterContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DisasterProvider>
        <App />
      </DisasterProvider>
    </BrowserRouter>
  </StrictMode>
);
