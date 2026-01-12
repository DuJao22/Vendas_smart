
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { User } from '../types';

const Navbar: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Checar usuário logado
    setUser(db.getCurrentUser());

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]); // Re-executa ao mudar de rota para atualizar status de login

  const handleLogout = () => {
    db.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-slate-950 flex items-center justify-center rounded-xl shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900 uppercase">Cronos<span className="text-blue-600">Elite</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Início</Link>
          <Link to="/catalogo" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Catálogo</Link>
          <a href="#benefits" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Benefícios</a>
        </div>

        <div className="flex items-center space-x-4">
          {/* User Info & Logout */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4 bg-slate-100 px-4 py-2 rounded-full">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Bem-vindo</span>
                <span className="text-xs font-bold text-slate-900 leading-tight">{user.name.split(' ')[0]}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-1.5 bg-white text-red-500 rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 transition-all group"
                title="Sair"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block text-xs font-bold text-slate-600 hover:text-blue-600 transition-all uppercase tracking-widest">
              Login
            </Link>
          )}

          <Link to="/carrinho" className="relative group p-2">
            <svg className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button 
            className="md:hidden p-2 text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>

          <Link to="/catalogo" className="hidden lg:block bg-slate-950 text-white text-xs font-bold py-2.5 px-6 rounded-full hover:bg-slate-800 transition-all shadow-md active:scale-95">
            COMPRAR AGORA
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-slate-950/90 z-[-1] transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link to="/" className="text-2xl font-bold text-white">Início</Link>
          <Link to="/catalogo" className="text-2xl font-bold text-white">Catálogo</Link>
          <a href="#benefits" className="text-2xl font-bold text-white">Benefícios</a>
          <Link to="/carrinho" className="text-2xl font-bold text-white">Carrinho ({cartCount})</Link>
          
          {user ? (
            <div className="flex flex-col items-center space-y-4 pt-4 border-t border-white/10 w-64">
              <span className="text-white font-bold opacity-60">Olá, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="text-red-400 font-bold uppercase tracking-widest text-sm"
              >
                Sair da Conta
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-2xl font-bold text-white">Fazer Login</Link>
          )}
          
          <Link to="/catalogo" className="bg-blue-600 text-white text-lg font-bold py-4 px-10 rounded-full">VER OFERTAS</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
