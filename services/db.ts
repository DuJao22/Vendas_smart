
import { Product, User, Order, DashboardStats, AuditLog, Review, Coupon, StoreSettings } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockDb';

/**
 * CRONOS ELITE - DATABASE SERVICE PRO
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

export const db = {
  init: () => {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
        const prods = INITIAL_PRODUCTS.map(p => ({ ...p, isActive: true, displayOrder: 0, slug: p.name.toLowerCase().replace(/ /g, '-') }));
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));
      }
      if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
      if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(['Sport', 'Business', 'Classic', 'Ultra']));
      if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify([]));
      if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([
          { id: 'admin-1', name: 'João Admin', phone: 'dujao22', role: 'admin', createdAt: new Date().toISOString() }
        ]));
      }
    } catch (e) {
      console.error("Erro ao inicializar LocalStorage", e);
    }
  },

  log: (action: string, target: string) => {
    const user = db.getCurrentUser();
    const logs: AuditLog[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS) || '[]');
    logs.unshift({
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || 'system',
      userName: user?.name || 'Sistema',
      action,
      target,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 100)));
  },

  getProducts: (): Product[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]'),
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
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },
  deleteProduct: (id: string) => {
    const products = db.getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products.filter(p => p.id !== id)));
      db.log('Exclusão', product.name);
    }
  },

  getOrders: (): Order[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]'),
  updateOrderStatus: (orderId: string, status: Order['status']) => {
    const orders = db.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      db.log('Status Pedido', orderId);
    }
  },

  getSettings: (): StoreSettings => {
    const s = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return s ? JSON.parse(s) : DEFAULT_SETTINGS;
  },
  saveSettings: (settings: StoreSettings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    db.log('Ajustes', 'Sistema');
  },

  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
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

  getCurrentUser: (): User | null => {
    const u = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return u ? JSON.parse(u) : null;
  },
  login: (u: string, p: string) => {
    if (u === 'dujao22' && p === '30031936') {
      const admin = { id: 'admin-1', name: 'João Layon', phone: 'dujao22', role: 'admin' as const, createdAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(admin));
      return admin;
    }
    return null;
  },
  logout: () => localStorage.removeItem(STORAGE_KEYS.CURRENT_USER),
  getCategories: (): string[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]'),
  getLogs: (): AuditLog[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS) || '[]'),
  createOrder: (order: any) => {
    const orders = db.getOrders();
    const newOrder = { ...order, id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, createdAt: new Date().toISOString() };
    orders.push(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  }
};
