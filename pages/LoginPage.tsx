
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../services/db';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Pequeno delay para simular processamento seguro
    setTimeout(() => {
      const user = db.login(identifier, password);
      setLoading(false);
      
      if (user) {
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/catalogo');
        }
      } else {
        setError('Credenciais incorretas. Verifique seu login e senha.');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-6 relative overflow-hidden font-inter">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-[460px] relative z-10">
        <div className="text-center mb-12 animate-fadeIn">
          <Link to="/" className="inline-flex items-center space-x-4 mb-8 group">
            <div className="w-14 h-14 bg-white flex items-center justify-center rounded-[1.25rem] shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-3xl font-black text-white tracking-tighter uppercase italic">Cronos<span className="text-blue-500">Elite</span></span>
          </Link>
          <h2 className="text-slate-500 text-sm font-bold uppercase tracking-[0.3em] opacity-80">Identificação Requerida</h2>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl p-10 md:p-12 rounded-[3.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] space-y-10 animate-slideUp">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl text-red-500 text-xs font-black text-center uppercase tracking-widest animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] ml-2">Acesso do Usuário</label>
              <div className="relative group">
                <input 
                  required
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Seu login ou telefone"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] ml-2">Senha de Segurança</label>
              <div className="relative group">
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all duration-300"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden group py-6 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.4)] active:scale-[0.98] flex items-center justify-center space-x-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10"></div>
              {loading ? (
                <div className="w-6 h-6 border-3 border-black/10 border-t-black group-hover:border-white/20 group-hover:border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Entrar no Sistema</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </>
              )}
            </button>
          </form>

          <div className="pt-6 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            <Link to="/" className="hover:text-blue-500 transition-colors">Voltar para a Loja</Link>
            <span className="opacity-40 italic">© João Layon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
