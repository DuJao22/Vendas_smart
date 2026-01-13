
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types.ts';
import { db } from '../services/db.ts';

interface CartPageProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  onCheckout: () => boolean;
}

const CartPage: React.FC<CartPageProps> = ({ cart, updateQuantity, removeFromCart, onCheckout }) => {
  const [success, setSuccess] = useState(false);
  const [showQuickLogin, setShowQuickLogin] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 45.00;
  const total = subtotal + shipping;

  const handleFinalize = () => {
    const user = db.getCurrentUser();
    if (!user) {
      setShowQuickLogin(true);
      return;
    }
    processOrder();
  };

  const processOrder = () => {
    const completed = onCheckout();
    if (completed) {
      setSuccess(true);
      window.scrollTo(0, 0);
    }
  };

  const handleQuickLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      db.quickLogin(customerName, customerPhone);
      setIsLoading(false);
      setShowQuickLogin(false);
      processOrder();
    }, 800);
  };

  if (success) {
    return (
      <div className="pt-48 pb-40 text-center container mx-auto px-6 animate-fadeIn">
        <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-10 text-emerald-600">
           <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4">Pedido Realizado!</h1>
        <p className="text-slate-500 mb-10">Parabéns pela sua escolha. Em breve você receberá um contato no WhatsApp.</p>
        <Link to="/catalogo" className="bg-slate-950 text-white px-12 py-5 rounded-2xl font-bold text-lg inline-block">Continuar Comprando</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-40 text-center container mx-auto px-6">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-10 text-slate-300">
           <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4">Seu carrinho está vazio.</h1>
        <p className="text-slate-500 mb-10">Que tal escolher um smartwatch incrível agora mesmo?</p>
        <Link to="/catalogo" className="bg-slate-950 text-white px-12 py-5 rounded-2xl font-bold text-lg inline-block">Ver Promoções</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-black text-slate-900 mb-16 uppercase tracking-tighter">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 shadow-sm">
                 <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                 </div>
                 <div className="flex-grow">
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{item.category}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                    <div className="text-2xl font-black text-slate-950 mb-4">R$ {item.price.toFixed(2)}</div>
                    
                    <div className="flex items-center justify-between">
                       <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">-</button>
                          <span className="w-10 text-center font-bold text-slate-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">+</button>
                       </div>
                       <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm font-bold uppercase tracking-widest hover:text-red-700 transition-colors">Remover</button>
                    </div>
                 </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 sticky top-32">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Resumo do Pedido</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Frete</span>
                <span>{shipping === 0 ? 'GRÁTIS' : `R$ ${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between">
                <span className="text-xl font-black text-slate-900 uppercase tracking-tighter">Total</span>
                <span className="text-2xl font-black text-blue-600">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleFinalize}
              className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95 uppercase tracking-[0.1em]"
            >
              Concluir Pedido
            </button>

            <div className="text-center">
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  Compra Protegida por Cronos Elite
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE IDENTIFICAÇÃO RÁPIDA */}
      {showQuickLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowQuickLogin(false)}></div>
          <div className="relative bg-[#0a0a0c] border border-white/10 w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-slideUp">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-600/20">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Quase Lá!</h2>
              <p className="text-slate-500 text-sm mt-2">Identifique-se rapidamente para finalizar seu pedido.</p>
            </div>

            <form onSubmit={handleQuickLoginSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Como podemos te chamar?</label>
                <input 
                  required
                  type="text" 
                  placeholder="Nome Completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">WhatsApp para Contato</label>
                <input 
                  required
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <button 
                disabled={isLoading}
                type="submit"
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center justify-center space-x-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>CONTINUAR</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
