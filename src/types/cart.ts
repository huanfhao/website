import { Product } from './product';

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
} 