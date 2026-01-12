
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Product, Order, DashboardStats, StoreSettings, AuditLog } from '../types';
import { useNavigate } from 'react-router-dom';

/**
 * CRONOS ADMIN PRO - DASHBOARD ELITE
 * Sistema desenvolvido por João Layon
 * © João Layon – Todos os direitos reservados
 */

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dash' | 'inventory' | 'orders' | 'customers' | 'marketing' | 'settings' | 'logs'>('dash');
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

  return (
    <div className="flex h-screen bg-[#050505] text-slate-300 font-inter overflow-hidden">
      {/* Sidebar Profissional */}
      <aside className="w-72 bg-[#080808] border-r border-white/5 flex flex-col p-6 z-50">
        <div className="flex items-center space-x-3 mb-10 px-2">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tighter uppercase italic leading-none">Cronos<span className="text-blue-500">PRO</span></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Management Suite</span>
           </div>
        </div>

        <nav className="flex-grow space-y-1">
          {[
            { id: 'dash', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { id: 'inventory', label: 'Inventário', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { id: 'orders', label: 'Pedidos', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            { id: 'customers', label: 'Clientes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { id: 'marketing', label: 'Marketing', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
            { id: 'settings', label: 'Ajustes', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z' },
            { id: 'logs', label: 'Auditoria', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
          ].map(it => (
            <button
              key={it.id}
              onClick={() => setActiveTab(it.id as any)}
              className={`w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all group ${activeTab === it.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'hover:bg-white/5 text-slate-500 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={it.icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="font-bold text-sm tracking-wide">{it.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
           <div className="bg-white/5 rounded-2xl p-4 mb-4">
              <div className="text-[9px] font-black text-slate-500 uppercase mb-1">Admin Atual</div>
              <div className="text-xs font-bold text-white truncate">João Layon</div>
           </div>
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center space-x-3 py-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
           >
              <span>Logout</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7" strokeWidth="2" strokeLinecap="round"/></svg>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-[#050505]">
           <div>
             <h2 className="text-2xl font-black text-white tracking-tight">
               {activeTab === 'dash' && 'Overview Business'}
               {activeTab === 'inventory' && 'Gestão de Inventário'}
               {activeTab === 'orders' && 'Central de Pedidos'}
               {activeTab === 'customers' && 'Base de Clientes'}
               {activeTab === 'marketing' && 'Marketing & Conversão'}
               {activeTab === 'settings' && 'Configurações da Loja'}
               {activeTab === 'logs' && 'Logs de Auditoria'}
             </h2>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-0.5">Sistema desenvolvido por João Layon</p>
           </div>
           <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#050505]"></div>)}
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">3 usuários online</span>
           </div>
        </header>

        <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
          
          {activeTab === 'dash' && (
            <div className="space-y-10 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { label: 'Faturamento Total', val: `R$ ${stats.totalRevenue.toLocaleString()}`, color: 'text-emerald-500' },
                   { label: 'Vendas Hoje', val: `R$ ${stats.todayRevenue.toLocaleString()}`, color: 'text-blue-500' },
                   { label: 'Pedidos Realizados', val: stats.totalOrders, color: 'text-orange-500' },
                   { label: 'Conversão Média', val: `${stats.conversionRate.toFixed(1)}%`, color: 'text-purple-500' }
                 ].map((s, i) => (
                   <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.08] transition-all">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{s.label}</div>
                      <div className={`text-3xl font-black ${s.color}`}>{s.val}</div>
                   </div>
                 ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-[2.5rem] p-8">
                    <h3 className="text-lg font-bold text-white mb-6">Últimos Pedidos</h3>
                    <div className="space-y-4">
                       {orders.slice(0, 5).map(o => (
                         <div key={o.id} className="flex items-center justify-between p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                            <div className="flex items-center space-x-4">
                               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-mono text-[10px] text-blue-500">#{o.id.split('-')[1]}</div>
                               <div>
                                  <div className="text-white font-bold">{o.userName}</div>
                                  <div className="text-[10px] text-slate-500 font-bold uppercase">{new Date(o.createdAt).toLocaleDateString()} • {o.items.length} itens</div>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="text-white font-black">R$ {o.total.toFixed(2)}</div>
                               <div className={`text-[10px] font-black uppercase mt-1 ${o.status === 'paid' ? 'text-emerald-500' : 'text-orange-500'}`}>{o.status}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8">
                    <h3 className="text-lg font-bold text-white mb-6">Alertas de Estoque</h3>
                    <div className="space-y-4">
                       {products.filter(p => p.stock < 10).map(p => (
                         <div key={p.id} className="flex items-center space-x-4 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                            <img src={p.image} className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                               <div className="text-white text-xs font-bold truncate w-32">{p.name}</div>
                               <div className="text-red-500 text-[10px] font-black uppercase">Apenas {p.stock} em estoque</div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-8 animate-fadeIn">
               <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                     <span className="bg-blue-600/10 text-blue-500 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">{stats.totalProducts} PRODUTOS</span>
                     <span className="bg-orange-600/10 text-orange-500 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">{stats.inventoryAlerts} ALERTAS</span>
                  </div>
                  <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all">
                    Adicionar Produto
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map(p => (
                    <div key={p.id} className="bg-white/5 border border-white/5 p-6 rounded-[2.5rem] group hover:bg-white/[0.08] transition-all relative overflow-hidden">
                       <div className="flex items-center space-x-4 mb-6">
                          <img src={p.image} className="w-20 h-20 rounded-2xl object-cover shadow-2xl" />
                          <div className="flex-grow overflow-hidden">
                             <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{p.category}</div>
                             <h4 className="text-lg font-bold text-white truncate leading-tight">{p.name}</h4>
                             <div className="flex items-center space-x-3 mt-1">
                                <span className="text-lg font-black text-white">R$ {p.price.toFixed(2)}</span>
                                {p.oldPrice && <span className="text-xs text-slate-500 line-through">R$ {p.oldPrice.toFixed(2)}</span>}
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <div className="flex items-center space-x-2">
                             <div className={`w-2 h-2 rounded-full ${p.stock < 5 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                             <span className="text-[10px] font-black text-slate-500 uppercase">{p.stock} UNIDADES</span>
                          </div>
                          <div className="flex space-x-2">
                             <button onClick={() => { setEditingItem(p); setIsModalOpen(true); }} className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </button>
                             <button onClick={() => { if(confirm('Excluir produto?')) { db.deleteProduct(p.id); refresh(); } }} className="p-3 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-xl transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden animate-fadeIn">
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                           <th className="px-8 py-6">ID Pedido</th>
                           <th className="px-8 py-6">Cliente</th>
                           <th className="px-8 py-6">Data / Hora</th>
                           <th className="px-8 py-6">Total Pago</th>
                           <th className="px-8 py-6">Status</th>
                           <th className="px-8 py-6">Ações</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {orders.map(o => (
                          <tr key={o.id} className="hover:bg-white/[0.02] transition-colors group">
                             <td className="px-8 py-6">
                                <div className="font-mono text-blue-500 font-bold">#{o.id.split('-')[1]}</div>
                             </td>
                             <td className="px-8 py-6">
                                <div className="text-white font-bold">{o.userName}</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase">{o.items.length} itens no carrinho</div>
                             </td>
                             <td className="px-8 py-6 text-slate-400 text-xs">{new Date(o.createdAt).toLocaleString()}</td>
                             <td className="px-8 py-6 text-white font-black">R$ {o.total.toFixed(2)}</td>
                             <td className="px-8 py-6">
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
                             </td>
                             <td className="px-8 py-6">
                                <button className="text-slate-500 hover:text-white transition-colors">
                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round"/></svg>
                                </button>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10 space-y-8 animate-fadeIn">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Trilha de Auditoria</h3>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Apenas Administradores</span>
               </div>
               <div className="space-y-4">
                  {logs.map(log => (
                    <div key={log.id} className="flex items-center justify-between p-6 bg-white/[0.02] rounded-3xl border border-white/5 border-l-4 border-l-blue-600">
                       <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3a10.003 10.003 0 00-6.912 2.744M12 11c4.07 0 7.44 2.518 8.774 6M12 11V3m0 8c2.122 0 3.84 1.55 3.84 3.465 0 1.913-1.718 3.465-3.84 3.465s-3.84-1.55-3.84-3.465c0-1.914 1.718-3.465 3.84-3.465z" strokeWidth="2" strokeLinecap="round"/></svg>
                          </div>
                          <div>
                             <div className="text-white font-bold">{log.action}: <span className="text-blue-500">{log.target}</span></div>
                             <div className="text-[10px] text-slate-500 font-bold uppercase">Realizado por {log.userName}</div>
                          </div>
                       </div>
                       <div className="text-right text-xs text-slate-500">
                          {new Date(log.timestamp).toLocaleString()}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl space-y-8 animate-fadeIn">
               <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10 space-y-10">
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Nome da Loja</label>
                        <input type="text" value={settings.storeName} onChange={(e) => setSettings({...settings, storeName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Email de Contato</label>
                        <input type="text" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all" />
                     </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Frete Fixo (R$)</label>
                        <input type="number" value={settings.shippingFlatRate} onChange={(e) => setSettings({...settings, shippingFlatRate: parseFloat(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Cor Primária</label>
                        <div className="flex items-center space-x-4">
                           <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({...settings, primaryColor: e.target.value})} className="w-16 h-16 bg-transparent border-none cursor-pointer" />
                           <span className="text-white font-mono text-xs font-bold">{settings.primaryColor}</span>
                        </div>
                     </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                        <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all ${settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-700'}`} onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}>
                           <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                        <span className="text-sm font-bold text-white uppercase">Modo de Manutenção</span>
                     </div>
                     <button onClick={() => { db.saveSettings(settings); refresh(); }} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                        Salvar Configurações
                     </button>
                  </div>
               </div>
            </div>
          )}

        </div>
      </main>

      {/* MODAL DE PRODUTO (CRUD) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           {/* Fix: Changed setIsProductModalOpen to setIsModalOpen */}
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative bg-[#0f0f12] border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto custom-scrollbar">
              <h2 className="text-3xl font-black text-white mb-8">{editingItem ? 'Editar Produto' : 'Novo Produto'}</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const prod: Product = {
                  id: editingItem?.id || Math.random().toString(36).substr(2, 9),
                  name: data.get('name') as string,
                  price: parseFloat(data.get('price') as string),
                  oldPrice: parseFloat(data.get('oldPrice') as string) || undefined,
                  stock: parseInt(data.get('stock') as string),
                  category: data.get('category') as string,
                  description: data.get('description') as string,
                  longDescription: data.get('longDescription') as string,
                  image: data.get('image') as string,
                  isActive: true,
                  slug: (data.get('name') as string).toLowerCase().replace(/ /g, '-'),
                  displayOrder: 0,
                  rating: editingItem?.rating || 5,
                  reviewsCount: editingItem?.reviewsCount || 0,
                  features: editingItem?.features || ['Premium', 'Pro'],
                  specs: editingItem?.specs || { 'Material': 'Aço' }
                };
                db.saveProduct(prod);
                setIsModalOpen(false);
                refresh();
              }} className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Título do Produto</label>
                    <input required name="name" defaultValue={editingItem?.name} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Preço (R$)</label>
                    <input required name="price" type="number" step="0.01" defaultValue={editingItem?.price} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Preço De (R$)</label>
                    <input name="oldPrice" type="number" step="0.01" defaultValue={editingItem?.oldPrice} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Estoque</label>
                    <input required name="stock" type="number" defaultValue={editingItem?.stock} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Categoria</label>
                    <select name="category" defaultValue={editingItem?.category || 'Sport'} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none">
                       {db.getCategories().map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">URL da Imagem</label>
                    <input required name="image" defaultValue={editingItem?.image} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none" />
                 </div>
                 <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Copy Curta (Lojas)</label>
                    <textarea name="description" defaultValue={editingItem?.description} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none h-20 resize-none" />
                 </div>
                 <div className="col-span-2 flex space-x-4 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-5 bg-white/5 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10">Cancelar</button>
                    <button type="submit" className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20">Salvar Alterações</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* CSS CUSTOM SCROLLBAR */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
