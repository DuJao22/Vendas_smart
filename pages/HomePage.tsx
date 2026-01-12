
import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { INITIAL_PRODUCTS } from '../data/mockDb';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const featuredProducts = INITIAL_PRODUCTS.slice(0, 3);

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

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-100/50 rounded-full blur-[80px]"></div>
            <img 
              src="https://images.unsplash.com/photo-1508685096489-7aac291bd5b3?q=80&w=800&auto=format&fit=crop" 
              className="relative z-10 rounded-[3rem] shadow-2xl" 
              alt="Technology" 
            />
            <div className="absolute -bottom-10 -right-10 z-20 bg-slate-950 text-white p-10 rounded-[2rem] shadow-2xl max-w-[280px]">
              <div className="text-3xl font-black mb-2">12x</div>
              <div className="text-slate-400 text-sm">Sem juros no cartão para toda a loja.</div>
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Mais que um relógio, <br />
              <span className="text-blue-600">seu novo estilo de vida.</span>
            </h2>

            <div className="space-y-8">
              {[
                { title: 'Monitoramento Avançado', desc: 'Sensores de nível médico para acompanhar cada batida do seu coração e qualidade do sono.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.48V11.5' },
                { title: 'Bateria de Longa Duração', desc: 'Esqueça o carregador. Tecnologia de gestão de energia que dura semanas, não dias.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                { title: 'Resistência Extrema', desc: 'Materiais aeroespaciais prontos para mergulhos, escaladas e o caos do dia a dia.', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' }
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={benefit.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{benefit.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { label: 'Frete Grátis', sub: 'Para todo Brasil' },
            { label: '1 Ano de Garantia', sub: 'Suporte especializado' },
            { label: '7 Dias para Testar', sub: 'Reembolso garantido' },
            { label: 'Pagamento Seguro', sub: 'Certificado SSL 256bit' }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-white font-bold text-lg">{item.label}</div>
              <div className="text-slate-500 text-sm">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
