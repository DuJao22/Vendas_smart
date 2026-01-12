
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Novo</span>
        )}
        {product.isBestseller && (
          <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Mais Vendido</span>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10 glass px-3 py-1 rounded-full flex items-center space-x-1">
        <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
      </div>

      <Link to={`/produto/${product.id}`} className="block overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </Link>

      <div className="p-8">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">{product.category}</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          <Link to={`/produto/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">{product.description}</p>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-slate-400 text-sm line-through decoration-slate-300">R$ {product.oldPrice?.toFixed(2)}</div>
            <div className="text-2xl font-black text-slate-950">R$ {product.price.toFixed(2)}</div>
          </div>
          <Link to={`/produto/${product.id}`} className="bg-slate-100 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
