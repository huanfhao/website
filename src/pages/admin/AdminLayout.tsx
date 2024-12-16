import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut 
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  
  const isActiveLink = (path: string) => {
    return location.pathname === `/admin${path}` ? 'bg-blue-700' : '';
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">SY Jewelry Admin</h1>
        </div>
        <nav className="mt-8">
          <Link
            to="/admin"
            className={`flex items-center px-6 py-3 text-sm hover:bg-blue-700 ${isActiveLink('')}`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`flex items-center px-6 py-3 text-sm hover:bg-blue-700 ${isActiveLink('/products')}`}
          >
            <Package className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center px-6 py-3 text-sm hover:bg-blue-700 ${isActiveLink('/orders')}`}
          >
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          <Link
            to="/admin/customers"
            className={`flex items-center px-6 py-3 text-sm hover:bg-blue-700 ${isActiveLink('/customers')}`}
          >
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Link>
          <Link
            to="/admin/settings"
            className={`flex items-center px-6 py-3 text-sm hover:bg-blue-700 ${isActiveLink('/settings')}`}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button className="flex items-center px-6 py-3 text-sm hover:bg-blue-700 w-full">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};