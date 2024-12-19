import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  loading = false,
  disabled = false,
  className = ''
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        (loading || disabled) ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      {loading ? '添加中...' : '加入购物车'}
    </motion.button>
  );
}; 