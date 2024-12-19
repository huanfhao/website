import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import { auth, adminAuth } from './middleware/auth.js';

dotenv.config();

// 检查环境变量
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const app = express();

// 数据库连接配置
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully!');
    console.log(`MongoDB Host: ${conn.connection.host}`);
    console.log(`MongoDB Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// 监听数据库连接事件
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// 连接数据库
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// 添加调试日志
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  next();
});

// 公开路由
app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

// 受保护的管理路由
app.use('/admin/products', auth, adminAuth, productRoutes);
app.use('/admin/orders', auth, adminAuth, orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  
  // MongoDB 错误处理
  if (err instanceof mongoose.Error) {
    return res.status(400).json({
      message: 'Database operation failed',
      details: err.message,
      type: err.name
    });
  }

  // 其他错误
  res.status(500).json({ 
    message: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 使用不同的端口
const PORT = process.env.PORT || 5001;

// 检查端口是否被占用
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', err);
  }
});

// 优雅关闭
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });