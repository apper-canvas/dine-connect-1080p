import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getIcon } from '../utils/iconUtils';

const ShoppingBagIcon = getIcon('shopping-bag');
const ChevronRightIcon = getIcon('chevron-right');
const XIcon = getIcon('x');

const CartIndicator = () => {
  const { cart, cartTotal, getCartItemCount, removeFromCart } = useCart();
  const [showPreview, setShowPreview] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const itemCount = getCartItemCount();

  // Animate when items are added to cart
  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  // Close preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showPreview && !e.target.closest('.cart-preview')) {
        setShowPreview(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPreview]);

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 cart-preview">
      <motion.button
        className="bg-primary text-white rounded-full p-3 shadow-lg flex items-center"
        onClick={() => setShowPreview(!showPreview)}
        whileTap={{ scale: 0.95 }}
        animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
      >
        <ShoppingBagIcon className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="ml-2 font-medium">
            {itemCount} | ${cartTotal.toFixed(2)}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 w-64 bg-white dark:bg-surface-800 rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="p-4">
              <h3 className="font-medium mb-2">Your Order ({itemCount} items)</h3>
              <div className="max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center py-2 border-b dark:border-surface-700">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-10 h-10 object-cover rounded mr-2" 
                    />
                    <div className="flex-1 text-sm">
                      <div className="flex justify-between">
                        <span>{item.name}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-surface-400 hover:text-surface-600"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between text-surface-500">
                        <span>{item.quantity} × ${item.price}</span>
                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t dark:border-surface-700 flex justify-between font-medium">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Link 
                to="/checkout" 
                className="btn btn-primary w-full mt-3 justify-center"
              >
                Checkout <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartIndicator;