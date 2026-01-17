
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_REVIEWS } from '../data/mockDb';
import { db } from '../services/db';
import { Product } from '../types';

interface ProductDetailsPageProps {
  addToCart: (product: Product) => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const products = db.getProducts();
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setMainImage(found.image);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#00A3FF] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const handleAddToCart = () => {
    for(let i=0; i < quantity; i++) {
        addToCart(product);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="bg-[#080808] text-white font-inter pb-20">
      {/* Notificação Toast Mobile Optimized */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[92%] transition-all duration-700 ${showToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'}`}>
        <div className="glass-dark border border-[#00A3FF]/40 p-5 rounded-[2rem] flex items-center justify-between shadow-[0_20px_50px_rgba(0,163,255,0.3)]">
           <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#00A3FF] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white leading-none">Status Reservado!</div>
           </div>
           <Link to="/carrinho" className="bg-white text-black px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest">Finalizar</Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:container lg:mx-auto lg:px-6 lg:pt-48 gap-10">
        
        {/* Visual Showcase - Corrigido para não sobrepor header */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-40 h-fit">
           <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden lg:rounded-[4rem] bg-[#0a0a0a]">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 lg:hidden"></div>
              
              {/* Badges Re-posicionados (Abaixo do Navbar Mobile) */}
              <div className="absolute top-28 left-6 flex flex-col gap-2.5 z-30 lg:top-10">
                 <div className="bg-[#00A3FF] text-white text-[7px] md:text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md inline-block w-fit">PRODUTO ORIGINAL D22</div>
                 {product.stock < 15 && (
                   <div className="bg-red-600/90 text-white text-[7px] md:text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-[0.2em] shadow-2xl animate-pulse inline-block w-fit">ESTOQUE CRÍTICO: {product.stock}</div>
                 )}
              </div>
           </div>

           {/* Galeria Horizontal Touch - Ajustada para Mobile */}
           <div className="px-6 -mt-16 lg:mt-8 relative z-40">
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-4 justify-start">
                 {product.gallery.map((img, i) => (
                   <button 
                    key={i} 
                    onClick={() => setMainImage(img)}
                    className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-500 flex-shrink-0 ${mainImage === img ? 'border-[#00A3FF] scale-105 shadow-lg' : 'border-white/5 opacity-40'}`}
                   >
                      <img src={img} className="w-full h-full object-cover" />
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Sales Content Area */}
        <div className="container mx-auto px-6 lg:px-0 lg:w-1/2 space-y-12 pb-24">
           {/* Header do Produto */}
           <div className="space-y-6">
              <div className="flex items-center space-x-3">
                 <div className="h-0.5 w-6 bg-[#00A3FF]"></div>
                 <span className="text-[#00A3FF] text-[10px] font-black uppercase tracking-[0.4em]">{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] text-glow">
                 {product.name}
              </h1>
              
              <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                 <div className="flex flex-col">
                    <span className="text-slate-600 text-[10px] font-black line-through uppercase tracking-widest mb-1 italic">Investimento Sugerido: R$ {product.oldPrice?.toFixed(2)}</span>
                    <div className="flex items-end space-x-4">
                       <div className="text-white text-5xl md:text-7xl font-black italic tracking-tighter">R$ {product.price.toFixed(2)}</div>
                       <div className="bg-[#00A3FF]/10 border border-[#00A3FF]/20 px-3 py-1.5 rounded-lg mb-2">
                          <span className="text-[#00A3FF] font-black text-[8px] uppercase tracking-widest leading-none">Cotação Elite</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <p className="text-slate-400 text-base md:text-xl leading-relaxed font-bold border-l-2 border-[#00A3FF] pl-6 italic">
              {product.longDescription}
           </p>

           {/* PROTOCOLOS DE PERFORMANCE (Capacidades) */}
           <div className="space-y-8 bg-white/5 rounded-[3rem] p-8 border border-white/5">
              <div className="flex flex-col">
                 <span className="text-[#00A3FF] text-[9px] font-black uppercase tracking-[0.4em] mb-1">Engenharia Wearable</span>
                 <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">DNA Funcional</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {product.features.map((feature, i) => (
                   <div key={i} className="flex items-center space-x-4 bg-black/40 p-4 rounded-2xl border border-white/5 group">
                      <div className="w-10 h-10 bg-[#00A3FF]/10 rounded-xl flex items-center justify-center text-[#00A3FF] border border-[#00A3FF]/20 group-hover:bg-[#00A3FF] group-hover:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="text-white text-[10px] font-black uppercase tracking-tight italic">{feature.replace('✔ ', '')}</span>
                   </div>
                 ))}
              </div>
              
              {/* Tabela Técnica Mobile */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-y-5">
                 {Object.entries(product.specs).map(([key, val]) => (
                   <div key={key}>
                      <div className="text-slate-600 text-[8px] font-black uppercase tracking-[0.2em] mb-0.5">{key}</div>
                      <div className="text-white text-[10px] font-black italic uppercase tracking-tighter">{val}</div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Botão de Ação Robusto */}
           <div className="glass-dark p-8 rounded-[3.5rem] border-[#00A3FF]/20 space-y-8 shadow-2xl border-t border-l">
              <div className="flex items-center justify-between">
                 <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 h-14">
                    <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="w-10 h-full flex items-center justify-center text-[#00A3FF] text-2xl font-black">-</button>
                    <span className="w-10 text-center font-black text-white text-xl">{quantity}</span>
                    <button onClick={() => setQuantity(quantity+1)} className="w-10 h-full flex items-center justify-center text-[#00A3FF] text-2xl font-black">+</button>
                 </div>
                 <div className="text-right">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5 block">Investimento Total</span>
                    <div className="text-3xl font-black text-white italic tracking-tighter">R$ {(product.price * quantity).toFixed(2)}</div>
                 </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#00A3FF] text-white py-7 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(0,163,255,0.4)] hover:bg-white hover:text-black transition-all active:scale-95 flex items-center justify-center space-x-4 group"
              >
                <span>RESERVAR MEU STATUS</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="3"/></svg>
              </button>

              <div className="flex flex-col items-center space-y-4">
                 <div className="flex items-center space-x-3 text-[#00A3FF] font-black text-[8px] uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-[#00A3FF] rounded-full animate-pulse"></span>
                    <span>LOTE EXCLUSIVO 2024 - ÚLTIMAS UNIDADES</span>
                 </div>
                 <div className="flex items-center space-x-8 grayscale opacity-30">
                    <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-3" />
                    <img src="https://img.icons8.com/color/48/000000/pix.png" className="h-3" />
                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-3" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
