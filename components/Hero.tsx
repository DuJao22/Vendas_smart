
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-40 md:pt-56 pb-24 overflow-hidden bg-[#0B0B0B]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 w-[800px] h-[800px] bg-[#00A3FF]/10 rounded-full blur-[180px] -z-10"></div>
      <div className="absolute bottom-0 left-0 -ml-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 animate-fadeIn">
            <div className="inline-flex items-center px-5 py-2.5 bg-[#00A3FF]/10 border border-[#00A3FF]/20 rounded-full text-[#00A3FF] text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="w-2.5 h-2.5 bg-[#00A3FF] rounded-full mr-3 animate-pulse"></span>
              TECNOLOGIA DE ELITE 2024
            </div>
            
            <div className="space-y-4">
              <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                D22
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#00A3FF] leading-tight tracking-tighter">
                O Futuro no <br />
                <span className="text-white">seu Pulso.</span>
              </h2>
            </div>
            
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium">
              Engenharia de alta precisão e design futurista. O D22 ELITE é a peça definitiva para quem domina o seu tempo e o seu destino.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/catalogo" className="bg-[#00A3FF] text-white px-14 py-8 rounded-[3rem] font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-3xl hover:-translate-y-2 active:scale-95 text-center">
                Reservar Meu D22
              </Link>
              <a href="#benefits" className="bg-white/5 border-2 border-white/10 text-white px-14 py-8 rounded-[3rem] font-black text-sm uppercase tracking-widest hover:border-[#00A3FF] transition-all text-center">
                Ver Tecnologia
              </a>
            </div>

            <div className="pt-12 flex items-center space-x-6">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=d22user${i}`} className="w-12 h-12 rounded-full border-4 border-[#0B0B0B] shadow-xl" />)}
               </div>
               <div className="flex flex-col">
                 <span className="text-[12px] font-black text-white uppercase tracking-widest">+15k MEMBROS ELITE</span>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SATISFAÇÃO GARANTIDA</span>
               </div>
            </div>
          </div>

          <div className="relative group flex justify-center lg:justify-end">
             <div className="absolute inset-0 bg-[#00A3FF]/20 rounded-full blur-[120px] scale-75 group-hover:scale-110 transition-transform duration-1000"></div>
             <div className="relative rounded-[5rem] overflow-hidden shadow-[0_80px_120px_rgba(0,0,0,0.6)] animate-float max-w-[550px]">
               <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop" 
                alt="D22 ELITE Watch" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
               />
               <div className="absolute bottom-12 left-12 glass p-8 rounded-[2.5rem] border border-white/10 animate-pulse">
                  <div className="text-3xl font-black text-white leading-none tracking-tighter uppercase italic">D22</div>
                  <div className="text-[10px] font-black text-[#00A3FF] uppercase tracking-[0.4em] mt-2">Future Tech</div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .shadow-3xl { shadow: 0 35px 60px -15px rgba(0, 163, 255, 0.3); }
      `}</style>
    </section>
  );
};

export default Hero;
