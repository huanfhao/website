import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types/product';

interface CarouselImage {
  url: string;
  title: string;
  description: string;
}

interface CarouselProps {
  images?: CarouselImage[];
  products?: Product[];
  autoPlay?: boolean;
  interval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  images = [],
  products = [],
  autoPlay = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<CarouselImage[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // 初始化轮播项
  useEffect(() => {
    if (products.length > 0) {
      const productImages = products.map(product => ({
        url: product.image,
        title: product.name,
        description: product.description
      }));
      setItems(productImages);
    } else {
      setItems(images);
    }
  }, [images, products]);

  // 自动轮播
  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, items.length, autoPlay, isPaused, interval]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // 处理图片URL
  const getImageUrl = (url: string) => {
    try {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=compress&cs=tinysrgb&w=1920&h=1080`;
    } catch {
      return url;
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image load error:', e);
    e.currentTarget.src = 'https://dummyimage.com/1920x1080/e0e0e0/ffffff.jpg&text=Image+Not+Found';
  };

  if (!items.length) return null;

  return (
    <div 
      className="relative h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative h-full">
            <img
              src={getImageUrl(items[currentIndex].url)}
              alt={items[currentIndex].title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20">
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-4"
                >
                  {items[currentIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl"
                >
                  {items[currentIndex].description}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 导航按钮 */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};