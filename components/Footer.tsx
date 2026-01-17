
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-slate-500 py-24 px-6 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2 space-y-10">
             <Link to="/" className="flex items-center space-x-5 group">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    <path d="M70,15 A40,40 0 1,0 70,85" fill="none" stroke="#e2e8f0" stroke-width="8" stroke-linecap="round" />
                    <path d="M70,85 A40,40 0 0,0 70,15" fill="none" stroke="#00A3FF" stroke-width="8" stroke-linecap="round" stroke-dasharray="30 10" />
                  </svg>
                  <span className="text-white font-black text-lg italic z-10">22</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter text-white uppercase italic leading-[0.8]">D22</span>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="h-[2px] w-4 bg-[#00A3FF]"></div>
                    <span className="text-[#00A3FF] font-black text-[14px] tracking-widest leading-none uppercase italic">ELITE</span>
                    <div className="h-[2px] w-4 bg-[#00A3FF]"></div>
                  </div>
                </div>
            </Link>
            <p className="max-w-md leading-relaxed text-sm font-medium">
              Líderes em tecnologia wearable no Brasil. Oferecemos produtos de alta performance com garantia e suporte especializado para elevar seu estilo de vida.
            </p>
            
            <div className="flex space-x-5">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/d22.elite?igsh=MXU5cHI4dTRocHo3OQ==', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'X', url: '#', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' },
                { name: 'YouTube', url: '#', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
              ].map(social => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl hover:bg-[#00A3FF] hover:border-[#00A3FF] hover:-translate-y-2 transition-all duration-300 text-white"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-[12px] tracking-[0.3em] mb-10">Explorar</h4>
            <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest">
              <li><Link to="/" className="hover:text-[#00A3FF] transition-colors">Página Inicial</Link></li>
              <li><Link to="/catalogo" className="hover:text-[#00A3FF] transition-colors">Novidades 2024</Link></li>
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Manifesto D22</a></li>
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Suporte Elite</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-[12px] tracking-[0.3em] mb-10">Segurança</h4>
            <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Políticas</a></li>
              <li><Link to="/login" className="hover:text-[#00A3FF] transition-colors">Acesso Restrito</Link></li>
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Garantia D22</a></li>
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Rastreamento</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col lg:grid lg:grid-cols-3 items-center gap-10 text-[9px] font-black uppercase tracking-[0.3em]">
          <div className="text-slate-600 text-center lg:text-left">
            © 2024 D22 ELITE – O futuro no seu pulso.
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-white/20 italic">DESIGN BY</span>
            <span className="text-[#00A3FF]">JOÃO LAYON</span>
          </div>
          <div className="flex justify-center lg:justify-end space-x-8 grayscale opacity-20">
            <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-4" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-4" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/000000/pix.png" className="h-4" alt="Pix" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
