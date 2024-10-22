import React, { useState } from 'react';
import { Package, DollarSign, TrendingUp, Users, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Earbuds', price: 89.99, stock: 50, sales: 120 },
    { id: 2, name: 'Smart Watch', price: 199.99, stock: 30, sales: 80 },
    { id: 3, name: 'Bluetooth Speaker', price: 59.99, stock: 100, sales: 200 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      sales: 0,
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  const totalSales = products.reduce((sum, product) => sum + product.price * product.sales, 0);
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  const calculateCommission = (price: number) => {
    if (price <= 20000) {
      return price * 0.03;
    } else if (price <= 100000) {
      return price * 0.05;
    } else {
      return "Contact support for custom pricing";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Package className="h-10 w-10 text-green-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Products</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-yellow-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Stock</p>
              <p className="text-2xl font-bold">{totalStock}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="h-10 w-10 text-purple-500 mr-4" />
            <div>
              <p className="text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="flex flex-wrap -mx-2">
          <div className="px-2 w-full sm:w-1/3 mb-4">
            <input
              type="text"
              placeholder="Product Name"
              className="w-full p-2 border rounded"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
          </div>
          <div className="px-2 w-full sm:w-1/3 mb-4">
            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 border rounded"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
          </div>
          <div className="px-2 w-full sm:w-1/3 mb-4">
            <input
              type="number"
              placeholder="Stock"
              className="w-full p-2 border rounded"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              required
            />
          </div>
          <div className="px-2 w-full">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
              <Plus className="mr-2" size={20} />
              Add Product
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Product List</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Stock</th>
                <th className="py-3 px-6 text-left">Sales</th>
                <th className="py-3 px-6 text-left">Commission</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{product.name}</td>
                  <td className="py-3 px-6 text-left">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-6 text-left">{product.stock}</td>
                  <td className="py-3 px-6 text-left">{product.sales}</td>
                  <td className="py-3 px-6 text-left">
                    {typeof calculateCommission(product.price) === 'string'
                      ? calculateCommission(product.price)
                      : `$${(calculateCommission(product.price) as number).toFixed(2)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;