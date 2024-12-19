import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productId = product._id;

  const getImageUrl = (url: string) => {
    try {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&w=800&h=800&q=80`;
    } catch {
      return url;
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image load error:', e);
    e.currentTarget.src = `https://dummyimage.com/800x800/e0e0e0/ffffff.jpg&text=No+Image`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
    >
      <Link 
        to={`/product/${productId}`} 
        className="flex flex-col h-full"
      >
        <div className="aspect-square w-full relative">
          <LazyLoadImage
            src={getImageUrl(product.image)}
            alt={product.name}
            effect="blur"
            className="absolute inset-0 w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm flex-grow line-clamp-3">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-blue-600 font-bold">
              ¥{product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};