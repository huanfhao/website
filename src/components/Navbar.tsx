import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const { state } = useCart();

  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '全部商品', path: '/products' },
    { name: '商品分类', path: '/categorization' },
    { name: '关于我们', path: '/about' }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              珠宝展示用品
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === link.path
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    管理后台
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  个人中心
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 移动端导航菜单 */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname === link.path
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};