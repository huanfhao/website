import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';
import { ScrollAnimation } from './ScrollAnimation';
import { Card3D } from './Card3D';
import { useInView } from 'react-intersection-observer';
import { VirtuosoGrid } from 'react-virtuoso';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
  withAnimation?: boolean;
  with3D?: boolean;
  itemsPerPage?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  columns = 3,
  withAnimation = true,
  with3D = true,
  itemsPerPage = 12
}) => {
  const [visibleItems, setVisibleItems] = React.useState(itemsPerPage);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  React.useEffect(() => {
    if (inView && visibleItems < products.length) {
      // 当进入视图时，增加显示的商品数量
      setTimeout(() => {
        setVisibleItems(prev => Math.min(prev + itemsPerPage, products.length));
      }, 500);
    }
  }, [inView, products.length, itemsPerPage, visibleItems]);

  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2 gap-8';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';
    }
  };

  const renderProduct = (product: Product) => {
    const card = <ProductCard key={product._id} product={product} />;

    if (with3D) {
      return <Card3D key={product._id}>{card}</Card3D>;
    }

    return card;
  };

  const visibleProducts = products.slice(0, visibleItems);

  const content = (
    <>
      <div className={`grid ${getGridCols()} gap-8 max-w-7xl mx-auto`}>
        {visibleProducts.map((product) => renderProduct(product))}
      </div>
      {/* 加载更多触发器 */}
      {visibleItems < products.length && (
        <div
          ref={ref}
          className="w-full h-20 flex items-center justify-center mt-6"
        >
          <motion.div
            animate={{ opacity: inView ? 1 : 0.3 }}
            className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          />
        </div>
      )}
    </>
  );

  if (withAnimation) {
    return <ScrollAnimation animation="scaleUp">{content}</ScrollAnimation>;
  }

  return content;
}; 