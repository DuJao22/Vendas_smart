
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { db } from '../services/db';
import { Product } from '../types';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setFeaturedProducts(db.getProducts().slice(0, 3));
  }, []);

  return (
    <div className="animate-fadeIn">
      <Hero />

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em]">Nossa Seleção</h2>
              <p className="text-4xl md:text-5xl font-black text-slate-900">Elite do Wristwear.</p>
            </div>
            <Link to="/catalogo" className="flex items-center space-x-2 text-slate-950 font-bold group">
              <span>Ver Catálogo Completo</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Corrigido Z-Index e Imagem */}
      <section id="benefits" className="py-32 bg-slate-50 overflow-hidden relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Coluna da Imagem com Selo Corrigido */}
          <div className="relative group order-2 md:order-1 flex justify-center md:justify-start">
            {/* Background Decorativo */}
            <div className="absolute -left-10 -top-10 w-64 h-64 bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
            
            <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl bg-slate-200 aspect-[4/5] w-full max-w-[450px]">
              <img 
                src="https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1000&auto=format&fit=crop&fm=webp" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt="Cronos Elite Technology" 
                loading="lazy"
              />
            </div>

            {/* Selo 12x Re-posicionado e Ajustado */}
            <div className="absolute -bottom-8 -right-4 md:-right-12 z-20 bg-slate-950 text-white p-8 md:p-12 rounded-[3rem] shadow-[0_25px_50px_rgba(0,0,0,0.3)] max-w-[200px] md:max-w-[280px] border border-white/10 transform hover:rotate-3 transition-transform">
              <div className="text-4xl md:text-6xl font-black mb-1 md:mb-2 text-blue-500 tracking-tighter">12x</div>
              <div className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] leading-tight">
                Sem juros no cartão para toda a loja Cronos.
              </div>
            </div>
          </div>

          {/* Coluna de Texto */}
          <div className="space-y-12 order-1 md:order-2">
            <div className="space-y-4">
              <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                Mais que um relógio, <br />
                <span className="text-blue-600 italic">seu novo status.</span>
              </h2>
            </div>

            <div className="space-y-10">
              {[
                { title: 'Monitoramento Avançado', desc: 'Sensores de nível médico para acompanhar cada batida do seu coração e qualidade do sono.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.48V11.5' },
                { title: 'Bateria de Longa Duração', desc: 'Tecnologia de gestão de energia que dura semanas, garantindo que você nunca perca um dado.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                { title: 'Resistência Extrema', desc: 'Materiais aeroespaciais prontos para o mergulho, a trilha e o sucesso nos negócios.', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' }
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white border border-slate-200 shadow-sm rounded-[1.25rem] flex items-center justify-center text-blue-600 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={benefit.icon} />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{benefit.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
