
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-40 md:pt-56 pb-24 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 -ml-20 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-fadeIn">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/5 border border-blue-600/10 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse"></span>
              Lançamento Oficial 2024
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 leading-[1.05] tracking-tighter">
              O Futuro no <br />
              <span className="text-blue-600 italic">seu Pulso.</span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
              Tecnologia suíça encontra o monitoramento inteligente. O Cronos Elite é a peça que faltava no seu arsenal de sucesso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/catalogo" className="bg-slate-950 text-white px-12 py-7 rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl hover:-translate-y-1 active:scale-95 text-center">
                Comprar Agora
              </Link>
              <a href="#benefits" className="bg-white border-2 border-slate-100 text-slate-900 px-12 py-7 rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:border-blue-600 transition-all text-center">
                Ver Detalhes
              </a>
            </div>

            <div className="pt-10 flex items-center space-x-4">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-md" />)}
               </div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aprovado por +12k executivos</span>
            </div>
          </div>

          <div className="relative group">
             <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-[100px] scale-75 group-hover:scale-100 transition-transform duration-1000"></div>
             <div className="relative rounded-[4rem] overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.1)] animate-float">
               <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop" 
                alt="Cronos Watch" 
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000"
               />
               <div className="absolute top-10 right-10 glass p-5 rounded-3xl border border-white/20 animate-pulse">
                  <div className="text-2xl font-black text-slate-900 leading-none">8.9k</div>
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Vendas este mês</div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
