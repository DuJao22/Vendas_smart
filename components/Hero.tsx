
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-[80px]"></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fadeIn">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest">
            <span className="flex h-2 w-2 mr-2 bg-blue-600 rounded-full animate-ping"></span>
            Lançamento 2024
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
            O Futuro no <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">seu Pulso.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed font-light">
            Tecnologia, estilo e alta performance. Transforme sua rotina com smartwatches de elite projetados para quem busca o extraordinário.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/catalogo" className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl hover:-translate-y-1 active:scale-95 text-center">
              Explorar Coleção
            </Link>
            <a href="#benefits" className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-bold text-lg hover:border-slate-300 transition-all text-center">
              Ver Diferenciais
            </a>
          </div>

          <div className="flex items-center space-x-6 pt-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Client" />
              ))}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              <span className="text-slate-900 font-bold">+5.000 clientes</span> satisfeitos este mês
            </p>
          </div>
        </div>

        <div className="relative group flex justify-center">
           <div className="relative w-full max-w-[500px]">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:blur-[50px] transition-all duration-700"></div>
             <img 
              src="https://images.unsplash.com/photo-1544117518-30dd5ff7a4b0?q=80&w=1000&auto=format&fit=crop" 
              alt="Premium Smartwatch" 
              className="relative z-10 w-full rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700"
            />
            {/* Scarcity Badge */}
            <div className="absolute -top-6 -right-6 md:top-10 md:-right-10 z-20 glass p-5 rounded-2xl shadow-xl animate-bounce">
                <div className="text-blue-600 font-bold text-xl leading-none">Últimas</div>
                <div className="text-slate-700 text-sm font-medium">unidades hoje!</div>
            </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
