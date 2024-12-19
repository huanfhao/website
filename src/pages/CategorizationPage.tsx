import React, { useState, useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import { ScrollAnimation } from '../components/ScrollAnimation';
import { ProductCard } from '../components/ProductCard';
import { Card3D } from '../components/Card3D';
import { LoadingState } from '../components/LoadingState';
import axios from '../utils/axios';
import { Product } from '../types/product';
import { toast } from 'react-toastify';
import { ProductGrid } from '../components/ProductGrid';

export const CategorizationPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
    console.log('计算分类，当前产品:', products);
    const cats = products.map(product => product.category);
    const uniqueCategories = ['all', ...new Set(cats)];
    console.log('计算出的分类:', uniqueCategories);
    return uniqueCategories;
  }, [products]);

  // 根据分类过滤产品
  const filteredProducts = React.useMemo(() => {
    console.log('过滤产品，选中的分类:', selectedCategory);
    const filtered = selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory);
    console.log('过滤后的产品:', filtered);
    return filtered;
  }, [products, selectedCategory]);

  // 按分类对产品进行分组
  const groupedProducts = React.useMemo(() => {
    console.log('对产品进行分组...');
    const groups: { [key: string]: Product[] } = {};
    categories.forEach(category => {
      if (category !== 'all') {
        groups[category] = products.filter(product => product.category === category);
      }
    });
    console.log('分组结果:', groups);
    return groups;
  }, [products, categories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingState />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <ScrollAnimation animation="slideIn">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Categories</h1>
        </ScrollAnimation>

        {/* 分类选择器 */}
        <ScrollAnimation animation="fadeIn">
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  console.log('切换分类到:', category);
                  setSelectedCategory(category);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* 产品展示区域 */}
        {selectedCategory === 'all' ? (
          // 显示所有分类
          Object.entries(groupedProducts).map(([category, categoryProducts]) => (
            <ScrollAnimation key={category} animation="slideIn">
              <div className="space-y-6 mb-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <ProductGrid 
                  products={categoryProducts} 
                  columns={3}
                  withAnimation={false}
                  itemsPerPage={8}  // 每个分类初始显示8个商品
                />
              </div>
            </ScrollAnimation>
          ))
        ) : (
          // 显示选定分类的产品
          <ProductGrid 
            products={filteredProducts} 
            columns={3}
            itemsPerPage={12}  // 每页显示12个商品
          />
        )}
      </div>
    </PageTransition>
  );
};

export default CategorizationPage; 