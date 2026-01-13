
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#f8fafc]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fadeIn">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="flex h-2 w-2 mr-3 bg-blue-600 rounded-full animate-ping"></span>
            Coleção Exclusiva 2024
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter">
            O Futuro no <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">seu Pulso.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
            Engenharia de precisão e design minimalista. Transforme sua rotina com a tecnologia wearable mais avançada do mercado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Link to="/catalogo" className="bg-slate-950 text-white px-10 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 text-center">
              Explorar Coleção
            </Link>
            <a href="#benefits" className="bg-white border-2 border-slate-100 text-slate-900 px-10 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:border-blue-600 transition-all text-center">
              Diferenciais
            </a>
          </div>

          <div className="flex items-center space-x-6 pt-10 border-t border-slate-200/50">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=user${i}`} className="w-12 h-12 rounded-full border-4 border-white shadow-xl" alt="Satisfied Customer" />
              ))}
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              <span className="text-slate-950">+5.000 Membros</span> na comunidade Elite
            </p>
          </div>
        </div>

        <div className="relative group flex justify-center items-center">
           {/* Glow Effect */}
           <div className="absolute w-[80%] h-[80%] bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/30 transition-all duration-1000"></div>
           
           <div className="relative z-10 w-full max-w-[550px] animate-float">
             <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] bg-slate-200">
               <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop" 
                alt="Cronos Elite Smartwatch" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
             </div>

             {/* Scarcity Badge Floating */}
             <div className="absolute -bottom-6 -left-6 md:-left-12 z-20 glass p-6 rounded-[2rem] shadow-2xl border border-white/40 animate-pulse">
                <div className="text-blue-600 font-black text-2xl leading-none uppercase tracking-tighter">Últimas</div>
                <div className="text-slate-800 text-[10px] font-black uppercase tracking-widest mt-1">unidades em estoque</div>
             </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
