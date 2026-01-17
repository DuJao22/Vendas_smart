
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Product, Order, DashboardStats, StoreSettings, AuditLog } from '../types';
import { useNavigate, Link } from 'react-router-dom';

/**
 * D22 ELITE COMMAND CENTER - V5.0
 * Design por João Layon
 */

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dash' | 'inventory' | 'orders' | 'settings' | 'logs'>('dash');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const user = db.getCurrentUser();
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    db.init();
    refresh();
    setLoading(false);
  }, [navigate]);

  const refresh = () => {
    setStats(db.getStats());
    setProducts(db.getProducts());
    setOrders(db.getOrders().reverse());
    setLogs(db.getLogs());
    setSettings(db.getSettings());
  };

  const handleLogout = () => {
    db.logout();
    navigate('/login');
  };

  if (loading || !stats || !settings) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="loader-spin"></div>
      </div>
    );
  }

  const navItems = [
    { id: 'dash', label: 'Monitoramento', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'inventory', label: 'Estoque Elite', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'orders', label: 'Fluxo de Vendas', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { id: 'settings', label: 'DNA da Loja', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z' },
    { id: 'logs', label: 'Auditoria', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-8 font-inter">
      <Link to="/" className="flex items-center space-x-4 mb-16 px-2 group">
         <div className="w-12 h-12 bg-[#00A3FF] rounded-2xl flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,163,255,0.4)] transform group-hover:rotate-12 transition-transform">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         </div>
         <div className="flex flex-col">
            <span className="text-xl font-black text-white italic tracking-tighter leading-none">D22<span className="text-[#00A3FF]">ELITE</span></span>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">COMMAND CENTER</span>
         </div>
      </Link>

      <nav className="flex-grow space-y-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id as any); setIsMenuOpen(false); }}
            className={`w-full flex items-center space-x-4 px-6 py-5 rounded-[2rem] transition-all duration-500 ${activeTab === item.id ? 'bg-[#00A3FF] text-white shadow-[0_20px_40px_rgba(0,163,255,0.3)] scale-105' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={item.icon} strokeWidth="2.5" strokeLinecap="round"/></svg>
            <span className="font-black text-[11px] uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <button onClick={handleLogout} className="mt-auto flex items-center space-x-4 px-8 py-5 text-red-500 hover:bg-red-500/5 rounded-[2rem] transition-all font-black text-[11px] uppercase tracking-widest">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7" strokeWidth="2.5" strokeLinecap="round"/></svg>
        <span>Encerrar Sessão</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-slate-300 font-inter relative overflow-hidden">
      
      {/* Background Ambience Tech */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00A3FF]/5 rounded-full blur-[180px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      {/* DRAWER MOBILE */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute left-0 top-0 bottom-0 w-80 bg-[#0B0B0B] border-r border-white/10 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <SidebarContent />
        </div>
      </div>

      {/* SIDEBAR DESKTOP */}
      <aside className="fixed left-0 top-0 bottom-0 w-80 bg-[#0B0B0B] border-r border-white/10 hidden lg:block z-50">
        <SidebarContent />
      </aside>

      {/* TOP HEADER COMMAND */}
      <header className="sticky top-0 bg-[#0B0B0B]/60 backdrop-blur-xl border-b border-white/10 px-8 py-8 lg:pl-80 flex items-center justify-between z-40">
        <div className="flex items-center space-x-6">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-3 text-white bg-white/5 border border-white/10 rounded-2xl">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>
            <span className="text-[9px] font-black text-[#00A3FF] uppercase tracking-[0.4em] mt-1">Status: Conectado à Rede Elite</span>
          </div>
        </div>
        
        {activeTab === 'inventory' && (
          <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-white text-black px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-[0_15px_30px_rgba(255,255,255,0.1)] hover:bg-[#00A3FF] hover:text-white transition-all active:scale-95">
            + Novo Produto
          </button>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="p-8 lg:pl-[22rem] lg:pt-12 pb-24">
        
        {activeTab === 'dash' && (
          <div className="space-y-12">
             {/* Stats Cockpit Grid */}
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Faturamento Total', val: `R$ ${stats.totalRevenue.toLocaleString()}`, color: 'text-emerald-500', glow: 'bg-emerald-500/10' },
                  { label: 'Hoje (Elite)', val: `R$ ${stats.todayRevenue.toLocaleString()}`, color: 'text-[#00A3FF]', glow: 'bg-[#00A3FF]/10' },
                  { label: 'Pedidos Ativos', val: stats.totalOrders, color: 'text-white', glow: 'bg-white/5' },
                  { label: 'Tx. Conversão', val: `${stats.conversionRate.toFixed(1)}%`, color: 'text-purple-500', glow: 'bg-purple-500/10' }
                ].map((s, i) => (
                  <div key={i} className={`glass p-8 rounded-[2.5rem] relative overflow-hidden group hover:scale-105 transition-all duration-500 border-white/10`}>
                     <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[40px] ${s.glow}`}></div>
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">{s.label}</div>
                     <div className={`text-2xl lg:text-4xl font-black tracking-tighter italic ${s.color}`}>{s.val}</div>
                  </div>
                ))}
             </div>

             {/* Live Sales Stream */}
             <div className="glass rounded-[3.5rem] p-10 border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent opacity-50"></div>
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center">
                     <span className="w-2.5 h-2.5 bg-[#00A3FF] rounded-full mr-4 animate-pulse"></span>
                     Fluxo de Operações Recentes
                   </h3>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tempo Real Ativo</span>
                </div>
                
                <div className="space-y-5">
                   {orders.length === 0 ? (
                     <div className="py-20 text-center text-slate-500 font-bold uppercase tracking-widest text-xs italic">Aguardando primeira venda elite...</div>
                   ) : orders.slice(0, 6).map(o => (
                     <div key={o.id} className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-[#00A3FF]/30 transition-all group">
                        <div className="flex items-center space-x-6">
                           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#00A3FF] font-black text-[10px] border border-white/10 group-hover:bg-[#00A3FF] group-hover:text-white transition-all">
                             {o.id.split('-')[1]}
                           </div>
                           <div>
                              <div className="text-white text-sm font-black uppercase italic tracking-tight">{o.userName}</div>
                              <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">{new Date(o.createdAt).toLocaleDateString()} • {o.items.length} ITENS</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-white text-lg font-black tracking-tighter">R$ {o.total.toFixed(2)}</div>
                           <div className={`text-[8px] font-black uppercase mt-1 px-3 py-1 rounded-full border ${o.status === 'paid' ? 'text-emerald-500 border-emerald-500/20' : 'text-orange-500 border-orange-500/20'}`}>
                             {o.status}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
             {products.map(p => (
               <div key={p.id} className="glass p-8 rounded-[3.5rem] group hover:bg-white/10 transition-all duration-700 border-white/10">
                  <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-8 border border-white/5">
                     <img src={p.image} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[3s]" />
                     <div className="absolute top-5 left-5 bg-[#00A3FF] text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                       {p.category}
                     </div>
                  </div>
                  <div className="space-y-6">
                     <h4 className="text-xl font-black text-white uppercase italic tracking-tighter truncate">{p.name}</h4>
                     <div className="flex items-center justify-between">
                        <div className="text-3xl font-black text-[#00A3FF] tracking-tighter italic">R$ {p.price.toFixed(2)}</div>
                        <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                           <div className={`w-2 h-2 rounded-full ${p.stock < 5 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.stock} UNID.</span>
                        </div>
                     </div>
                     <div className="flex gap-4 pt-4">
                        <button onClick={() => { setEditingItem(p); setIsModalOpen(true); }} className="flex-grow bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00A3FF] hover:text-white transition-all active:scale-95">
                           Editar DNA
                        </button>
                        <button onClick={() => { if(confirm('Excluir este produto da rede?')) { db.deleteProduct(p.id); refresh(); } }} className="p-4 bg-red-600/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all border border-red-500/20">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2.5"/></svg>
                        </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-8">
             {orders.map(o => (
               <div key={o.id} className="glass p-10 rounded-[3.5rem] border-white/10 space-y-8 hover:bg-white/5 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                     <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-[#00A3FF]/10 rounded-3xl flex items-center justify-center text-[#00A3FF] border border-[#00A3FF]/20">
                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </div>
                        <div>
                           <div className="text-[#00A3FF] font-mono text-xs font-black tracking-widest uppercase mb-1">REGISTRO #{o.id}</div>
                           <div className="text-2xl font-black text-white uppercase italic tracking-tighter">{o.userName}</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">{new Date(o.createdAt).toLocaleString()}</div>
                        <select 
                           value={o.status}
                           onChange={(e) => { db.updateOrderStatus(o.id, e.target.value as any); refresh(); }}
                           className={`bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] outline-none focus:border-[#00A3FF] transition-all cursor-pointer ${o.status === 'paid' ? 'text-emerald-500' : 'text-orange-500'}`}
                        >
                           <option value="pending">Pendente</option>
                           <option value="paid">Confirmado</option>
                           <option value="shipped">Despachado</option>
                           <option value="delivered">Entregue</option>
                           <option value="cancelled">Cancelado</option>
                        </select>
                     </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                     {o.items.map((it, idx) => (
                        <div key={idx} className="bg-white/5 px-6 py-3 rounded-2xl text-[10px] font-black text-slate-300 border border-white/5 uppercase tracking-widest">
                           {it.quantity}X <span className="text-white italic">{it.name}</span>
                        </div>
                     ))}
                  </div>
                  
                  <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Investimento Total</span>
                        <div className="text-3xl font-black text-white tracking-tighter italic">R$ {o.total.toFixed(2)}</div>
                     </div>
                     <button className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-[0_15px_30px_rgba(16,185,129,0.2)] hover:scale-105 transition-all">
                        Chamar no WhatsApp
                     </button>
                  </div>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-8 animate-fadeIn">
             <div className="glass p-12 rounded-[4rem] border-white/10 space-y-12">
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Nome da Operação</label>
                      <input type="text" value={settings.storeName} onChange={(e) => setSettings({...settings, storeName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:border-[#00A3FF] outline-none transition-all font-bold" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Canal de Contato VIP</label>
                      <input type="text" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:border-[#00A3FF] outline-none transition-all font-bold" />
                   </div>
                </div>

                <div className="flex items-center justify-between bg-white/5 border border-white/10 p-8 rounded-[2.5rem] group hover:border-[#00A3FF]/40 transition-all">
                   <div>
                      <div className="text-sm font-black text-white uppercase italic tracking-tighter">Modo de Manutenção Blindado</div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Bloqueia acesso público à vitrine</p>
                   </div>
                   <div className={`w-16 h-8 rounded-full p-1 cursor-pointer transition-all duration-500 ${settings.maintenanceMode ? 'bg-red-600' : 'bg-slate-700'}`} onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}>
                      <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-500 ${settings.maintenanceMode ? 'translate-x-8' : 'translate-x-0'}`}></div>
                   </div>
                </div>

                <button onClick={() => { db.saveSettings(settings); refresh(); }} className="w-full bg-white text-black py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-[#00A3FF] hover:text-white transition-all duration-700 active:scale-95">
                   Sincronizar Protocolos Elite
                </button>
             </div>
          </div>
        )}

        {activeTab === 'logs' && (
           <div className="glass rounded-[4rem] p-10 border-white/10 space-y-6">
              {logs.map(log => (
                <div key={log.id} className="p-6 bg-white/5 rounded-3xl border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                   <div className="flex items-center space-x-6">
                      <div className="w-2 h-12 bg-[#00A3FF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div>
                         <div className="text-white text-xs font-black uppercase italic tracking-tighter">{log.action}: <span className="text-[#00A3FF]">{log.target}</span></div>
                         <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Agente: {log.userName}</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] text-slate-500 font-black tracking-widest">{new Date(log.timestamp).toLocaleTimeString()}</div>
                      <div className="text-[8px] text-[#00A3FF] font-black uppercase tracking-widest mt-1">Verificado</div>
                   </div>
                </div>
              ))}
           </div>
        )}

      </main>

      {/* MODAL DE EDIÇÃO CYBER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative glass border border-white/10 w-full max-w-xl rounded-[4rem] p-12 max-h-[90vh] overflow-y-auto no-scrollbar shadow-[0_40px_100px_rgba(0,163,255,0.1)]">
              <h2 className="text-3xl font-black text-white mb-10 uppercase italic tracking-tighter">{editingItem ? 'Refinar DNA' : 'Codificar Novo'} Item</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const d = new FormData(e.currentTarget);
                const p: Product = {
                  id: editingItem?.id || Math.random().toString(36).substr(2, 9),
                  name: d.get('name') as string,
                  price: parseFloat(d.get('price') as string),
                  stock: parseInt(d.get('stock') as string),
                  category: d.get('category') as string,
                  image: d.get('image') as string,
                  description: d.get('description') as string,
                  longDescription: editingItem?.longDescription || '',
                  features: editingItem?.features || [],
                  specs: editingItem?.specs || {},
                  gallery: editingItem?.gallery || [d.get('image') as string, d.get('image') as string, d.get('image') as string, d.get('image') as string, d.get('image') as string],
                  isActive: true,
                  slug: (d.get('name') as string).toLowerCase().replace(/ /g, '-'),
                  displayOrder: editingItem?.displayOrder || 0,
                  rating: editingItem?.rating || 5,
                  reviewsCount: editingItem?.reviewsCount || 0
                };
                db.saveProduct(p);
                setIsModalOpen(false);
                refresh();
              }} className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Nome do Modelo</label>
                    <input required name="name" defaultValue={editingItem?.name} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white outline-none focus:border-[#00A3FF]" />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Preço (Elite)</label>
                       <input required name="price" type="number" step="0.01" defaultValue={editingItem?.price} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white outline-none focus:border-[#00A3FF]" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Unid. em Estoque</label>
                       <input required name="stock" type="number" defaultValue={editingItem?.stock} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white outline-none focus:border-[#00A3FF]" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Fonte da Imagem (URL)</label>
                    <input required name="image" defaultValue={editingItem?.image} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white outline-none focus:border-[#00A3FF]" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Setor da Coleção</label>
                    <select name="category" defaultValue={editingItem?.category || 'Smartwatches'} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white outline-none focus:border-[#00A3FF] cursor-pointer">
                       {db.getCategories().map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                    </select>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Slogan Persuasivo</label>
                    <textarea name="description" defaultValue={editingItem?.description} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white outline-none h-32 resize-none focus:border-[#00A3FF]" />
                 </div>
                 <button type="submit" className="w-full bg-white text-black py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-[#00A3FF] hover:text-white transition-all duration-700">
                    Sincronizar Dados Elite
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
