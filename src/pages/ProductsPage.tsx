import React from 'react';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Carousel } from '../components/Carousel';
import { PageTransition } from '../components/PageTransition';
import { ScrollAnimation } from '../components/ScrollAnimation';
import { LoadingSpinner } from '../components/LoadingSpinner';
import axios from '../utils/axios';
import { Product } from '../types/product';
import { toast } from 'react-toastify';
import { LoadingState } from '../components/LoadingState';
import { ParallaxSection } from '../components/ParallaxSection';
import { Card3D } from '../components/Card3D';
import { ProductGrid } from '../components/ProductGrid';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // 从数据库获取商品数据
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 获取所有唯一的产品分类
  const categories = React.useMemo(() => {
    const cats = products.map(product => product.category);
    return ['all', ...new Set(cats)];
  }, [products]);

  // 根据搜索词和分类过滤产品
  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // 获取最新商品用于轮播图
  const latestProducts = React.useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .slice(0, 5); // 只取最新的5个商品
  }, [products]);

  return (
    <PageTransition>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 轮播图 */}
        <ParallaxSection offset={100}>
          {!loading && latestProducts.length > 0 ? (
            <Carousel products={latestProducts} />
          ) : (
            <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded-xl">
              <p className="text-gray-500">
                {loading ? 'Loading products...' : 'No products available'}
              </p>
            </div>
          )}
        </ParallaxSection>

        {/* 页面标题 */}
        <ScrollAnimation animation="slideIn">
          <h1 className="text-3xl font-bold text-gray-900 my-8">Our Products</h1>
        </ScrollAnimation>

        {/* 搜索和筛选区域 */}
        <ScrollAnimation animation="fadeIn">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* 搜索框 */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* 分类选择器 */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </ScrollAnimation>

        {/* 产品网格 */}
        {loading ? (
          <LoadingState />
        ) : (
          <ProductGrid 
            products={filteredProducts} 
            columns={3}
            itemsPerPage={12}  // 每页显示12个商品
          />
        )}
      </main>
    </PageTransition>
  );
};

export default ProductsPage;
