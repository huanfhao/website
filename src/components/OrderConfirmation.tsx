import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Package } from 'lucide-react';

interface OrderConfirmationProps {
  orderId: string;
  show: boolean;
  onClose: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderId,
  show,
  onClose
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center"
              initial={{ rotate: 180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              <Check className="w-8 h-8 text-green-600" />
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Order Confirmed!
              </h3>
              <p className="text-gray-600">
                Your order #{orderId} has been successfully placed.
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2 text-blue-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Package className="w-5 h-5" />
              <span>Track your order</span>
            </motion.div>

            <motion.button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 