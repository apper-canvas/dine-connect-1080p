import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import { useCart } from '../contexts/CartContext';
import MenuItemModal from '../components/MenuItemModal';
import CartIndicator from '../components/CartIndicator';

// Import icons
const SearchIcon = getIcon('search');
const FilterIcon = getIcon('filter');
const ChevronDownIcon = getIcon('chevron-down');
const XIcon = getIcon('x');
const PlusIcon = getIcon('plus');
const MinusIcon = getIcon('minus');
const UtensilsIcon = getIcon('utensils');

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dietaryFilters, setDietaryFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});
  const { addToCart } = useCart();
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Drinks' }
  ];
  
  const dietaryOptions = [
    { id: 'vegetarian', name: 'Vegetarian', icon: 'leaf' },
    { id: 'vegan', name: 'Vegan', icon: 'sprout' },
    { id: 'gluten-free', name: 'Gluten Free', icon: 'wheat-off' },
    { id: 'spicy', name: 'Spicy', icon: 'flame' }
  ];
  
  // Initialize quantities for all menu items
  useEffect(() => {
    const initialQuantities = {};
    menuItems.forEach(item => {
      initialQuantities[item.id] = 1;
    });
    setItemQuantities(initialQuantities);
  }, []);
  
  // Sample menu items
  const menuItems = [
    // Appetizers
    {
      id: 1,
      name: 'Crispy Bruschetta',
      description: 'Grilled sourdough bread topped with fresh tomatoes, basil, and garlic',
      price: 12,
      image: 'https://source.unsplash.com/random/300x200/?bruschetta',
      category: 'appetizers',
      dietary: ['vegetarian']
    },
    {
      id: 2,
      name: 'Calamari Fritti',
      description: 'Lightly fried squid with lemon aioli and marinara sauce',
      price: 14,
      image: 'https://source.unsplash.com/random/300x200/?calamari',
      category: 'appetizers',
      dietary: []
    },
    {
      id: 3,
      name: 'Wild Mushroom Soup',
      description: 'Creamy soup with assorted forest mushrooms and truffle oil',
      price: 10,
      image: 'https://source.unsplash.com/random/300x200/?soup',
      category: 'appetizers',
      dietary: ['vegetarian', 'gluten-free']
    },
    
    // Main Courses
    {
      id: 4,
      name: 'Filet Mignon',
      description: 'Prime beef tenderloin with red wine reduction and potato purée',
      price: 38,
      image: 'https://source.unsplash.com/random/300x200/?steak',
      category: 'mains',
      dietary: ['gluten-free']
    },
    {
      id: 5,
      name: 'Herb Crusted Salmon',
      description: 'Fresh salmon with herb crust, served with seasonal vegetables',
      price: 28,
      image: 'https://source.unsplash.com/random/300x200/?salmon',
      category: 'mains',
      dietary: ['gluten-free']
    },
    {
      id: 6,
      name: 'Mushroom Risotto',
      description: 'Creamy Arborio rice with assorted mushrooms and Parmesan',
      price: 22,
      image: 'https://source.unsplash.com/random/300x200/?risotto',
      category: 'mains',
      dietary: ['vegetarian', 'gluten-free']
    },
    {
      id: 7,
      name: 'Spicy Arrabiata Pasta',
      description: 'Penne with spicy tomato sauce, garlic, and chili flakes',
      price: 18,
      image: 'https://source.unsplash.com/random/300x200/?pasta',
      category: 'mains',
      dietary: ['vegetarian', 'vegan', 'spicy']
    },
    
    // Desserts
    {
      id: 8,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center and vanilla ice cream',
      price: 12,
      image: 'https://source.unsplash.com/random/300x200/?chocolate-cake',
      category: 'desserts',
      dietary: ['vegetarian']
    },
    {
      id: 9,
      name: 'Crème Brûlée',
      description: 'Classic vanilla custard with caramelized sugar top',
      price: 10,
      image: 'https://source.unsplash.com/random/300x200/?creme-brulee',
      category: 'desserts',
      dietary: ['vegetarian', 'gluten-free']
    },
    
    // Drinks
    {
      id: 10,
      name: 'Signature Martini',
      description: 'House special blend with premium vodka and a secret twist',
      price: 14,
      image: 'https://source.unsplash.com/random/300x200/?martini',
      category: 'drinks',
      dietary: ['vegan', 'gluten-free']
    },
    {
      id: 11,
      name: 'Craft Lemonade',
      description: 'Fresh-squeezed lemonade with mint and local honey',
      price: 6,
      image: 'https://source.unsplash.com/random/300x200/?lemonade',
      category: 'drinks',
      dietary: ['vegetarian', 'vegan', 'gluten-free']
    }
  ];
  
  // Filter menu items based on active category, search query, and dietary filters
  const filteredItems = menuItems.filter(item => {
    // Category filter
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;

    // Search filter
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Dietary filter
    const dietaryMatch = dietaryFilters.length === 0 || 
                         dietaryFilters.every(filter => item.dietary.includes(filter));
    
    // Price filter
    const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];
    
    return categoryMatch && searchMatch && dietaryMatch && priceMatch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    return categoryMatch && searchMatch && dietaryMatch;
  });
  
  // Toggle dietary filter
  const toggleDietaryFilter = (filterId) => {
    setDietaryFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  // Update quantity for a menu item
  const updateQuantity = (itemId, delta) => {
    setItemQuantities(prev => {
      const newQuantity = Math.max(1, (prev[itemId] || 1) + delta);
      return { ...prev, [itemId]: newQuantity };
    });
  };
  
  // Add item to cart
  const handleAddToCart = (item) => {
    const quantity = itemQuantities[item.id] || 1;
    addToCart(item, quantity);
    toast.success(`${quantity} × ${item.name} added to your order!`);
    
    // Reset quantity to 1 after adding to cart
    setItemQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };
  
  // Open item detail modal
  const openItemDetail = (item) => {
    setSelectedItem(item);
  };
  
  // Handle price range change
  const handlePriceRangeChange = (event, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(event.target.value);
    setPriceRange(newRange);
  };
  
  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Our Menu</h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-auto md:min-w-[280px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-surface-500" />
          </div>
          <input
            type="text"
            className="input pl-10 pr-10"
            placeholder="Search the menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-surface-500 hover:text-surface-700"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Filter Button (Mobile) */}
        <button
          className="md:hidden flex items-center bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 px-4 py-2 rounded-lg text-sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon className="w-4 h-4 mr-2" />
          Filters {dietaryFilters.length > 0 && `(${dietaryFilters.length})`}
          <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {/* Dietary Filters (Mobile) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 py-2">
              {dietaryOptions.map(option => {
                const DietaryIcon = getIcon(option.icon);
                const isSelected = dietaryFilters.includes(option.id);
                
                return (
                  <button
                    key={option.id}
                    className={`flex items-center p-2 rounded-lg border ${
                      isSelected 
                        ? 'bg-primary/10 border-primary/30 text-primary' 
                        : 'border-surface-200 dark:border-surface-700'
                    }`}
                    onClick={() => toggleDietaryFilter(option.id)}
                  >
                    <DietaryIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{option.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price Range Filter (Mobile) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden mt-2"
          >
            <div className="py-2">
              <p className="text-sm font-medium mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(e, 1)}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Category Navigation */}
        <div className="flex overflow-x-auto md:flex-col md:w-56 flex-shrink-0 pb-2 md:pb-0 scrollbar-hide">
          <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Desktop Dietary Filters */}
          <div className="hidden md:block mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
            <h3 className="font-medium mb-4 flex items-center">
              <FilterIcon className="w-4 h-4 mr-2" />
              Dietary Preferences
            </h3>
            <div className="space-y-2">
              {dietaryOptions.map(option => {
                const DietaryIcon = getIcon(option.icon);
                const isSelected = dietaryFilters.includes(option.id);
                
                return (
                  <button
                    key={option.id}
                    className={`flex items-center w-full p-2 rounded-lg ${
                      isSelected 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-surface-100 dark:hover:bg-surface-800'
                    }`}
                    onClick={() => toggleDietaryFilter(option.id)}
                  >
                    <DietaryIcon className="w-4 h-4 mr-2" />
                    <DietaryIcon className="w-4 h-4 mr-2" />
                  </button>
                );
              })}
            </div>
          </div>

            {/* Desktop Price Range Filter */}
            <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-surface-500 dark:text-surface-400 mb-1 block">
                    Minimum: ${priceRange[0]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="w-full accent-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-surface-500 dark:text-surface-400 mb-1 block">
                    Maximum: ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            </div>
        </div>
        
        {/* Menu Items */}
        <div className="flex-grow">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openItemDetail(item)}
                >
                  <div className="w-full sm:w-1/3 h-32 sm:h-auto flex-shrink-0 -mx-5 -mt-5 sm:-ml-5 sm:-my-5 sm:mr-4 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.dietary.length > 0 && (
                      <div className="absolute bottom-2 left-2 flex space-x-1">
                        {item.dietary.map(tag => {
                          const dietaryOption = dietaryOptions.find(opt => opt.id === tag);
                          if (!dietaryOption) return null;
                          
                          const TagIcon = getIcon(dietaryOption.icon);
                          return (
                            <div 
                              key={tag}
                              className="w-6 h-6 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center" 
                              title={dietaryOption.name}
                            >
                              <TagIcon className="w-3.5 h-3.5 text-white" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow pt-4 sm:pt-0">
                    <h3 className="font-medium cursor-pointer hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">{item.description}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
                      <div className="flex items-center" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center border border-surface-200 dark:border-surface-700 rounded-lg mr-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, -1);
                            }}
                            className="p-1 text-surface-500 hover:text-surface-700"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center text-sm">{itemQuantities[item.id] || 1}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, 1);
                            }}
                            className="p-1 text-surface-500 hover:text-surface-700"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          className="btn btn-outline text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full mb-4">
                <UtensilsIcon className="w-8 h-8 text-surface-400" />
              </div>
              <h3 className="text-lg font-medium">No items found</h3>
              <p className="text-surface-500 dark:text-surface-400 mt-2 max-w-md mx-auto">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <button 
                className="btn btn-outline mt-4"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setDietaryFilters([]);
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Item Detail Modal */}
      <MenuItemModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />
      <CartIndicator />
    </div>
  );
};

export default Menu;