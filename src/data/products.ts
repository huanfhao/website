import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation. Experience crystal-clear sound and ultimate comfort with these premium headphones. Features include: Active Noise Cancellation, 30-hour battery life, and premium audio drivers.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking. Monitor your health 24/7 with advanced sensors. Includes heart rate monitoring, sleep tracking, and workout detection. Water-resistant up to 50m.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Premium Backpack',
    description: 'Durable and stylish backpack for everyday use. Made from water-resistant materials with multiple compartments for organization. Perfect for work, travel, or school.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories'
  }
];