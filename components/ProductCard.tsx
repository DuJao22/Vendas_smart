
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
      {/* Badges */}
      <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-blue-600/20">Novo</span>
        )}
        {product.isBestseller && (
          <span className="bg-amber-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-amber-500/20">Mais Vendido</span>
        )}
      </div>

      <div className="absolute top-5 right-5 z-20 glass px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-white/40">
        <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        <span className="text-[11px] font-black text-slate-800">{product.rating}</span>
      </div>

      <Link to={`/produto/${product.id}`} className="block relative aspect-square bg-slate-50 overflow-hidden">
        {/* Skeleton Loader Background - Always behind the image */}
        <div className={`absolute inset-0 bg-slate-200 animate-pulse transition-opacity duration-700 flex items-center justify-center ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}>
           <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        <img 
          src={product.image} 
          alt={product.name} 
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 relative z-10" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
      </Link>

      <div className="p-10">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{product.category}</div>
        </div>
        
        <h3 className="text-2xl font-black text-slate-950 mb-3 group-hover:text-blue-600 transition-colors tracking-tighter leading-none">
          <Link to={`/produto/${product.id}`}>{product.name}</Link>
        </h3>
        
        <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {product.oldPrice && (
              <div className="text-slate-400 text-xs font-bold line-through decoration-red-500/30">R$ {product.oldPrice.toFixed(2)}</div>
            )}
            <div className="text-3xl font-black text-slate-950 tracking-tighter">R$ {product.price.toFixed(2)}</div>
          </div>
          
          <Link 
            to={`/produto/${product.id}`} 
            className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all duration-500 shadow-xl group-hover:rotate-12"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
