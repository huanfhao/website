import React from 'react';
import { motion } from 'framer-motion';
import { ImageGallery } from './ImageGallery';
import { AddToCartButton } from './AddToCartButton';
import { Product } from '../types/product';

interface ProductDetailLayoutProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({
  product,
  onAddToCart
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧图片画廊 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ImageGallery 
            images={[product.image]} 
            alt={product.name} 
          />
        </motion.div>

        {/* 右侧商品信息 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <motion.h1 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {product.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl font-bold text-blue-600"
          >
            ${product.price.toFixed(2)}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-600"
          >
            {product.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <span className="text-gray-600">
              Stock: {product.stock}
            </span>
            <span className="text-gray-600">
              Category: {product.category}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <AddToCartButton 
              onClick={onAddToCart}
              className="w-full md:w-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}; 