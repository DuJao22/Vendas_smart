
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
             <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tighter text-white uppercase">Cronos<span className="text-blue-500">Elite</span></span>
            </Link>
            <p className="max-w-md leading-relaxed mb-8">
              Líderes em tecnologia wearable no Brasil. Oferecemos produtos de alta performance com garantia e suporte especializado para elevar seu estilo de vida.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'twitter', 'linkedin'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-slate-400 group-hover:bg-white rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Página Inicial</Link></li>
              <li><Link to="/catalogo" className="hover:text-blue-500 transition-colors">Catálogo de Produtos</Link></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Ajuda & Suporte</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Políticas de Envio</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Trocas e Devoluções</a></li>
              <li><Link to="/login" className="hover:text-blue-500 transition-colors">Área do Colaborador</Link></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium uppercase tracking-widest">
          <div className="text-slate-600">
            © 2024 Cronos Elite – Todos os direitos reservados.
          </div>
          <div className="text-slate-400 bg-slate-900 px-4 py-2 rounded-lg">
            Sistema desenvolvido por <span className="text-blue-500 font-bold">João Layon</span>
          </div>
          <div className="flex space-x-6">
            <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6 opacity-50" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6 opacity-50" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/000000/pix.png" className="h-6 opacity-50" alt="Pix" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
