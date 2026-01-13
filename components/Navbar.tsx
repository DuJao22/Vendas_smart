
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
          : 'bg-[#0B0B0B]/40 backdrop-blur-md py-5 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-4 shrink-0 group">
          {/* LOGO D22 ELITE PROFISSIONAL SVG RECREATION */}
          <div className="flex items-center">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform group-hover:rotate-6 transition-transform">
                <path d="M70,15 A40,40 0 1,0 70,85" fill="none" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round" />
                <path d="M70,85 A40,40 0 0,0 70,15" fill="none" stroke="#00A3FF" stroke-width="6" stroke-linecap="round" stroke-dasharray="30 10" />
              </svg>
              <div className="bg-[#0B0B0B] p-1 z-10">
                <span className="text-white font-black text-xl italic tracking-tighter">22</span>
              </div>
            </div>
            <div className="ml-3 flex flex-col justify-center">
              <span className="text-3xl font-black tracking-tighter text-white uppercase italic leading-[0.8]">
                D22
              </span>
              <div className="flex items-center space-x-1 mt-1">
                <div className="h-[2px] w-3 bg-[#00A3FF]"></div>
                <span className="text-[#00A3FF] font-black text-[12px] tracking-widest leading-none uppercase italic">ELITE</span>
                <div className="h-[2px] w-3 bg-[#00A3FF]"></div>
              </div>
              <span className="text-[7px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">FUTURE PULSE</span>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          <Link to="/" className="text-[10px] font-black text-slate-300 hover:text-[#00A3FF] transition-colors uppercase tracking-[0.3em]">Início</Link>
          <Link to="/catalogo" className="text-[10px] font-black text-slate-300 hover:text-[#00A3FF] transition-colors uppercase tracking-[0.3em]">Coleções</Link>
          <a href="#benefits" className="text-[10px] font-black text-slate-300 hover:text-[#00A3FF] transition-colors uppercase tracking-[0.3em]">Tecnologia</a>
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

          <Link to="/catalogo" className="hidden lg:block bg-[#00A3FF] text-white text-[10px] font-black py-4 px-8 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl hover:-translate-y-1 active:scale-95 tracking-[0.2em] uppercase">
            RESERVAR AGORA
          </Link>

          <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#0B0B0B] z-[110] transition-all duration-700 md:hidden ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="p-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
             <span className="text-xl font-black text-white italic tracking-tighter">D22 <span className="text-[#00A3FF]">ELITE</span></span>
             <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
          <div className="flex flex-col space-y-12 text-center">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black text-white uppercase italic tracking-tighter">Início</Link>
            <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black text-white uppercase italic tracking-tighter">Catálogo</Link>
            <Link to="/carrinho" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black text-[#00A3FF] uppercase italic tracking-tighter">Carrinho</Link>
          </div>
          <div className="mt-auto">
             <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className="w-full py-8 bg-[#00A3FF] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.4em] block text-center shadow-2xl">VER COLEÇÃO</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
