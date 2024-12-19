import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/cart';

export const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        productId: item.productId,
        quantity: newQuantity
      }
    });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: productId
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">购物车</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">购物车是空的</p>
              <Link
                to="/products"
                className="mt-4 inline-block text-blue-600 hover:text-blue-500"
              >
                继续购物
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item: CartItem) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-lg shadow-md p-6 flex items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                    }}
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-500">{item.product.description}</p>
                    <div className="mt-2 flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        -
                      </button>
                      <span className="mx-4">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-gray-900">
                      ¥{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="mt-2 text-red-600 hover:text-red-500"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              订单摘要
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>小计</span>
                <span>¥{state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>运费</span>
                <span>免费</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold">总计</span>
                <span className="font-semibold">¥{state.total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="w-full block text-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              结算
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;