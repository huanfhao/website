import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Package,
  Clock,
  ChevronUp,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';
import { ChartContainer } from '../../components/ChartContainer';
import { AreaChartWrapper } from '../../components/charts/AreaChartWrapper';
import { PieChartWrapper } from '../../components/charts/PieChartWrapper';

// 模拟数据
const stats = [
  {
    title: 'Total Revenue',
    value: '$23,456',
    change: '+12.5%',
    isIncrease: true,
    icon: DollarSign,
    color: 'from-green-500 to-emerald-700'
  },
  {
    title: 'Total Orders',
    value: '156',
    change: '+8.2%',
    isIncrease: true,
    icon: ShoppingBag,
    color: 'from-blue-500 to-indigo-700'
  },
  {
    title: 'Total Users',
    value: '2,345',
    change: '+15.3%',
    isIncrease: true,
    icon: Users,
    color: 'from-purple-500 to-pink-700'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-2.1%',
    isIncrease: false,
    icon: TrendingUp,
    color: 'from-orange-500 to-red-700'
  }
];

const recentOrders = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    product: 'Diamond Ring',
    amount: '$999.99',
    status: 'Processing'
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    product: 'Gold Necklace',
    amount: '$599.99',
    status: 'Shipped'
  },
  {
    id: '#ORD-003',
    customer: 'Robert Johnson',
    product: 'Silver Bracelet',
    amount: '$299.99',
    status: 'Pending'
  },
  {
    id: '#ORD-004',
    customer: 'Emily Davis',
    product: 'Pearl Earrings',
    amount: '$449.99',
    status: 'Delivered'
  }
];

const popularProducts = [
  {
    name: 'Diamond Ring',
    sales: 45,
    revenue: '$45,000',
    trend: '+12%'
  },
  {
    name: 'Gold Necklace',
    sales: 38,
    revenue: '$22,800',
    trend: '+8%'
  },
  {
    name: 'Silver Bracelet',
    sales: 32,
    revenue: '$9,600',
    trend: '+5%'
  },
  {
    name: 'Pearl Earrings',
    sales: 28,
    revenue: '$12,600',
    trend: '+15%'
  }
];

// 添加销售趋势数据
const salesTrend = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 198 },
  { name: 'Mar', sales: 5000, orders: 305 },
  { name: 'Apr', sales: 2780, orders: 189 },
  { name: 'May', sales: 1890, orders: 142 },
  { name: 'Jun', sales: 2390, orders: 178 },
  { name: 'Jul', sales: 3490, orders: 234 },
];

// 订单状态分布数据
const orderStatus = [
  { name: 'Pending', value: 20, color: '#FBBF24' },
  { name: 'Processing', value: 35, color: '#60A5FA' },
  { name: 'Shipped', value: 25, color: '#A78BFA' },
  { name: 'Delivered', value: 20, color: '#34D399' },
];

// 库存预警数据
const lowStockProducts = [
  { name: 'Diamond Ring', stock: 3, threshold: 5 },
  { name: 'Gold Necklace', stock: 2, threshold: 5 },
  { name: 'Silver Bracelet', stock: 4, threshold: 5 },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.isIncrease ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.isIncrease ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 图表部分 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 销售趋势图表 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h2>
          <ChartContainer>
            <AreaChartWrapper data={salesTrend} />
          </ChartContainer>
        </div>

        {/* 订单状态分布图 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h2>
          <ChartContainer>
            <PieChartWrapper data={orderStatus} />
          </ChartContainer>
        </div>
      </div>

      {/* 库存预警 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="space-y-4">
          {lowStockProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Stock: {product.stock} / Threshold: {product.threshold}
                </p>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    product.stock <= product.threshold / 2
                      ? 'bg-red-500'
                      : 'bg-yellow-500'
                  }`}
                  style={{ width: `${(product.stock / product.threshold) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近订单 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Package className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                    <p className="text-xs text-gray-500">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 热门产品 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Popular Products</h2>
              <TrendingUp className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {popularProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                    <p className="text-xs text-green-600">{product.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};