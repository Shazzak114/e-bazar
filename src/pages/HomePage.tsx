import React from 'react';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 89.99,
    originalPrice: 299.99,
    discount: 70,
    distance: 5,
    shop: "TechGadgets Store",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    name: "Smart Fitness Tracker",
    price: 59.99,
    originalPrice: 199.99,
    discount: 70,
    distance: 3,
    shop: "HealthTech Hub",
    image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV",
    price: 599.99,
    originalPrice: 1999.99,
    discount: 70,
    distance: 7,
    shop: "ElectroVision Center",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  // Add more product objects as needed
];

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;