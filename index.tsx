
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * CRONOS ELITE - PLATAFORMA DE SMARTWATCHES PREMIUM
 * © João Layon – Todos os direitos reservados
 * 
 * Este sistema foi desenvolvido focando em UX Premium,
 * Copywriting Persuasivo e Alta Conversão.
 */

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
