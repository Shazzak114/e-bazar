import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <img src="/logo.png" alt="E-Bazar Logo" className="h-8 w-8 mr-2" />
          E-Bazar
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/cart" className="flex items-center hover:text-yellow-300 transition duration-300">
                <ShoppingCart className="mr-1" />
                Cart
                {totalItems > 0 && (
                  <span className="ml-1 bg-yellow-400 text-blue-800 rounded-full px-2 py-1 text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to={user.role === 'seller' ? '/seller-dashboard' : '/account'} className="flex items-center hover:text-yellow-300 transition duration-300">
                    <User className="mr-1" />
                    {user.name}
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="flex items-center hover:text-yellow-300 transition duration-300">
                    <LogOut className="mr-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-yellow-300 transition duration-300">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-yellow-300 transition duration-300">Sign Up</Link>
                </li>
                <li>
                  <Link to="/seller-login" className="hover:text-yellow-300 transition duration-300">Seller Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;