import Product from '../models/Product.js';

export const productService = {
  // 获取所有商品
  async getAllProducts() {
    try {
      const products = await Product.find({ active: true });
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // 根据分类获取商品
  async getProductsByCategory(category) {
    try {
      const products = await Product.find({ category, active: true });
      return products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // 获取单个商品详情
  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // 创建新商品
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // 更新商品信息
  async updateProduct(id, updateData) {
    try {
      const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // 删除商品（软删除）
  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndUpdate(id, { active: false }, { new: true });
      return product;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}; 