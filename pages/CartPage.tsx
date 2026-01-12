
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { db } from '../services/db';

interface CartPageProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  onCheckout: () => boolean;
}

const CartPage: React.FC<CartPageProps> = ({ cart, updateQuantity, removeFromCart, onCheckout }) => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 45.00;
  const total = subtotal + shipping;

  const handleFinalize = () => {
    const user = db.getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const completed = onCheckout();
    if (completed) {
      setSuccess(true);
      window.scrollTo(0, 0);
    }
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
        <h1 className="text-4xl font-black text-slate-900 mb-16">Finalizar Compra</h1>

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
            <h2 className="text-2xl font-black text-slate-900">Resumo do Pedido</h2>
            
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
                <span className="text-xl font-black text-slate-900 uppercase">Total</span>
                <span className="text-2xl font-black text-blue-600">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleFinalize}
              className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95 uppercase tracking-widest"
            >
              Concluir Pedido
            </button>

            <div className="text-center">
               <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                  Garantia de Satisfação Cronos Elite
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
