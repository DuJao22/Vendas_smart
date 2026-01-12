
import { Product, User, Order, DashboardStats, AuditLog, Review, Coupon, StoreSettings } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockDb';

/**
 * CRONOS ELITE - DATABASE SERVICE PRO (ANTI-ERROR)
 * Sistema desenvolvido por João Layon
 * © João Layon – Todos os direitos reservados
 */

const STORAGE_KEYS = {
  PRODUCTS: 'cronos_products',
  USERS: 'cronos_users',
  ORDERS: 'cronos_orders',
  CATEGORIES: 'cronos_categories',
  REVIEWS: 'cronos_reviews',
  COUPONS: 'cronos_coupons',
  SETTINGS: 'cronos_settings',
  AUDIT_LOGS: 'cronos_audit_logs',
  CURRENT_USER: 'cronos_current_user'
};

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Cronos Elite',
  contactEmail: 'contato@cronoselite.com',
  contactPhone: 'dujao22',
  maintenanceMode: false,
  primaryColor: '#2563eb',
  shippingFlatRate: 45.00,
  scarcityEnabled: true
};

const safeParse = (key: string, defaultValue: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Erro ao ler chave ${key} do localStorage:`, e);
    return defaultValue;
  }
};

const safeSet = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Erro ao salvar chave ${key} no localStorage:`, e);
  }
};

export const db = {
  init: () => {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
        const prods = INITIAL_PRODUCTS.map(p => ({ 
          ...p, 
          isActive: true, 
          displayOrder: 0, 
          slug: p.name.toLowerCase().replace(/ /g, '-') 
        }));
        safeSet(STORAGE_KEYS.PRODUCTS, prods);
      }
      if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        safeSet(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      }
      if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) safeSet(STORAGE_KEYS.ORDERS, []);
      if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) safeSet(STORAGE_KEYS.CATEGORIES, ['Sport', 'Business', 'Classic', 'Ultra']);
      if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) safeSet(STORAGE_KEYS.AUDIT_LOGS, []);
      if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        safeSet(STORAGE_KEYS.USERS, [
          { id: 'admin-1', name: 'João Admin', phone: 'dujao22', role: 'admin', createdAt: new Date().toISOString() }
        ]);
      }
    } catch (e) {
      console.error("Falha crítica na inicialização do DB:", e);
    }
  },

  log: (action: string, target: string) => {
    const user = db.getCurrentUser();
    const logs = safeParse(STORAGE_KEYS.AUDIT_LOGS, []);
    logs.unshift({
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || 'system',
      userName: user?.name || 'Sistema',
      action,
      target,
      timestamp: new Date().toISOString()
    });
    safeSet(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 100));
  },

  getProducts: (): Product[] => safeParse(STORAGE_KEYS.PRODUCTS, []),
  saveProduct: (product: Product) => {
    const products = db.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products[index] = product;
      db.log('Edição', product.name);
    } else {
      products.push(product);
      db.log('Criação', product.name);
    }
    safeSet(STORAGE_KEYS.PRODUCTS, products);
  },
  deleteProduct: (id: string) => {
    const products = db.getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
      safeSet(STORAGE_KEYS.PRODUCTS, products.filter(p => p.id !== id));
      db.log('Exclusão', product.name);
    }
  },

  getOrders: (): Order[] => safeParse(STORAGE_KEYS.ORDERS, []),
  updateOrderStatus: (orderId: string, status: Order['status']) => {
    const orders = db.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      safeSet(STORAGE_KEYS.ORDERS, orders);
      db.log('Status Pedido', orderId);
    }
  },

  getSettings: (): StoreSettings => safeParse(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
  saveSettings: (settings: StoreSettings) => {
    safeSet(STORAGE_KEYS.SETTINGS, settings);
    db.log('Ajustes', 'Sistema');
  },

  getUsers: (): User[] => safeParse(STORAGE_KEYS.USERS, []),
  getStats: (): DashboardStats => {
    const orders = db.getOrders();
    const products = db.getProducts();
    const users = db.getUsers();
    const today = new Date().toISOString().split('T')[0];
    return {
      totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((acc, o) => acc + o.total, 0),
      todayRevenue: orders.filter(o => o.createdAt.startsWith(today) && o.status !== 'cancelled').reduce((acc, o) => acc + o.total, 0),
      totalOrders: orders.length,
      conversionRate: users.length > 0 ? (orders.length / users.length) * 100 : 0,
      activeUsers: users.length,
      inventoryAlerts: products.filter(p => p.stock < 5).length,
      totalProducts: products.length
    };
  },

  getCurrentUser: (): User | null => safeParse(STORAGE_KEYS.CURRENT_USER, null),
  login: (u: string, p: string) => {
    if (u === 'dujao22' && p === '30031936') {
      const admin = { id: 'admin-1', name: 'João Layon', phone: 'dujao22', role: 'admin' as const, createdAt: new Date().toISOString() };
      safeSet(STORAGE_KEYS.CURRENT_USER, admin);
      return admin;
    }
    return null;
  },
  logout: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch (e) {}
  },
  getCategories: (): string[] => safeParse(STORAGE_KEYS.CATEGORIES, ['Sport', 'Business', 'Classic', 'Ultra']),
  getLogs: (): AuditLog[] => safeParse(STORAGE_KEYS.AUDIT_LOGS, []),
  createOrder: (order: any) => {
    const orders = db.getOrders();
    const newOrder = { ...order, id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, createdAt: new Date().toISOString() };
    orders.push(newOrder);
    safeSet(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  }
};
