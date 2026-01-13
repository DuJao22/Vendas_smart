
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * CRONOS ELITE - PLATAFORMA DE SMARTWATCHES PREMIUM
 * © João Layon – Todos os direitos reservados
 */

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Erro ao montar aplicação:", err);
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #050505; color: white; font-family: sans-serif; text-align: center; padding: 20px;">
        <h1 style="color: #2563eb; margin-bottom: 10px;">Cronos Elite</h1>
        <p style="color: #64748b;">Ocorreu uma falha no carregamento dos módulos.</p>
        <button onclick="window.location.reload()" style="margin-top: 20px; background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 12px; cursor: pointer; font-weight: bold;">Recarregar Sistema</button>
      </div>
    `;
  }
}
