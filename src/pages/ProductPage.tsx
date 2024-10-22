import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Truck, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Map from '../components/Map';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart, updateQuantity } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  // In a real application, you would fetch the product data based on the ID
  const product = {
    id: parseInt(id || '0'),
    name: "Wireless Bluetooth Earbuds",
    price: 89.99,
    originalPrice: 299.99,
    discount: 70,
    distance: 5,
    shop: "TechGadgets Store",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description: "Experience crystal-clear sound with our latest Wireless Bluetooth Earbuds. Featuring advanced noise-cancellation technology and a comfortable, ergonomic design, these earbuds are perfect for music lovers and busy professionals alike.",
    latitude: 23.8103,
    longitude: 90.4125,
  };

  const cartItem = cart.find(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleBuyNow = () => {
    if (user) {
      addToCart({ ...product, quantity });
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      if (cartItem && cartItem.quantity > 1) {
        updateQuantity(product.id, cartItem.quantity - 1);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-64 w-full object-cover md:w-64" src={product.image} alt={product.name} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.shop}</div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{product.name}</h1>
            <p className="mt-2 text-gray-500">{product.description}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
              <span className="text-xl text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
              <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                {product.discount}% off
              </span>
            </div>
            <div className="mt-4 flex items-center text-gray-600">
              <Truck className="mr-2" />
              <span>{product.distance}km away • {product.shop}</span>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center">
                <button
                  onClick={handleDecreaseQuantity}
                  className="bg-gray-200 text-gray-800 px-3 py-2 rounded-l-full hover:bg-gray-300 transition duration-300"
                >
                  <Minus size={16} />
                </button>
                <span className="bg-gray-200 text-gray-800 px-4 py-2">{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="bg-gray-200 text-gray-800 px-3 py-2 rounded-r-full hover:bg-gray-300 transition duration-300"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
              >
                <ShoppingCart className="mr-2" size={20} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Shop Location</h2>
        <Map latitude={product.latitude} longitude={product.longitude} />
      </div>
    </div>
  );
};

export default ProductPage;