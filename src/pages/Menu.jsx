import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { toast } from 'react-toastify';
import { useInView } from 'react-intersection-observer';
import { getIcon } from '../utils/iconUtils';
import { useCart } from '../contexts/CartContext';
import MenuItemModal from '../components/MenuItemModal';
import CartIndicator from '../components/CartIndicator';
import { menuItems, categories, dietaryOptions, sortOptions } from '../utils/menuData';

// Import icons
const SearchIcon = getIcon('search');
const FilterIcon = getIcon('filter');
const ChevronDownIcon = getIcon('chevron-down');
const XIcon = getIcon('x');
const ClockIcon = getIcon('clock');
const InfoIcon = getIcon('info');
const UtensilsIcon = getIcon('utensils');
const ChevronRightIcon = getIcon('chevron-right');
const StarIcon = getIcon('star');
const ArrowDownIcon = getIcon('arrow-down');
const ArrowUpIcon = getIcon('arrow-up');
const ArrowUpDownIcon = getIcon('arrow-up-down');
const CalendarIcon = getIcon('calendar');
const PlusIcon = getIcon('plus');
const MinusIcon = getIcon('minus');

const Menu = () => {
  // State variables
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [dietaryFilters, setDietaryFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});
  const { addToCart } = useCart();

  // Initialize quantities for all menu items
  useEffect(() => {
    const initialQuantities = {};
    menuItems.forEach(item => {
      initialQuantities[item.id] = 1;
    });
    setItemQuantities(initialQuantities);
  }, []);
  
  // Filter menu items based on active category, search query, and dietary filters
  const filteredItems = menuItems.filter(item => {
    // Category filter
    const categoryMatch = activeCategory === 'all' || 
                        (activeCategory === 'seasonal' && item.seasonal) || 
                        item.category === activeCategory;

    // Search filter
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())));

    // Dietary filter
    const dietaryMatch = dietaryFilters.length === 0 || 
                        dietaryFilters.every(filter => item.dietary.includes(filter));
    
    // Price filter
    const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];
    
    return categoryMatch && searchMatch && dietaryMatch && priceMatch;
  });

  // Sort the filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (selectedSort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'popular':
        return b.popular - a.popular;
      case 'recommended':
      default:
        // For recommended, show signature dishes first, then by popularity
        if (a.signature && !b.signature) return -1;
        if (!a.signature && b.signature) return 1;
        return b.popular - a.popular;
    }
  });

  // Group items by category for display
  const groupedItems = {};
  categories.forEach(category => {
    if (category.id !== 'all' && category.id !== 'seasonal') {
      groupedItems[category.id] = sortedItems.filter(item => item.category === category.id);
    }
  });
  
  // Add seasonal items group if there are any matching seasonal items
  const seasonalItems = sortedItems.filter(item => item.seasonal);
  if (seasonalItems.length > 0) {
    groupedItems['seasonal'] = seasonalItems;
  }
  
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

  // Toggle item expansion for viewing ingredients and allergens
  const toggleItemExpansion = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };
  
  // Handle price range change
  const handlePriceRangeChange = (event, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(event.target.value);
    setPriceRange(newRange);
  };

  // Reset all filters
  const resetAllFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setDietaryFilters([]);
    setPriceRange([0, 50]);
    setSelectedSort('recommended');
  };

  // LazyLoad Image component
  const LazyImage = ({ src, alt, className }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      rootMargin: '200px 0px',
    });
    
    return (
      <div ref={ref} className={`${className} bg-surface-100 dark:bg-surface-700`}>
        {inView ? (
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    );
  };

  // Get the sort icon based on current sort
  const getSortIcon = () => {
    if (selectedSort === 'price-asc' || selectedSort === 'name-asc') {
      return <ArrowUpIcon className="w-4 h-4" />;
    } else if (selectedSort === 'price-desc' || selectedSort === 'name-desc') {
      return <ArrowDownIcon className="w-4 h-4" />;
    }
    return <ArrowUpDownIcon className="w-4 h-4" />;
  };

  // Render a menu tag
  const renderTag = (tagName) => {
    let TagComponent;
    let tagClass = '';
    let icon = null;
    
    switch (tagName) {
      case 'popular':
        tagClass = 'menu-tag-popular';
        icon = <StarIcon className="w-3 h-3 mr-1" />;
        TagComponent = 'Most Popular';
        break;
      case 'seasonal':
        tagClass = 'menu-tag-seasonal';
        icon = <CalendarIcon className="w-3 h-3 mr-1" />;
        TagComponent = 'Seasonal';
        break;
      case 'signature':
        tagClass = 'menu-tag-signature';
        icon = <StarIcon className="w-3 h-3 mr-1" />;
        TagComponent = 'Signature Dish';
        break;
      case 'new':
        tagClass = 'menu-tag-new';
        icon = <StarIcon className="w-3 h-3 mr-1" />;
        TagComponent = 'New';
        break;
      case 'spicy':
        tagClass = 'menu-tag-popular';
        icon = getIcon('flame');
        TagComponent = 'Spicy';
        break;
      default:
        return null;
    }
    
    return (
      <div className={`menu-tag ${tagClass} mr-2 mb-2`}>
        {icon}
        {TagComponent}
      </div>
    );
  };
  
  // Render a single menu item card
  const renderMenuItemCard = (item) => {
    const isExpanded = expandedItemId === item.id;
    const tagsToShow = [];
    
    // Add special tags
    if (item.signature) tagsToShow.push('signature');
    if (item.seasonal) tagsToShow.push('seasonal');
    if (item.tags && item.tags.includes('new')) tagsToShow.push('new');
    if (item.tags && item.tags.includes('popular')) tagsToShow.push('popular');
    if (item.tags && item.tags.includes('spicy')) tagsToShow.push('spicy');
    
    return (
      <motion.div
        key={item.id}
        layout="position"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="menu-card"
      >
        <div className="relative overflow-hidden cursor-pointer" onClick={() => openItemDetail(item)}>
          <LazyImage 
            src={item.image} 
            alt={item.name}
            className="h-48 overflow-hidden"
          />
          
          {/* Special Tags (New, Signature, Seasonal) */}
          {tagsToShow.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap">
              {tagsToShow.map(tag => renderTag(tag))}
            </div>
          )}
          
          {/* Dietary Badges */}
          {item.dietary.length > 0 && (
            <div className="absolute bottom-3 left-3 flex space-x-1">
              {item.dietary.map(tag => {
                const dietaryOption = dietaryOptions.find(opt => opt.id === tag);
                if (!dietaryOption) return null;
                
                const TagIcon = getIcon(dietaryOption.icon);
                let bgColor = 'bg-black/50 backdrop-blur-sm';
                
                // Assign colors based on dietary preference
                if (tag === 'vegetarian') bgColor = 'bg-green-600';
                if (tag === 'vegan') bgColor = 'bg-green-700';
                if (tag === 'gluten-free') bgColor = 'bg-yellow-600';
                if (tag === 'dairy-free') bgColor = 'bg-blue-600';
                if (tag === 'nut-free') bgColor = 'bg-orange-600';
                if (tag === 'spicy') bgColor = 'bg-red-600';
                
                return (
                  <div 
                    key={tag}
                    className={`dietary-badge ${bgColor}`}
                    title={dietaryOption.name}
                  >
                    <TagIcon className="w-3.5 h-3.5" />
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Preparation Time */}
          {item.preparationTime && (
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
              <ClockIcon className="w-3 h-3 mr-1" />
              {item.preparationTime}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer" onClick={() => openItemDetail(item)}>
              {item.name}
            </h3>
            <p className="font-bold text-primary text-lg">${item.price.toFixed(2)}</p>
          </div>
          
          <p className="text-surface-600 dark:text-surface-400 text-sm mt-1 line-clamp-2">{item.shortDescription || item.description}</p>
          
          <div className="mt-4 flex justify-between items-center">
            <button onClick={() => toggleItemExpansion(item.id)} className="flex items-center text-sm text-primary hover:text-primary-dark">
              <InfoIcon className="w-4 h-4 mr-1" />
              {isExpanded ? 'Less Info' : 'More Info'}
              <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="flex items-center" onClick={e => e.stopPropagation()}>
              <div className="flex items-center border border-surface-200 dark:border-surface-700 rounded-lg mr-2">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 text-surface-500 hover:text-surface-700"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-sm">{itemQuantities[item.id] || 1}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 text-surface-500 hover:text-surface-700"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              <button 
                className="btn btn-primary py-1.5 text-sm"
                onClick={() => handleAddToCart(item)}
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Expandable Ingredients & Allergens Section */}
          <AnimatePresence>
            {isExpanded && item.ingredients && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="ingredients-list">
                  <p className="font-medium mb-1">Ingredients:</p>
                  <p>{item.ingredients.join(', ')}</p>
                  
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium mb-1">Allergens:</p>
                      <p>Contains: <span className="allergen-highlight">{item.allergens.join(', ')}</span></p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="pt-2 pb-16 space-y-6 relative">
      {/* Header with title and search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-20 bg-surface-50 dark:bg-surface-900 py-4 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          <UtensilsIcon className="w-6 h-6 mr-2 text-primary" />
          Our Menu
        </h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-auto md:min-w-[320px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-surface-500" />
          </div>
          <input
            type="text"
            className="input pl-10 pr-10 py-2.5"
            placeholder="Search dishes, ingredients..."
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

        <div className="flex space-x-2">
          {/* Sort Button */}
          <div className="relative">
            <button
              className="flex items-center bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 px-4 py-2.5 rounded-lg text-sm"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              {getSortIcon()}
              <span className="ml-2 hidden sm:inline">{sortOptions.find(o => o.id === selectedSort)?.name || 'Sort'}</span>
              <span className="ml-2 sm:hidden">Sort</span>
              <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform ${showSortOptions ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Sort Options Dropdown */}
            <AnimatePresence>
              {showSortOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-surface-800 ring-1 ring-black ring-opacity-5 z-30"
                  onClick={() => setShowSortOptions(false)}
                >
                  <div className="py-1">
                    {sortOptions.map(option => (
                      <button
                        key={option.id}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          selectedSort === option.id 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                        }`}
                        onClick={() => setSelectedSort(option.id)}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Filter Button */}
          <button
            className="flex items-center bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 px-4 py-2.5 rounded-lg text-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterIcon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Filters</span>
            <span className="sm:hidden">Filter</span>
            {dietaryFilters.length > 0 && 
              <span className="ml-1 flex items-center justify-center w-5 h-5 bg-primary text-white text-xs rounded-full">
                {dietaryFilters.length}
              </span>
            }
            <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-md border border-surface-200 dark:border-surface-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">
                Dietary Preferences & Filters
              </h3>
              <button
                onClick={() => resetAllFilters()}
                className="text-sm text-primary hover:text-primary-dark"
              >
                Reset All
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {dietaryOptions.map(option => {
                const DietaryIcon = getIcon(option.icon);
                const isSelected = dietaryFilters.includes(option.id);
                
                return (
                  <button
                    key={option.id}
                    className={`flex items-center p-2 rounded-lg border ${
                      isSelected 
                        ? 'bg-primary/10 border-primary/30 text-primary' 
                        : 'border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700'
                    }`}
                    onClick={() => toggleDietaryFilter(option.id)}
                  >
                    <DietaryIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{option.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6">
              <p className="text-sm font-medium mb-4">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-xs text-surface-500 mb-1 block">Min Price</label>
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
                <div className="flex-1">
                  <label className="text-xs text-surface-500 mb-1 block">Max Price</label>
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
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Category Navigation */}
        <div className="overflow-x-auto lg:w-56 flex-shrink-0 pb-2 lg:pb-0 scrollbar-hide">
          <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
            {categories.map(category => (
              <div className="flex-shrink-0" key={category.id}>
              <button
                  className={`flex items-center whitespace-nowrap px-4 py-3 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
              >
                  {category.icon && (
                    <span className={`mr-2 ${activeCategory === category.id ? 'text-white' : 'text-primary'}`}>
                      {React.createElement(getIcon(category.icon), { size: 18 })}
                    </span>
                  )}
                  <span className="font-medium">{category.name}</span>
                  
                  {/* Show count for items in this category */}
                  {category.id !== 'all' && (
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === category.id 
                        ? 'bg-white text-primary' 
                        : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                    }`}>
                      {category.id === 'seasonal' 
                        ? menuItems.filter(item => item.seasonal).length
                        : menuItems.filter(item => item.category === category.id).length}
                    </span>
                  )}
              </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="flex-grow min-w-0">
          {filteredItems.length > 0 ? (
            <LayoutGroup>
              {/* Display items by category or as a flat list depending on selected category */}
              {activeCategory === 'all' ? (
                // If "All" is selected, group items by category
                Object.entries(groupedItems).map(([categoryId, items]) => {
                  if (items.length === 0) return null;
                  const categoryInfo = categories.find(c => c.id === categoryId);
                  
                  return (
                    <div key={categoryId} className="mb-10">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        {categoryInfo?.icon && React.createElement(getIcon(categoryInfo.icon), { 
                          className: "w-5 h-5 mr-2 text-primary" 
                        })}
                        {categoryInfo?.name || categoryId}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {items.map(item => renderMenuItemCard(item))}
                      </div>
                    </div>
                  );
                })
              ) : (
                // If a specific category is selected, show items in a flat grid
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {sortedItems.map(item => renderMenuItemCard(item))}
                </div>
              )}
            </LayoutGroup>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-full mb-6">
                <UtensilsIcon className="w-8 h-8 text-surface-400" />
              </div>
              <h3 className="text-xl font-medium">No matching items found</h3>
              <p className="text-surface-500 dark:text-surface-400 mt-2 max-w-md mx-auto">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <button 
                className="btn btn-outline mt-4"
                onClick={resetAllFilters}
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