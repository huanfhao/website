import express from 'express';
import Product from '../models/Product.js';
import { auth, adminAuth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// 获取所有商品（公开）
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all active products');
    const products = await Product.find({ active: true });
    
    if (!products || !products.length) {
      console.log('No products found');
      return res.json([]);
    }
    
    console.log('Found products:', products);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});

// 管理员获取所有商品
router.get('/admin/products', auth, adminAuth, async (req, res) => {
  try {
    console.log('Admin fetching all products');
    const products = await Product.find({});
    console.log('Found products for admin:', products);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products for admin:', error);
    res.status(500).json({ message: error.message });
  }
});

// 获取单个商品（公开）
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!product.active) {
      return res.status(404).json({ message: 'Product not available' });
    }

    // 确保返回的数据格式正确
    const productData = {
      ...product.toObject(),
      id: product._id.toString(), // 添加 id 字段
      _id: product._id.toString()
    };

    res.json(productData);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 创建商品（需要管理员权限）
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    console.log('Creating product:', req.body);
    const product = new Product(req.body);
    await product.save();
    console.log('Product created:', product);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
});

// 更新商品（需要管理员权限）
router.patch('/:id', auth, adminAuth, async (req, res) => {
  try {
    console.log('Updating product:', req.params.id, req.body);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product updated:', product);
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: error.message });
  }
});

// 删除商品（需要管理员权限）
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    console.log('Deleting product:', req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.findByIdAndDelete(req.params.id);
    console.log('Product deleted successfully');
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;