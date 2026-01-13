
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * CRONOS ELITE - PLATAFORMA DE SMARTWATCHES PREMIUM
 * Sistema de Inicialização Robusto
 * © João Layon – Todos os direitos reservados
 */

const initApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Elemento root não encontrado no DOM.");
    return;
  }

  try {
    // Limpa o conteúdo inicial (loading ou mensagens de erro anteriores)
    rootElement.innerHTML = '';
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Cronos Elite: Sistema montado com sucesso.");
  } catch (err) {
    console.error("Falha crítica na renderização:", err);
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #050505; color: white; font-family: 'Inter', sans-serif; text-align: center; padding: 20px;">
        <div style="background: rgba(37, 99, 235, 0.1); padding: 40px; border-radius: 40px; border: 1px solid rgba(37, 99, 235, 0.2); max-width: 500px;">
          <h1 style="color: #2563eb; font-size: 32px; font-weight: 900; margin-bottom: 16px; letter-spacing: -1px;">CRONOS ELITE</h1>
          <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
            Detectamos um conflito de carregamento no seu navegador. Isso geralmente é resolvido limpando o cache ou forçando um recarregamento.
          </p>
          <button onclick="window.location.reload(true)" style="background: #2563eb; color: white; border: none; padding: 18px 40px; border-radius: 20px; cursor: pointer; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4); transition: all 0.3s;">
            Recarregar Sistema
          </button>
          <div style="margin-top: 20px; font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 1px;">
            Erro: Módulos Conflitantes de Terceiros
          </div>
        </div>
      </div>
    `;
  }
};

// Inicialização segura
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
