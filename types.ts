
/**
 * CRONOS ELITE - TYPES & INTERFACES
 * © João Layon – Todos os direitos reservados
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  longDescription: string;
  features: string[];
  specs: { [key: string]: string };
  image: string; // Imagem principal para cards
  gallery: string[]; // Mínimo 5 imagens reais
  category: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  isActive: boolean;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  displayOrder: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'user' | 'admin' | 'editor';
  createdAt: string;
  totalSpent?: number;
  lastPurchase?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  paymentMethod: string;
  trackingCode?: string;
  notes?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  isVisible: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase?: number;
  isActive: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface DashboardStats {
  totalRevenue: number;
  todayRevenue: number;
  totalOrders: number;
  conversionRate: number;
  activeUsers: number;
  inventoryAlerts: number;
  totalProducts: number;
}

export interface StoreSettings {
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  maintenanceMode: boolean;
  primaryColor: string;
  shippingFlatRate: number;
  scarcityEnabled: boolean;
}
