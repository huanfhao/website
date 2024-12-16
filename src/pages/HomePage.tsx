import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Carousel } from '../components/Carousel';
import { products } from '../data/products';

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
    title: 'Shop the Latest Tech',
    description: 'Discover cutting-edge gadgets and accessories'
  },
  {
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80',
    title: 'Premium Watches',
    description: 'Elegant timepieces for every occasion'
  },
  {
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80',
    title: 'Audio Excellence',
    description: 'Experience superior sound quality'
  }
];

export const HomePage: React.FC = () => {
  return (
    <main>
      <Carousel images={carouselImages} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};