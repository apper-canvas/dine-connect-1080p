import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';
import { getIcon } from '../utils/iconUtils';

const XIcon = getIcon('x');
const MinusIcon = getIcon('minus');
const PlusIcon = getIcon('plus');

const MenuItemModal = ({ item, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addToCart } = useCart();

  if (!item) return null;

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, specialInstructions);
    toast.success(`${quantity} × ${item.name} added to your order!`);
    onClose();
  };

  const dietaryOptions = [
    { id: 'vegetarian', name: 'Vegetarian', icon: 'leaf' },
    { id: 'vegan', name: 'Vegan', icon: 'sprout' },
    { id: 'gluten-free', name: 'Gluten Free', icon: 'wheat-off' },
    { id: 'spicy', name: 'Spicy', icon: 'flame' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-surface-800 rounded-xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <XIcon className="w-5 h-5" />
              </button>
              
              {item.dietary.length > 0 && (
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {item.dietary.map(tag => {
                    const dietaryOption = dietaryOptions.find(opt => opt.id === tag);
                    if (!dietaryOption) return null;
                    
                    const TagIcon = getIcon(dietaryOption.icon);
                    return (
                      <div 
                        key={tag}
                        className="flex items-center bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm" 
                      >
                        <TagIcon className="w-4 h-4 mr-1" />
                        {dietaryOption.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{item.name}</h2>
                <div className="text-xl font-bold text-primary">${item.price.toFixed(2)}</div>
              </div>
              
              <p className="text-surface-600 dark:text-surface-300 mb-6">{item.description}</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Special Instructions</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests or allergies?"
                  className="input w-full h-24 resize-none"
                ></textarea>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-surface-200 dark:border-surface-700 rounded-lg">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 text-surface-500 hover:text-surface-700 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-surface-500 hover:text-surface-700"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                >
                  Add to Order - ${(item.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuItemModal;