
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * CRONOS ELITE - PLATAFORMA DE SMARTWATCHES PREMIUM
 * © João Layon – Todos os direitos reservados
 */

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Erro fatal ao montar aplicação React:", err);
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-center; background: #050505; color: white; font-family: sans-serif; text-align: center; padding: 20px;">
        <h1 style="color: #2563eb;">Cronos Elite</h1>
        <p>Ocorreu um erro ao carregar a aplicação.</p>
        <button onclick="window.location.reload()" style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Tentar Novamente</button>
      </div>
    `;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
