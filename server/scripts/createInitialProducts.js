import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const initialProducts = [
  {
    name: 'Luxury Jewelry Box',
    description: '高档绒面珠宝首饰盒，多层收纳，带锁扣设计，适合存放戒指、项链等贵重首饰',
    price: 299.99,
    category: 'Jewelry Boxes',
    image: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    stock: 20,
    active: true
  },
  {
    name: 'Multi-tier Display Stand',
    description: '多层珠宝展示架，透明亚克力材质，适合商店展示各类首饰',
    price: 159.99,
    category: 'Display Stands',
    image: 'https://images.pexels.com/photos/5370647/pexels-photo-5370647.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    stock: 15,
    active: true
  },
  {
    name: 'Ring Display Tray',
    description: '专业戒指展示托盘，绒面内衬，可展示多枚戒指，适合珠宝店使用',
    price: 79.99,
    category: 'Display Trays',
    image: 'https://images.pexels.com/photos/5370712/pexels-photo-5370712.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    stock: 30,
    active: true
  },
  {
    name: 'Glass Display Cabinet',
    description: '高端玻璃展示柜，带LED照明，可调节层架，适合珠宝店展示高档首饰',
    price: 899.99,
    category: 'Display Cabinets',
    image: 'https://images.pexels.com/photos/5370691/pexels-photo-5370691.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    stock: 10,
    active: true
  },
  {
    name: 'Necklace Display Stand',
    description: '项链专用展示架，高档实木材质，可展示多条项链，店铺展示必备',
    price: 129.99,
    category: 'Display Stands',
    image: 'https://images.pexels.com/photos/5370703/pexels-photo-5370703.jpeg?auto=compress&cs=tinysrgb&w=800&h=800',
    stock: 25,
    active: true
  }
];

const createProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 清除现有产品
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // 创建新产品
    const products = await Product.create(initialProducts);
    console.log('Created products:', products);

    products.forEach(product => {
      console.log(`Created product: ${product.name} with ID: ${product._id}`);
    });

  } catch (error) {
    console.error('Error creating products:', error);
  } finally {
    await mongoose.connection.close();
  }
};

createProducts(); 