
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_PRODUCTS, MOCK_REVIEWS } from '../data/mockDb';
import { Product } from '../types';

interface ProductDetailsPageProps {
  addToCart: (product: Product) => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const found = INITIAL_PRODUCTS.find(p => p.id === id);
    if (found) setProduct(found);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="pt-40 text-center">Carregando...</div>;

  const handleAddToCart = () => {
    for(let i=0; i < quantity; i++) {
        addToCart(product);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pt-32 pb-24 bg-white relative">
      {/* Toast Notification */}
      <div className={`fixed top-24 right-6 z-[60] glass border-l-4 border-blue-600 p-6 rounded-2xl shadow-2xl transition-all duration-500 transform ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <div className="font-bold text-slate-900">Adicionado ao carrinho!</div>
            <div className="text-slate-500 text-sm">O {product.name} espera por você.</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100">
               <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                    <img src={product.image} className="w-full h-full object-cover" alt="Detail" />
                 </div>
               ))}
            </div>
          </div>

          {/* Details Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{product.category}</span>
                <div className="flex items-center text-amber-400">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className={`w-4 h-4 ${s <= Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3-.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                  <span className="ml-2 text-slate-400 text-sm font-medium">({product.reviewsCount} avaliações)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-6">
                <div className="text-4xl font-black text-slate-950">R$ {product.price.toFixed(2)}</div>
                {product.oldPrice && (
                  <div className="text-xl text-slate-400 line-through">R$ {product.oldPrice.toFixed(2)}</div>
                )}
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold">ECONOMIA DE R$ {(product.oldPrice! - product.price).toFixed(2)}</div>
              </div>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed font-light">{product.longDescription}</p>

            {/* Features Highlight */}
            <div className="grid sm:grid-cols-2 gap-4">
               {product.features.map((f, i) => (
                 <div key={i} className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{f}</span>
                 </div>
               ))}
            </div>

            {/* CTA Box */}
            <div className="p-8 border-2 border-slate-100 rounded-[2.5rem] bg-slate-50/50 space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-2">
                    <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">-</button>
                    <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                    <button onClick={() => setQuantity(quantity+1)} className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">+</button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total</div>
                    <div className="text-2xl font-black text-slate-900">R$ {(product.price * quantity).toFixed(2)}</div>
                  </div>
               </div>

               <button 
                onClick={handleAddToCart}
                className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-2xl hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
               >
                 Adicionar ao Carrinho
               </button>

               <div className="flex items-center justify-center space-x-2 text-red-600 animate-pulse font-bold text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>RESTAM APENAS {product.stock} UNIDADES NO ESTOQUE</span>
               </div>
            </div>

            {/* Scarcity Trigger */}
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-center space-x-6">
               <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
               </div>
               <div>
                  <h4 className="font-bold text-slate-900 text-lg">Compra 100% Segura</h4>
                  <p className="text-sm text-slate-500">Satisfação garantida ou seu dinheiro de volta em até 7 dias úteis.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Technical Specs Table */}
        <div className="mt-32 border-t border-slate-100 pt-20">
           <h2 className="text-3xl font-black text-slate-900 mb-10">Especificações Técnicas</h2>
           <div className="grid md:grid-cols-2 gap-x-20 gap-y-4">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-4 border-b border-slate-100">
                   <span className="text-slate-500 font-medium">{key}</span>
                   <span className="text-slate-900 font-bold">{val}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Social Proof Reviews */}
        <div className="mt-32">
           <div className="flex items-center justify-between mb-16">
              <h2 className="text-3xl font-black text-slate-900">O que dizem os clientes</h2>
              <div className="flex items-center space-x-4">
                 <div className="text-4xl font-black text-slate-900">{product.rating}</div>
                 <div className="text-sm text-slate-400 font-bold uppercase tracking-widest">Avaliação Média</div>
              </div>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {MOCK_REVIEWS.map(rev => (
                <div key={rev.id} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                   <div className="flex items-center space-x-4">
                      <img src={rev.avatar} alt={rev.userName} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                      <div>
                        <div className="font-bold text-slate-900">{rev.userName}</div>
                        <div className="text-xs text-slate-400">{rev.date}</div>
                      </div>
                   </div>
                   <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(s => <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3-.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                   </div>
                   <p className="text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
