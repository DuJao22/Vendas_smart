
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
    console.error("Erro crítico na inicialização:", err);
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #050505; color: white; font-family: sans-serif; text-align: center; padding: 20px;">
        <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 10px;">Cronos Elite</h1>
        <p style="color: #94a3b8; max-width: 400px;">Houve um problema ao carregar os recursos do sistema. Por favor, recarregue a página.</p>
        <button onclick="window.location.reload()" style="margin-top: 24px; background: #2563eb; color: white; border: none; padding: 14px 28px; border-radius: 14px; cursor: pointer; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Recarregar Agora</button>
      </div>
    `;
  }
}
