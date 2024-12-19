import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { Carousel } from '../components/Carousel';
import { PageTransition } from '../components/PageTransition';
import { ScrollAnimation } from '../components/ScrollAnimation';
import { LoadingSpinner } from '../components/LoadingSpinner';
import axios from '../utils/axios';
import { Product } from '../types/product';
import { toast } from 'react-toastify';
import { ProductGrid } from '../components/ProductGrid';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  // 获取最新商品用于轮播图
  const latestProducts = React.useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .slice(0, 5); // 只取最新的5个商品
  }, [products]);

  // 轮播图配置
  const carouselImages = [
    {
      url: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
      title: '高档珠宝展示系列',
      description: '专业珠宝展示解决方案'
    },
    {
      url: 'https://images.pexels.com/photos/5370647/pexels-photo-5370647.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
      title: '展示柜系列',
      description: '为您的珠宝店打造完美展示空间'
    },
    {
      url: 'https://images.pexels.com/photos/5370712/pexels-photo-5370712.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
      title: '多功能展示架',
      description: '灵活多变的展示方案'
    }
  ];

  // 定义分类数据
  const categories = [
    {
      name: '珠宝首饰盒',
      key: 'Jewelry Boxes',
      description: '精美绒面首饰盒，多层收纳设计',
      image: 'https://images.unsplash.com/photo-1584488840882-5f11b57f9cc9?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: '展示架',
      key: 'Display Stands',
      description: '多功能珠宝展示架，适合各类首饰',
      image: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: '展示托盘',
      key: 'Display Trays',
      description: '专业珠宝展示托盘，绒面内衬',
      image: 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <PageTransition>
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px]">
          <Carousel images={carouselImages} />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                专业���宝展示解决方案
              </h1>
              <p className="text-xl mb-8">为您的珠宝店打造完美展示空间</p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                浏览产品
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation animation="slideIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                热门展示用品
              </h2>
            </ScrollAnimation>

            {loading ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <ProductGrid 
                products={latestProducts} 
                columns={3}
                withAnimation={false}
              />
            )}

            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                查看全部产品
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation animation="slideIn">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  产品分类
                </h2>
                <p className="text-lg text-gray-600">
                  专业的珠宝展示解决方案，满足您的所有展示需求
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map(({ name, key, description, image }) => (
                <ScrollAnimation key={key} animation="fadeIn">
                  <Link
                    to={`/categorization?category=${key.toLowerCase()}`}
                    className="group block h-[400px]"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="relative h-full rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="absolute inset-0">
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 group-hover:to-black/30 transition-colors" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-300 transition-colors">
                          {name}
                        </h3>
                        <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
                          {description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/categorization"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                查看全部分类
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* 新增特色服务部分 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation animation="slideIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                我们的优势
              </h2>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-2">专业品质</h3>
                <p className="text-gray-600">精选优质材料，专业工艺制作，确保展示效果</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">定制服务</h3>
                <p className="text-gray-600">根据店铺需求，提供个性化展示解决方案</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-semibold mb-2">完美展示</h3>
                <p className="text-gray-600">突出珠宝魅力，提升商品价值感</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default HomePage;