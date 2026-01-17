
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group relative glass-dark rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#00A3FF]/30 shadow-2xl">
      {/* Badges de Elite */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex flex-col gap-1.5 md:gap-2">
        {product.isNew && (
          <span className="bg-[#00A3FF] text-white text-[7px] md:text-[9px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-lg uppercase tracking-widest shadow-lg animate-pulse">DNA Novo</span>
        )}
      </div>

      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 glass-dark px-2.5 py-1 md:px-3 md:py-1.5 rounded-full flex items-center space-x-1 border border-white/10">
        <svg className="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        <span className="text-[10px] md:text-[11px] font-black text-white">{product.rating}</span>
      </div>

      <Link to={`/produto/${product.id}`} className="block relative aspect-square bg-[#0a0a0a] overflow-hidden">
        <div className={`absolute inset-0 bg-[#0a0a0a] transition-opacity duration-1000 flex items-center justify-center ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}>
           <div className="w-6 h-6 border-2 border-white/10 border-t-[#00A3FF] rounded-full animate-spin"></div>
        </div>
        
        <img 
          src={product.image} 
          alt={product.name} 
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s] ease-out z-10 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-60 z-20"></div>
      </Link>

      <div className="p-6 md:p-10 space-y-3 md:space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-0.5 bg-[#00A3FF]"></div>
          <div className="text-[8px] md:text-[9px] font-black text-[#00A3FF] uppercase tracking-[0.4em]">{product.category}</div>
        </div>
        
        <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-[#00A3FF] transition-colors truncate">
          <Link to={`/produto/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <div className="text-2xl md:text-2xl font-black text-white tracking-tighter italic">R$ {product.price.toFixed(2)}</div>
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">STATUS ELITE</div>
          </div>
          
          <Link 
            to={`/produto/${product.id}`} 
            className="w-10 h-10 md:w-14 md:h-14 bg-white text-black rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all duration-500 active:scale-90"
          >
            <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
