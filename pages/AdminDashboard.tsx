
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Product, Order, DashboardStats, StoreSettings, AuditLog } from '../types';
import { useNavigate } from 'react-router-dom';

/**
 * CRONOS ADMIN PRO - MOBILE FIRST & ANTI-WHITE SCREEN
 * Desenvolvido por João Layon
 * © João Layon – Todos os direitos reservados
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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { id: 'dash', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'inventory', label: 'Produtos', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'orders', label: 'Vendas', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { id: 'settings', label: 'Ajustes', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z' },
    { id: 'logs', label: 'Auditoria', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center space-x-3 mb-10 px-2">
         <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         </div>
         <span className="text-xl font-black text-white italic tracking-tighter">CRONOS<span className="text-blue-500">PRO</span></span>
      </div>

      <nav className="flex-grow space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id as any); setIsMenuOpen(false); }}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={item.icon} strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="font-bold text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <button onClick={handleLogout} className="mt-auto flex items-center space-x-3 px-6 py-4 text-red-500 hover:bg-red-500/5 rounded-2xl transition-all font-bold text-sm">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7" strokeWidth="2" strokeLinecap="round"/></svg>
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-inter">
      
      {/* DRAWER MOBILE */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute left-0 top-0 bottom-0 w-72 bg-[#080808] border-r border-white/5 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <SidebarContent />
        </div>
      </div>

      {/* SIDEBAR DESKTOP */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#080808] border-r border-white/5 hidden lg:block z-50">
        <SidebarContent />
      </aside>

      {/* TOP HEADER */}
      <header className="sticky top-0 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-6 py-6 lg:pl-[20rem] lg:pr-10 flex items-center justify-between z-40">
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-white bg-white/5 rounded-xl">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight">
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
        </div>
        
        {activeTab === 'inventory' && (
          <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-[10px] uppercase shadow-lg shadow-blue-600/20">
            + Produto
          </button>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="p-6 lg:pl-[20rem] lg:pr-10 lg:pt-10 pb-20">
        
        {activeTab === 'dash' && (
          <div className="space-y-6 lg:space-y-10">
             {/* Stats Grid */}
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Faturamento', val: `R$ ${stats.totalRevenue.toLocaleString()}`, color: 'text-emerald-500' },
                  { label: 'Vendas Hoje', val: `R$ ${stats.todayRevenue.toLocaleString()}`, color: 'text-blue-500' },
                  { label: 'Pedidos', val: stats.totalOrders, color: 'text-orange-500' },
                  { label: 'Conversão', val: `${stats.conversionRate.toFixed(1)}%`, color: 'text-purple-500' }
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 p-4 lg:p-6 rounded-3xl">
                     <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</div>
                     <div className={`text-base lg:text-2xl font-black ${s.color}`}>{s.val}</div>
                  </div>
                ))}
             </div>

             {/* Recent Sales */}
             <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6">
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-tighter">Vendas Recentes</h3>
                <div className="space-y-3">
                   {orders.length === 0 ? (
                     <div className="py-10 text-center text-slate-500 text-sm">Nenhum pedido realizado ainda.</div>
                   ) : orders.slice(0, 5).map(o => (
                     <div key={o.id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                        <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-500 text-[9px] font-mono">#{o.id.split('-')[1]}</div>
                           <div className="min-w-0">
                              <div className="text-white text-xs font-bold truncate w-24 sm:w-auto">{o.userName}</div>
                              <div className="text-[9px] text-slate-500 font-bold uppercase">{new Date(o.createdAt).toLocaleDateString()}</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-white text-xs font-black">R$ {o.total.toFixed(2)}</div>
                           <div className={`text-[8px] font-black uppercase mt-1 ${o.status === 'paid' ? 'text-emerald-500' : 'text-orange-500'}`}>{o.status}</div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {products.map(p => (
               <div key={p.id} className="bg-white/5 border border-white/5 p-5 rounded-[2rem] group hover:bg-white/[0.08] transition-all">
                  <div className="flex items-center space-x-4 mb-6">
                     <img src={p.image} className="w-16 h-16 rounded-xl object-cover" />
                     <div className="min-w-0">
                        <div className="text-[8px] font-black text-blue-500 uppercase mb-0.5">{p.category}</div>
                        <h4 className="text-sm font-bold text-white truncate">{p.name}</h4>
                        <div className="text-lg font-black text-white">R$ {p.price.toFixed(2)}</div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <div className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${p.stock < 5 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                        <span className="text-[9px] font-black text-slate-500 uppercase">{p.stock} UNID.</span>
                     </div>
                     <div className="flex space-x-2">
                        <button onClick={() => { setEditingItem(p); setIsModalOpen(true); }} className="p-2.5 bg-white/5 rounded-lg text-slate-400 hover:text-white">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2"/></svg>
                        </button>
                        <button onClick={() => { if(confirm('Excluir?')) { db.deleteProduct(p.id); refresh(); } }} className="p-2.5 bg-white/5 rounded-lg text-slate-400 hover:text-red-500">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/></svg>
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
               <div key={o.id} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="font-mono text-[10px] text-blue-500">#{o.id}</div>
                     <div className="text-[10px] text-slate-500">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-base font-bold text-white">{o.userName}</div>
                  <div className="flex flex-wrap gap-2">
                     {o.items.map((it, idx) => (
                        <span key={idx} className="bg-white/5 px-3 py-1 rounded-xl text-[9px] font-bold text-slate-400">{it.quantity}x {it.name}</span>
                     ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <div className="text-xl font-black text-white">R$ {o.total.toFixed(2)}</div>
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
          <div className="max-w-2xl space-y-6">
             <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 lg:p-10 space-y-8">
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Nome da Loja</label>
                   <input type="text" value={settings.storeName} onChange={(e) => setSettings({...settings, storeName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Email Admin</label>
                   <input type="text" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                </div>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-2xl">
                   <div className="text-[10px] font-black text-white uppercase">Modo de Manutenção</div>
                   <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all ${settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-700'}`} onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                   </div>
                </div>
                <button onClick={() => { db.saveSettings(settings); refresh(); }} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase shadow-xl shadow-blue-600/20">
                   Salvar Alterações
                </button>
             </div>
          </div>
        )}

        {activeTab === 'logs' && (
           <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 space-y-4">
              {logs.map(log => (
                <div key={log.id} className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 flex justify-between items-start">
                   <div>
                      <div className="text-white text-[10px] font-bold">{log.action}: <span className="text-blue-500">{log.target}</span></div>
                      <div className="text-[8px] text-slate-500 font-bold uppercase mt-1">por {log.userName}</div>
                   </div>
                   <div className="text-[8px] text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</div>
                </div>
              ))}
           </div>
        )}

      </main>

      {/* PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative bg-[#0f0f12] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">{editingItem ? 'Editar' : 'Novo'} Produto</h2>
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
                  longDescription: '',
                  features: [],
                  specs: {},
                  isActive: true,
                  slug: (d.get('name') as string).toLowerCase().replace(/ /g, '-'),
                  displayOrder: 0,
                  rating: 5,
                  reviewsCount: 0
                };
                db.saveProduct(p);
                setIsModalOpen(false);
                refresh();
              }} className="space-y-6">
                 <input required name="name" defaultValue={editingItem?.name} placeholder="Nome do Produto" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" />
                 <div className="grid grid-cols-2 gap-4">
                    <input required name="price" type="number" step="0.01" defaultValue={editingItem?.price} placeholder="Preço" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" />
                    <input required name="stock" type="number" defaultValue={editingItem?.stock} placeholder="Estoque" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" />
                 </div>
                 <input required name="image" defaultValue={editingItem?.image} placeholder="URL da Imagem" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" />
                 <select name="category" defaultValue={editingItem?.category || 'Sport'} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none">
                    {db.getCategories().map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
                 <textarea name="description" defaultValue={editingItem?.description} placeholder="Descrição rápida" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none h-24 resize-none" />
                 <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase shadow-xl shadow-blue-600/20">Salvar</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
