import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { Product } from '../types/product';
import { PageTransition } from '../components/PageTransition';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AddToCartButton } from '../components/AddToCartButton';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/products/${productId}`);
        
        if (!response.data) {
          toast.error('Product not found');
          navigate('/');
          return;
        }

        setProduct(response.data);
      } catch (error: any) {
        console.error('Error fetching product:', error);
        toast.error(error.response?.data?.message || 'Failed to load product details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      setAddingToCart(true);
      dispatch({ type: 'ADD_ITEM', payload: product });
      toast.success('成功添加到购物车！');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('添加到购物车失败，请重试');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回按钮 */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 商品图片 */}
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-center object-cover"
              onError={(e) => {
                console.error('Image load error:', e);
                e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
              }}
            />
          </div>

          {/* 商品信息 */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-xl font-bold text-blue-600">
              ¥{product.price.toFixed(2)}
            </p>
            <p className="text-gray-500">{product.description}</p>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">分类: {product.category}</span>
              <span className="text-gray-600">库存: {product.stock}</span>
            </div>

            <AddToCartButton 
              onClick={handleAddToCart} 
              loading={addingToCart}
              disabled={product.stock <= 0}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetailsPage;