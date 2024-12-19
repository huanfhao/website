import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemListProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const CartItemList: React.FC<CartItemListProps> = ({
  items,
  onRemove,
  onUpdateQuantity
}) => {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 flex items-center gap-4">
              <motion.img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-100 rounded-md"
                  disabled={item.quantity <= 1}
                >
                  -
                </motion.button>
                <span className="w-8 text-center">{item.quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-100 rounded-md"
                >
                  +
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemove(item.id)}
                  className="ml-4 text-gray-500"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}; 