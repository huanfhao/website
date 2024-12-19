import { Product as ProductType } from './product';

export interface CartItem {
  product: ProductType;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

// 重新导出 Product 类型
export type { ProductType as Product };