
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
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      const prods = INITIAL_PRODUCTS.map(p => ({ ...p, isActive: true, displayOrder: 0, slug: p.name.toLowerCase().replace(/ /g, '-') }));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(['Sport', 'Business', 'Classic', 'Ultra']));
    if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify([{ id: '1', code: 'CRONOS10', discount: 10, type: 'percentage', isActive: true }]));
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify([]));
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([
        { id: 'admin-1', name: 'João Admin', phone: 'dujao22', role: 'admin', createdAt: new Date().toISOString() }
      ]));
    }
  },

  // --- LOGGING ---
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

  // --- PRODUCTS ---
  getProducts: (): Product[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]'),
  saveProduct: (product: Product) => {
    const products = db.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products[index] = product;
      db.log('Atualizou Produto', product.name);
    } else {
      products.push(product);
      db.log('Criou Produto', product.name);
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },
  deleteProduct: (id: string) => {
    const products = db.getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
      const filtered = products.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
      db.log('Excluiu Produto', product.name);
    }
  },

  // --- CATEGORIES ---
  getCategories: (): string[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]'),
  addCategory: (cat: string) => {
    const cats = db.getCategories();
    if (!cats.includes(cat)) {
      cats.push(cat);
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(cats));
      db.log('Adicionou Categoria', cat);
    }
  },

  // --- ORDERS ---
  getOrders: (): Order[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]'),
  updateOrderStatus: (orderId: string, status: Order['status'], notes?: string) => {
    const orders = db.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      if (notes) orders[index].notes = notes;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      db.log('Alterou Status Pedido', orderId);
    }
  },
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => {
    const orders = db.getOrders();
    const newOrder: Order = {
      ...order,
      id: `ORD-${Math.random().toString(36).toUpperCase().substr(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  },

  // --- SETTINGS ---
  getSettings: (): StoreSettings => JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify(DEFAULT_SETTINGS)),
  saveSettings: (settings: StoreSettings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    db.log('Alterou Configurações da Loja', 'Geral');
  },

  // --- STATS ---
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

  // --- AUTH & USERS ---
  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
  login: (username: string, password?: string): User | null => {
    const users = db.getUsers();
    if (username === 'dujao22' && password === '30031936') {
      let admin = users.find(u => u.phone === 'dujao22' && u.role === 'admin');
      if (!admin) {
        admin = { id: 'admin-main', name: 'João Layon', phone: 'dujao22', role: 'admin', createdAt: new Date().toISOString() };
        users.push(admin);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      }
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(admin));
      db.log('Login Admin', 'Sucesso');
      return admin;
    }
    return null; // Apenas admin por enquanto no db.login para esta demo
  },
  getCurrentUser: (): User | null => JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null'),
  logout: () => {
    db.log('Logout Admin', 'Sessão Encerrada');
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  getLogs: (): AuditLog[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS) || '[]')
};
