import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  distance: number;
  shop: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  discount,
  distance,
  shop,
  image,
}) => {
  const { addToCart, cart, updateQuantity } = useCart();
  const cartItem = cart.find(item => item.id === id);

  const handleAddToCart = () => {
    addToCart({ id, name, price, quantity: 1 });
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(id, cartItem.quantity + 1);
    } else {
      addToCart({ id, name, price, quantity: 1 });
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 0) {
      updateQuantity(id, cartItem.quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{name}</h3>
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-xl font-bold text-blue-600">${price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 line-through ml-2">${originalPrice.toFixed(2)}</span>
          </div>
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            {discount}% off
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {distance}km, {shop}
        </p>
        <div className="flex justify-between items-center">
          {cartItem ? (
            <div className="flex items-center">
              <button
                onClick={handleDecreaseQuantity}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-l-full hover:bg-gray-300 transition duration-300"
              >
                <Minus size={16} />
              </button>
              <span className="bg-gray-200 text-gray-800 px-4 py-1">{cartItem.quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-r-full hover:bg-gray-300 transition duration-300"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <ShoppingCart className="mr-2" size={16} />
              Add to Cart
            </button>
          )}
          <Link
            to={`/product/${id}`}
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;