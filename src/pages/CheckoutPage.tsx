import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/cart';

export const CheckoutPage: React.FC = () => {
  const { state } = useCart();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 订单详情 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Details
          </h2>
          {state.items.map((item: CartItem) => (
            <div
              key={item.productId}
              className="flex items-center space-x-4 border-b border-gray-200 py-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                }}
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  数量: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ¥{(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>小计</span>
              <span>¥{state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>运费</span>
              <span>免费</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="font-semibold">总计</span>
              <span className="font-semibold">¥{state.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* 支付信息 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            支付信息
          </h2>
          {/* 这里添加支付表单 */}
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;