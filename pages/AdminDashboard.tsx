
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Product, Order, DashboardStats, StoreSettings, AuditLog } from '../types';
import { useNavigate } from 'react-router-dom';

/**
 * CRONOS ADMIN ELITE - REESCRITA MOBILE-FIRST PRO
 * Sistema desenvolvido por João Layon
 * © João Layon – Todos os direitos reservados
 */

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dash' | 'inventory' | 'orders' | 'marketing' | 'settings' | 'logs'>('dash');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const user = db.getCurrentUser();
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    db.init();
    refresh();
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

  if (!stats || !settings) return null;

  const NavItem = ({ id, label, icon }: { id: typeof activeTab, label: string, icon: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex flex-col lg:flex-row items-center lg:space-x-4 px-4 py-3 rounded-2xl transition-all group ${activeTab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
    >
      <svg className="w-6 h-6 lg:w-5 lg:h-5 mb-1 lg:mb-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d={icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-[10px] lg:text-sm font-bold tracking-tight">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-inter pb-24 lg:pb-0 lg:pl-72">
      
      {/* SIDEBAR - DESKTOP ONLY */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#080808] border-r border-white/5 hidden lg:flex flex-col p-8 z-50">
        <div className="flex items-center space-x-3 mb-10 px-2">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <span className="text-xl font-black text-white italic">CRONOS<span className="text-blue-500">PRO</span></span>
        </div>

        <nav className="flex-grow space-y-2">
          <NavItem id="dash" label="Dashboard" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          <NavItem id="inventory" label="Inventário" icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          <NavItem id="orders" label="Pedidos" icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          <NavItem id="marketing" label="Marketing" icon="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          <NavItem id="settings" label="Ajustes" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z" />
          <NavItem id="logs" label="Audit" icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center space-x-3 px-6 py-4 text-red-500 hover:bg-red-500/5 rounded-2xl transition-all font-bold text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7" strokeWidth="2" strokeLinecap="round"/></svg>
          <span>Sair da Conta</span>
        </button>
      </aside>

      {/* BOTTOM NAVIGATION - MOBILE ONLY */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0c]/90 backdrop-blur-xl border-t border-white/5 lg:hidden flex justify-around p-3 z-50">
        <NavItem id="dash" label="Home" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        <NavItem id="inventory" label="Produtos" icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        <NavItem id="orders" label="Vendas" icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        <NavItem id="settings" label="Ajustes" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z" />
      </nav>

      {/* HEADER BAR */}
      <header className="sticky top-0 bg-[#050505]/80 backdrop-blur-md px-6 py-6 lg:px-10 flex items-center justify-between z-40 border-b border-white/5">
        <div>
           <h1 className="text-xl lg:text-3xl font-black text-white tracking-tight uppercase">
             {activeTab === 'dash' && 'Overview'}
             {activeTab === 'inventory' && 'Inventário'}
             {activeTab === 'orders' && 'Vendas'}
             {activeTab === 'marketing' && 'Crescimento'}
             {activeTab === 'settings' && 'Ajustes'}
             {activeTab === 'logs' && 'Auditoria'}
           </h1>
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Gestão Elite • João Layon</p>
        </div>
        
        {activeTab === 'inventory' && (
          <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-blue-600/20 transition-all">
            + Produto
          </button>
        )}
      </header>

      {/* MAIN VIEWPORT */}
      <main className="p-6 lg:p-10 animate-fadeIn">
        
        {activeTab === 'dash' && (
          <div className="space-y-8 lg:space-y-10">
             {/* Stats Grid Responsivo */}
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {[
                  { label: 'Faturamento', val: `R$ ${stats.totalRevenue.toLocaleString()}`, color: 'text-emerald-500', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Hoje', val: `R$ ${stats.todayRevenue.toLocaleString()}`, color: 'text-blue-500', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                  { label: 'Pedidos', val: stats.totalOrders, color: 'text-orange-500', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                  { label: 'Conversão', val: `${stats.conversionRate.toFixed(1)}%`, color: 'text-purple-500', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 p-5 lg:p-8 rounded-[2rem] hover:bg-white/[0.08] transition-all group">
                     <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-white mb-4 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={s.icon} strokeWidth="2" strokeLinecap="round"/></svg>
                     </div>
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</div>
                     <div className={`text-lg lg:text-3xl font-black ${s.color}`}>{s.val}</div>
                  </div>
                ))}
             </div>

             {/* Recent Activity Card */}
             <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-6 lg:p-10">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Últimas Vendas</h3>
                   <button onClick={() => setActiveTab('orders')} className="text-blue-500 text-[10px] font-black uppercase">Ver Tudo</button>
                </div>
                <div className="space-y-4">
                   {orders.slice(0, 5).map(o => (
                     <div key={o.id} className="flex items-center justify-between p-5 bg-white/[0.02] rounded-3xl border border-white/5">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 font-mono text-[10px]">#{o.id.split('-')[1]}</div>
                           <div>
                              <div className="text-white text-sm font-bold truncate max-w-[120px] lg:max-w-none">{o.userName}</div>
                              <div className="text-[9px] text-slate-500 font-bold uppercase">{new Date(o.createdAt).toLocaleDateString()}</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-white text-sm font-black">R$ {o.total.toFixed(2)}</div>
                           <div className={`text-[8px] font-black uppercase mt-1 ${o.status === 'paid' ? 'text-emerald-500' : 'text-orange-500'}`}>{o.status}</div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
             {products.map(p => (
               <div key={p.id} className="bg-white/5 border border-white/5 p-5 lg:p-8 rounded-[2.5rem] group hover:bg-white/[0.08] transition-all">
                  <div className="flex items-center space-x-5 mb-6">
                     <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl bg-slate-800 flex-shrink-0">
                        <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                     </div>
                     <div className="flex-grow min-w-0">
                        <div className="text-[8px] font-black text-blue-500 uppercase mb-1">{p.category}</div>
                        <h4 className="text-base font-bold text-white truncate leading-tight">{p.name}</h4>
                        <div className="text-lg font-black text-white mt-1">R$ {p.price.toFixed(2)}</div>
                     </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-white/5">
                     <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${p.stock < 5 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                        <span className="text-[9px] font-black text-slate-500 uppercase">{p.stock} UNID.</span>
                     </div>
                     <div className="flex space-x-2">
                        <button onClick={() => { setEditingItem(p); setIsModalOpen(true); }} className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2" strokeLinecap="round"/></svg>
                        </button>
                        <button onClick={() => { if(confirm('Excluir permanentemente?')) { db.deleteProduct(p.id); refresh(); } }} className="p-3 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-xl transition-all">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" strokeLinecap="round"/></svg>
                        </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
             {orders.map(o => (
               <div key={o.id} className="bg-white/5 border border-white/5 p-6 lg:p-8 rounded-[2.5rem] flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-white/[0.08] transition-all">
                  <div className="flex-grow space-y-2">
                     <div className="flex items-center space-x-3 text-blue-500 font-mono text-xs font-black">
                        <span>#{o.id.split('-')[1]}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                        <span className="text-slate-500 font-inter">{new Date(o.createdAt).toLocaleString()}</span>
                     </div>
                     <div className="text-lg lg:text-xl font-black text-white">{o.userName}</div>
                     <div className="flex flex-wrap gap-2 pt-2">
                        {o.items.map((it, idx) => (
                           <span key={idx} className="bg-white/5 px-3 py-1.5 rounded-xl text-[9px] font-bold text-slate-400 border border-white/5">{it.quantity}x {it.name}</span>
                        ))}
                     </div>
                  </div>
                  <div className="flex items-center justify-between lg:flex-col lg:items-end gap-4 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5">
                     <div className="text-xl lg:text-2xl font-black text-white">R$ {o.total.toFixed(2)}</div>
                     <select 
                        value={o.status}
                        onChange={(e) => { db.updateOrderStatus(o.id, e.target.value as any); refresh(); }}
                        className={`bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase outline-none focus:border-blue-500 transition-all ${o.status === 'paid' ? 'text-emerald-500' : 'text-orange-500'}`}
                     >
                        <option value="pending">Pendente</option>
                        <option value="paid">Pago</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregue</option>
                        <option value="cancelled">Cancelado</option>
                     </select>
                  </div>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-6 lg:space-y-10">
             <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 lg:p-12 space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Nome da Loja</label>
                      <input type="text" value={settings.storeName} onChange={(e) => setSettings({...settings, storeName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Email Admin</label>
                      <input type="text" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                   </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Taxa de Frete (R$)</label>
                      <input type="number" value={settings.shippingFlatRate} onChange={(e) => setSettings({...settings, shippingFlatRate: parseFloat(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                   </div>
                   <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <div>
                         <div className="text-[10px] font-black text-white uppercase">Modo de Manutenção</div>
                         <div className="text-[8px] text-slate-500 uppercase font-bold mt-0.5">Retirar site do ar</div>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all ${settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-700'}`} onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}>
                         <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                   </div>
                </div>
                <button onClick={() => { db.saveSettings(settings); refresh(); }} className="w-full lg:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all">
                   Salvar Alterações
                </button>
             </div>
          </div>
        )}

        {activeTab === 'logs' && (
           <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-6 lg:p-12 space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-10">Histórico do Sistema</h3>
              <div className="space-y-4">
                 {logs.map(log => (
                   <div key={log.id} className="flex items-center justify-between p-5 bg-white/[0.02] rounded-3xl border border-white/5 border-l-4 border-l-blue-600">
                      <div>
                         <div className="text-white text-xs font-bold">{log.action}: <span className="text-blue-500">{log.target}</span></div>
                         <div className="text-[9px] text-slate-500 font-bold uppercase mt-1">por {log.userName} • {new Date(log.timestamp).toLocaleString()}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}

      </main>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative bg-[#0f0f12] border border-white/10 w-full max-w-2xl rounded-[3rem] p-8 lg:p-12 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-2xl lg:text-3xl font-black text-white">{editingItem ? 'Editar Produto' : 'Novo Produto'}</h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/></svg>
                 </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const d = new FormData(e.currentTarget);
                const p: Product = {
                  id: editingItem?.id || Math.random().toString(36).substr(2, 9),
                  name: d.get('name') as string,
                  price: parseFloat(d.get('price') as string),
                  oldPrice: parseFloat(d.get('oldPrice') as string) || undefined,
                  stock: parseInt(d.get('stock') as string),
                  category: d.get('category') as string,
                  description: d.get('description') as string,
                  longDescription: editingItem?.longDescription || '',
                  image: d.get('image') as string,
                  isActive: true,
                  slug: (d.get('name') as string).toLowerCase().replace(/ /g, '-'),
                  displayOrder: 0,
                  rating: editingItem?.rating || 5,
                  reviewsCount: editingItem?.reviewsCount || 0,
                  features: editingItem?.features || [],
                  specs: editingItem?.specs || {}
                };
                db.saveProduct(p);
                setIsModalOpen(false);
                refresh();
              }} className="space-y-6 lg:space-y-8">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Título do Smartwatch</label>
                    <input required name="name" defaultValue={editingItem?.name} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Preço de Venda (R$)</label>
                       <input required name="price" type="number" step="0.01" defaultValue={editingItem?.price} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Estoque Inicial</label>
                       <input required name="stock" type="number" defaultValue={editingItem?.stock} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">URL da Imagem</label>
                    <input required name="image" defaultValue={editingItem?.image} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Categoria</label>
                    <select name="category" defaultValue={editingItem?.category || 'Sport'} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none">
                       {db.getCategories().map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Copy Curta (Display)</label>
                    <textarea name="description" defaultValue={editingItem?.description} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none h-24 resize-none" />
                 </div>

                 <button type="submit" className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all">
                   Finalizar e Salvar
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* CUSTOM SCROLLBAR CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scaleUp { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
