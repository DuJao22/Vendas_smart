
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/**
 * CRONOS ELITE - PLATAFORMA DE SMARTWATCHES PREMIUM
 * © João Layon – Todos os direitos reservados
 */

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
