
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-slate-500 py-24 px-6 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2 space-y-10">
             <Link to="/" className="flex items-center space-x-4 group">
                <div className="w-12 h-12 border-2 border-[#00A3FF] flex items-center justify-center rounded-2xl shadow-lg shadow-[#00A3FF]/10">
                  <span className="text-white font-black text-xs italic">D22</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter text-white uppercase">D22<span className="text-[#00A3FF] italic ml-1">ELITE</span></span>
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">O futuro no seu pulso</span>
                </div>
            </Link>
            <p className="max-w-md leading-relaxed text-sm font-medium">
              A D22 ELITE é líder em tecnologia vestível de alto padrão. Nossos produtos são a convergência perfeita entre luxo, durabilidade e inteligência artificial para o seu cotidiano.
            </p>
            
            {/* Ícones de Redes Sociais Profissionais */}
            <div className="flex space-x-4">
              {[
                { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' },
                { name: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
              ].map(social => (
                <a 
                  key={social.name} 
                  href="#" 
                  className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl hover:bg-[#00A3FF] hover:border-[#00A3FF] hover:-translate-y-1 transition-all duration-300 text-white"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-10">Navegação</h4>
            <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest">
              <li><Link to="/" className="hover:text-[#00A3FF] transition-colors">Página Inicial</Link></li>
              <li><Link to="/catalogo" className="hover:text-[#00A3FF] transition-colors">Catálogo 2024</Link></li>
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Manifesto D22</a></li>
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Suporte VIP</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-10">Confiança</h4>
            <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Privacidade</a></li>
              <li><Link to="/login" className="hover:text-[#00A3FF] transition-colors">Portal Admin</Link></li>
              <li><a href="#" className="hover:text-[#00A3FF] transition-colors">Garantia D22</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-10 text-[9px] font-black uppercase tracking-[0.3em]">
          <div className="text-slate-600">
            © 2024 D22 ELITE – Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white/20">ENGINEERED BY</span>
            <span className="text-[#00A3FF]">JOÃO LAYON</span>
          </div>
          <div className="flex space-x-8 grayscale opacity-20">
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
