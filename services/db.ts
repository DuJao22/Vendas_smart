
import { Product, User, Order, DashboardStats, AuditLog, Review, Coupon, StoreSettings } from '../types.ts';
import { INITIAL_PRODUCTS } from '../data/mockDb.ts';

/**
 * D22 ELITE - DATABASE SERVICE PRO 5.0
 * © João Layon – Todos os direitos reservados
 */

const STORAGE_KEYS = {
  PRODUCTS: 'd22_products',
  USERS: 'd22_users',
  ORDERS: 'd22_orders',
  CATEGORIES: 'd22_categories',
  REVIEWS: 'd22_reviews',
  COUPONS: 'd22_coupons',
  SETTINGS: 'd22_settings',
  AUDIT_LOGS: 'd22_audit_logs',
  CURRENT_USER: 'd22_current_user',
  DB_VERSION: 'd22_db_version'
};

const DB_VERSION = "5.0"; // Versão massiva com 110% de lucro

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'D22 ELITE',
  contactEmail: 'vip@d22elite.com',
  contactPhone: 'dujao22',
  maintenanceMode: false,
  primaryColor: '#00A3FF',
  shippingFlatRate: 45.00,
  scarcityEnabled: true
};

const safeParse = (key: string, defaultValue: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const safeSet = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};

export const db = {
  // Fix: Added missing initialization for logs and ensure storage state
  init: () => {
    try {
      const currentVersion = localStorage.getItem(STORAGE_KEYS.DB_VERSION);
      
      if (currentVersion !== DB_VERSION) {
        // Reset total para nova precificação e produtos
        localStorage.clear();
        safeSet(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
        localStorage.setItem(STORAGE_KEYS.DB_VERSION, DB_VERSION);
      }

      if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        safeSet(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      }
      if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) safeSet(STORAGE_KEYS.ORDERS, []);
      if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) safeSet(STORAGE_KEYS.AUDIT_LOGS, []);
    } catch (e) {
      console.error("Erro no init do DB:", e);
    }
  },

  getProducts: (): Product[] => {
    return safeParse(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  // Fix: Added missing saveProduct method for admin panel
  saveProduct: (product: Product) => {
    const products = db.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index > -1) {
      products[index] = product;
    } else {
      products.push(product);
    }
    safeSet(STORAGE_KEYS.PRODUCTS, products);
    db.addLog('Gerenciamento', `Produto ${product.name} salvo/atualizado`);
  },

  // Fix: Added missing deleteProduct method for admin panel
  deleteProduct: (id: string) => {
    const products = db.getProducts();
    const product = products.find(p => p.id === id);
    const filtered = products.filter(p => p.id !== id);
    safeSet(STORAGE_KEYS.PRODUCTS, filtered);
    if (product) db.addLog('Gerenciamento', `Produto ${product.name} removido`);
  },

  getCurrentUser: (): User | null => safeParse(STORAGE_KEYS.CURRENT_USER, null),
  
  login: (u: string, p: string) => {
    if (u === 'dujao22' && p === '30031936') {
      const admin = { id: 'admin-1', name: 'João Layon', phone: 'dujao22', role: 'admin' as const, createdAt: new Date().toISOString() };
      safeSet(STORAGE_KEYS.CURRENT_USER, admin);
      db.addLog('Segurança', 'Admin logado no sistema');
      return admin;
    }
    return null;
  },

  // Fix: Added missing quickLogin method for checkout process
  quickLogin: (name: string, phone: string) => {
    const user: User = { 
      id: `u-${Math.random().toString(36).substr(2, 9)}`, 
      name, 
      phone, 
      role: 'user', 
      createdAt: new Date().toISOString() 
    };
    safeSet(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  },

  logout: () => { 
    const user = db.getCurrentUser();
    if (user && user.role === 'admin') db.addLog('Segurança', 'Admin saiu do sistema');
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER); 
  },
  
  getOrders: (): Order[] => safeParse(STORAGE_KEYS.ORDERS, []),

  // Fix: Added missing updateOrderStatus method for order management
  updateOrderStatus: (id: string, status: Order['status']) => {
    const orders = db.getOrders();
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    safeSet(STORAGE_KEYS.ORDERS, updated);
    db.addLog('Vendas', `Status do pedido ${id} alterado para ${status}`);
  },

  getStats: (): DashboardStats => {
    const orders = db.getOrders();
    const products = db.getProducts();
    return {
      totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((acc, o) => acc + o.total, 0),
      todayRevenue: 0,
      totalOrders: orders.length,
      conversionRate: 5.4,
      activeUsers: 142,
      inventoryAlerts: products.filter(p => p.stock < 5).length,
      totalProducts: products.length
    };
  },

  getCategories: (): string[] => ['Smartwatches', 'Fones de Ouvido', 'Pulseiras', 'Acessórios'],
  getSettings: (): StoreSettings => safeParse(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
  
  // Fix: Added missing saveSettings method for store configuration
  saveSettings: (settings: StoreSettings) => {
    safeSet(STORAGE_KEYS.SETTINGS, settings);
    db.addLog('Configurações', 'Ajustes da loja atualizados');
  },

  createOrder: (order: any) => {
    const orders = db.getOrders();
    const newOrder = { ...order, id: `D22-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, createdAt: new Date().toISOString() };
    orders.push(newOrder);
    safeSet(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  },

  // Fix: Added missing getLogs method for audit trail viewing
  getLogs: (): AuditLog[] => safeParse(STORAGE_KEYS.AUDIT_LOGS, []),

  // Fix: Added addLog helper method to track system actions
  addLog: (action: string, target: string) => {
    const logs = db.getLogs();
    const user = db.getCurrentUser();
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || 'guest',
      userName: user?.name || 'Visitante',
      action,
      target,
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog); // Newer logs first
    safeSet(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 100)); // Keep only last 100 logs
  }
};
