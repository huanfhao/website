import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AdminLayout } from './pages/admin/AdminLayout';
import { DashboardPage } from './pages/admin/DashboardPage';
import { RequireAuth } from './components/RequireAuth';
import { AboutPage } from './pages/AboutPage';
import { ProductsManagePage } from './pages/admin/ProductsManagePage';
import { UsersManagePage } from './pages/admin/UsersManagePage';
import { OrdersManagePage } from './pages/admin/OrdersManagePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './components/Layout';
import { LoadingSpinner } from './components/LoadingSpinner';
import { preloadImages } from './utils/preloadImages';

// 预加载常用图片
const commonImages = [
  'https://images.unsplash.com/photo-1584488840882-5f11b57f9cc9',
  'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f',
  'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f'
];

preloadImages(commonImages);

// 懒加载页面组件
const LazyHomePage = lazy(() => import('./pages/HomePage').then(module => ({
  default: module.HomePage || module.default
})));
const LazyProductsPage = lazy(() => import('./pages/ProductsPage').then(module => ({
  default: module.ProductsPage || module.default
})));
const LazyProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage').then(module => ({
  default: module.ProductDetailsPage || module.default
})));
const LazyCategorizationPage = lazy(() => import('./pages/CategorizationPage').then(module => ({
  default: module.CategorizationPage || module.default
})));
const LazyCartPage = lazy(() => import('./pages/CartPage').then(module => ({
  default: module.CartPage || module.default
})));
const LazyCheckoutPage = lazy(() => import('./pages/CheckoutPage').then(module => ({
  default: module.CheckoutPage || module.default
})));
const LazyLoginPage = lazy(() => import('./pages/LoginPage').then(module => ({
  default: module.LoginPage || module.default
})));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Admin Routes */}
                <Route
                  path="/admin/*"
                  element={
                    <RequireAuth>
                      <AdminLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route path="products" element={<ProductsManagePage />} />
                  <Route path="users" element={<UsersManagePage />} />
                  <Route path="orders" element={<OrdersManagePage />} />
                  <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
                </Route>

                {/* Auth Routes */}
                <Route path="/login" element={<LazyLoginPage />} />

                {/* Client Routes */}
                <Route path="/" element={<LazyHomePage />} />
                <Route path="/categorization" element={<LazyCategorizationPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/product/:productId" element={<LazyProductDetailsPage />} />
                <Route path="/cart" element={<LazyCartPage />} />
                <Route path="/checkout" element={<LazyCheckoutPage />} />
              </Routes>
            </Suspense>
          </Layout>
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;