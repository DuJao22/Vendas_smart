
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Product } from '../types';
import { Link } from 'react-router-dom';

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedImage, setSelectedImage] = useState<Record<string, string>>({});
  
  const categories = ['Todos', 'Smartwatches', 'Fones de Ouvido', 'Pulseiras', 'Acessórios'];

  useEffect(() => {
    const prods = db.getProducts();
    setProducts(prods);
    const initialImages: Record<string, string> = {};
    prods.forEach(p => {
      initialImages[p.id] = p.image;
    });
    setSelectedImage(initialImages);
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleThumbnailClick = (productId: string, imageUrl: string) => {
    setSelectedImage(prev => ({ ...prev, [productId]: imageUrl }));
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#080808] text-white font-inter">
      {/* Hero Adaptativo Mobile First */}
      <section className="container mx-auto px-6 mb-16 lg:mb-32 text-center reveal pt-12">
        <div className="inline-block px-4 py-2 bg-[#00A3FF]/10 border border-[#00A3FF]/20 rounded-full text-[#00A3FF] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-pulse">
          CATÁLOGO ELITE ATUALIZADO
        </div>
        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black mb-6 tracking-tighter uppercase italic leading-[0.9] text-glow">
          Status <br className="md:hidden" /> <span className="text-[#00A3FF]">Real.</span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-xl leading-relaxed font-bold italic px-4">
          A seleção definitiva para quem exige o topo. Tecnologia de importação direta para o seu pulso.
        </p>
      </section>

      {/* Categorias - Sticky Glass com Scroll Horizontal no Mobile */}
      <div className="sticky top-20 z-[60] mb-16 lg:mb-32">
        <div className="container mx-auto px-4">
            <div className="flex space-x-3 overflow-x-auto no-scrollbar py-4 px-2 lg:justify-center">
            {categories.map(cat => (
                <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-8 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 border-2 flex-shrink-0 ${
                    activeCategory === cat 
                    ? 'bg-[#00A3FF] border-[#00A3FF] text-white shadow-[0_15px_30px_rgba(0,163,255,0.4)] scale-105' 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20 hover:text-white'
                }`}
                >
                {cat}
                </button>
            ))}
            </div>
        </div>
      </div>

      {/* Feed de Produtos Vertical (Mobile First) */}
      <div className="space-y-32 lg:space-y-64">
        {filteredProducts.map((product, index) => (
          <section key={product.id} className="container mx-auto px-6 group reveal">
            <div className={`flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-40 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Asset Container (Top on Mobile) */}
              <div className={`w-full relative ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                 <div className="absolute -inset-10 bg-gradient-to-tr from-[#00A3FF]/10 to-transparent blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                 
                 <div className="space-y-6 relative">
                    {/* Imagem Principal High-Def */}
                    <div className="relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-[#111] aspect-square">
                       <img 
                        src={selectedImage[product.id] || product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-110"
                        loading="lazy"
                       />
                       <div className="absolute top-6 left-6 flex flex-col gap-2">
                          <span className="bg-[#00A3FF] text-white text-[7px] md:text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-2xl">Elite Certified</span>
                          {product.isNew && <span className="bg-white text-black text-[7px] md:text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">Lote 2024</span>}
                       </div>
                    </div>

                    {/* Galeria Touch Horizontal */}
                    <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 justify-start md:justify-center">
                       {product.gallery.map((img, i) => (
                          <button 
                            key={i} 
                            onClick={() => handleThumbnailClick(product.id, img)}
                            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-500 ${selectedImage[product.id] === img ? 'border-[#00A3FF] scale-110 shadow-lg' : 'border-white/5 opacity-40'}`}
                          >
                             <img src={img} className="w-full h-full object-cover" />
                          </button>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Informações e Cópia Persuasiva */}
              <div className="w-full space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-6">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-0.5 bg-[#00A3FF]"></div>
                      <span className="text-[#00A3FF] text-[9px] font-black uppercase tracking-[0.4em]">{product.category}</span>
                   </div>
                   <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9] group-hover:text-glow">
                     {product.name}
                   </h2>
                   
                   <div className="flex items-center space-x-6 md:space-x-8 pt-2">
                      <div className="flex flex-col">
                        <span className="text-slate-600 text-[10px] md:text-sm font-bold line-through tracking-widest uppercase">Investimento: R$ {product.oldPrice?.toFixed(2)}</span>
                        <div className="text-[#00A3FF] text-5xl md:text-7xl font-black tracking-tighter italic">R$ {product.price.toFixed(2)}</div>
                      </div>
                      <div className="glass-dark px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border-white/5 flex flex-col items-center">
                        <span className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Preço de</span>
                        <span className="text-white font-black text-[9px] md:text-xs uppercase tracking-widest italic">IMPORTAÇÃO</span>
                      </div>
                   </div>
                </div>

                <p className="text-slate-400 text-base md:text-xl leading-relaxed font-bold border-l-2 border-[#00A3FF] pl-6 md:pl-8 italic">
                  "{product.description}"
                </p>

                {/* Grid de Atributos Pro - Mobile Optimized */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                   {product.features.slice(0, 4).map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/5 group/feat">
                       <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF] border border-[#00A3FF]/20 group-hover/feat:bg-[#00A3FF] group-hover/feat:text-white transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3"/></svg>
                       </div>
                       <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-tight">{feature.replace('✔ ', '')}</span>
                    </div>
                   ))}
                </div>

                {/* Botão QUERO ESSE STATUS - Mobile Width Full */}
                <div className="pt-6">
                   <Link 
                    to={`/produto/${product.id}`}
                    className="group relative w-full inline-flex items-center justify-center bg-white text-black py-6 md:py-8 rounded-[2rem] md:rounded-[2.5rem] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] hover:bg-[#00A3FF] hover:text-white transition-all duration-700 shadow-2xl active:scale-95"
                   >
                     <span>QUERO ESSE STATUS</span>
                     <svg className="w-5 h-5 ml-4 md:ml-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="3"/></svg>
                   </Link>
                </div>
              </div>

            </div>
          </section>
        ))}
      </div>

      {/* Trust Bar Premium Adaptativo */}
      <section className="mt-32 py-20 border-y border-white/5 glass-dark">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
           {[
             { label: 'Garantia Elite', val: '7 Dias' },
             { label: 'Importação', val: 'Direta' },
             { label: 'Membros Vip', val: '+15k' },
             { label: 'Suporte', val: 'Humanizado' }
           ].map((t, i) => (
             <div key={i} className="space-y-1">
                <div className="text-slate-500 text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em]">{t.label}</div>
                <div className="text-white text-xl md:text-3xl font-black italic tracking-tighter uppercase">{t.val}</div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
