
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
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        <header className="mb-16 text-center space-y-4">
          <h1 className="text-5xl font-black text-slate-900">Catálogo Cronos</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A maior curadoria de smartwatches premium do mercado. Encontre o modelo que se adapta perfeitamente ao seu lifestyle.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-slate-950 text-white shadow-xl scale-110' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {cat === 'All' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
