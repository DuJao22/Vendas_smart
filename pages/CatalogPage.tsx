
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { db } from '../services/db';
import { Product } from '../types';

const CatalogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const categories = ['All', 'Business', 'Sport', 'Classic', 'Ultra'];

  useEffect(() => {
    setAllProducts(db.getProducts());
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className="pt-40 md:pt-48 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        <header className="mb-20 text-center space-y-6">
          <div className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">Curadoria Premium</div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Coleção Cronos</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Encontre a combinação perfeita entre luxo e tecnologia para o seu pulso.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-slate-950 text-white shadow-2xl -translate-y-1 scale-105' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-600 hover:text-blue-600 shadow-sm'
              }`}
            >
              {cat === 'All' ? 'Ver Todos' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2"/></svg>
            </div>
            <p className="text-slate-400 font-bold">Nenhum produto nesta categoria no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
