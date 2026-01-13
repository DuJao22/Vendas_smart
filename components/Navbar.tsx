
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
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
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
          ? 'glass py-3 border-b border-white/10 shadow-lg' 
          : 'bg-[#0B0B0B]/40 backdrop-blur-sm py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-4 shrink-0 group">
          {/* LOGO D22 PROFISSIONAL SVG */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform group-hover:rotate-12 transition-transform duration-500">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#00A3FF" stroke-width="8" stroke-dasharray="220 60" />
            </svg>
            <span className="text-white font-black text-xs italic z-10 tracking-tighter">D22</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">
              D22 <span className="text-[#00A3FF]">ELITE</span>
            </span>
            <span className="text-[8px] text-[#00A3FF] font-black uppercase tracking-[0.4em] mt-1">Future Pulse</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          <Link to="/" className="text-[10px] font-black text-slate-300 hover:text-[#00A3FF] transition-colors uppercase tracking-[0.2em]">Início</Link>
          <Link to="/catalogo" className="text-[10px] font-black text-slate-300 hover:text-[#00A3FF] transition-colors uppercase tracking-[0.2em]">Catálogo</Link>
          <a href="#benefits" className="text-[10px] font-black text-slate-300 hover:text-[#00A3FF] transition-colors uppercase tracking-[0.2em]">Diferenciais</a>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/carrinho" className="relative p-2 hover:scale-110 transition-transform group">
            <svg className="w-6 h-6 text-white group-hover:text-[#00A3FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00A3FF] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-[#0B0B0B]">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/catalogo" className="hidden lg:flex items-center space-x-2 bg-white text-black text-[10px] font-black py-4 px-8 rounded-2xl hover:bg-[#00A3FF] hover:text-white transition-all shadow-xl hover:-translate-y-1 active:scale-95 tracking-widest uppercase">
            <span>COMPRAR AGORA</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>

          <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#0B0B0B] z-[110] transition-all duration-700 md:hidden ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="p-10 flex flex-col h-full bg-[radial-gradient(circle_at_top_right,rgba(0,163,255,0.1),transparent)]">
          <div className="flex justify-between items-center mb-20">
             <div className="flex items-center space-x-3">
               <div className="w-10 h-10 border-2 border-[#00A3FF] rounded-xl flex items-center justify-center text-white text-[10px] font-black italic">D22</div>
               <span className="text-xl font-black text-white tracking-tighter">ELITE</span>
             </div>
             <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
          <div className="flex flex-col space-y-12 text-center">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black text-white uppercase italic tracking-tighter">Início</Link>
            <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black text-white uppercase italic tracking-tighter">Catálogo</Link>
            <Link to="/carrinho" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black text-[#00A3FF] uppercase italic tracking-tighter">Carrinho ({cartCount})</Link>
          </div>
          <div className="mt-auto">
             <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className="w-full py-8 bg-white text-black rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] block text-center shadow-2xl">Ver Coleção Completa</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
