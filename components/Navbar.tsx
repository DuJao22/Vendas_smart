
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { User } from '../types';

const Navbar: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Efeito de transparência/blur
      setIsScrolled(currentScrollY > 20);

      // Lógica de Ocultar/Mostrar (Smart Navbar)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Rolando para baixo -> Oculta
      } else {
        setIsVisible(true); // Rolando para cima -> Mostra
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setUser(db.getCurrentUser());

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]); 

  const handleLogout = () => {
    db.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'glass py-3 border-b border-slate-200/50 shadow-lg' 
          : 'bg-white/90 backdrop-blur-xl py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 shrink-0 group">
          <div className="w-10 h-10 bg-slate-950 flex items-center justify-center rounded-xl shadow-lg group-hover:bg-blue-600 transition-colors duration-500">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            Cronos<span className="text-blue-600 italic">Elite</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/" className="text-[11px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">Início</Link>
          <Link to="/catalogo" className="text-[11px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">Catálogo</Link>
          <a href="#benefits" className="text-[11px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">Diferenciais</a>
        </div>

        <div className="flex items-center space-x-5">
          {user ? (
            <div className="hidden md:flex items-center space-x-4 bg-slate-100/50 border border-slate-200/50 px-4 py-2 rounded-2xl">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase leading-none">Membro Elite</span>
                <span className="text-xs font-black text-slate-900 leading-tight">{user.name.split(' ')[0]}</span>
              </div>
              <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block text-[11px] font-black text-slate-600 hover:text-blue-600 uppercase tracking-widest">Login</Link>
          )}

          <Link to="/carrinho" className="relative p-2 hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/catalogo" className="hidden lg:block bg-slate-950 text-white text-[10px] font-black py-4 px-8 rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1 active:scale-95 tracking-widest uppercase">
            GARANTIR O MEU
          </Link>

          <button className="md:hidden p-2 text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[110] transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="p-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-20">
             <span className="text-xl font-black text-slate-900 uppercase tracking-tighter">Menu</span>
             <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
          <div className="flex flex-col space-y-10 text-center">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black text-slate-900 uppercase italic">Início</Link>
            <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black text-slate-900 uppercase italic">Catálogo</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black text-slate-900 uppercase italic">Login</Link>
            <Link to="/carrinho" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black text-blue-600 uppercase italic">Carrinho ({cartCount})</Link>
          </div>
          <div className="mt-auto">
             <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-lg uppercase tracking-widest block text-center">Ver Coleção</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
