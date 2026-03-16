export type UserRole = 'buyer' | 'artisan' | 'admin';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type OrderStatus = 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type FulfillmentStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  created_at: string;
}

export interface ArtisanProfile {
  id: string;
  user_id: string;
  craft_type: string;
  village: string;
  district: string;
  state: string;
  bio: string;
  approval_status: ApprovalStatus;
  approved_at?: string;
  approved_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Product {
  id: string;
  artisan_id: string;
  artisan_name: string;
  category_id: string;
  category_name: string;
  name: string;
  description: string;
  story?: string;
  material?: string;
  time_to_make?: string;
  price: number;
  stock: number;
  images: string[];
  approval_status: ApprovalStatus;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  buyer_id: string;
  buyer_name: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  payment_method: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  artisan_id: string;
  quantity: number;
  price: number;
  fulfillment_status: FulfillmentStatus;
}

export interface AnalyticsEvent {
  id: string;
  session_id: string;
  user_id?: string;
  event_name: string;
  event_time: string;
  metadata: Record<string, unknown>;
}

export interface KPIData {
  active_artisans_7d: number;
  active_artisans_30d: number;
  approved_products: number;
  total_orders: number;
  gmv: number;
  aov: number;
  pending_approvals: number;
  conversion_funnel: {
    view_product: number;
    add_to_cart: number;
    checkout_start: number;
    order_placed: number;
  };
}
