import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Import icons
const StarIcon = getIcon('star');
const ChevronRightIcon = getIcon('chevron-right');
const ClockIcon = getIcon('clock');
const MapPinIcon = getIcon('map-pin');
const XIcon = getIcon('x');
const PhoneIcon = getIcon('phone');

function Home() {
  const [specialOffer, setSpecialOffer] = useState(true);
  
  const dismissOffer = () => {
    setSpecialOffer(false);
    toast.success("Special offer dismissed! You can still find it in the Menu section.");
  };

  return (
    <div className="space-y-8 py-4">
      {/* Restaurant Banner */}
      <div className="relative rounded-xl overflow-hidden h-52 sm:h-64 md:h-80 lg:h-96">
        <img 
          src="https://source.unsplash.com/random/1200x600/?restaurant,interior" 
          alt="Restaurant interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">Welcome to Bistro Elegante</h1>
            <p className="text-white/90 text-sm md:text-base mt-2 max-w-lg">Experience the finest culinary delights in a charming atmosphere with exceptional service</p>
          </motion.div>
        </div>
      </div>
      
      {/* Quick Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card flex items-center p-4">
          <ClockIcon className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-400">Hours Today</p>
            <p className="font-medium">11:00 AM - 10:00 PM</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <MapPinIcon className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-400">Location</p>
            <p className="font-medium">123 Gourmet Ave, Foodville</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <PhoneIcon className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-400">Reservations</p>
            <p className="font-medium">(555) 123-4567</p>
          </div>
        </div>
      </div>
      
      {/* Special Offer Card */}
      {specialOffer && (
        <motion.div 
          className="card border-l-4 border-l-accent bg-accent/10 dark:bg-accent/5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex">
              <div className="rounded-full bg-accent/20 p-2 mr-3">
                <StarIcon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Weekend Special Offer</h3>
                <p className="text-surface-600 dark:text-surface-300 mt-1">
                  Enjoy our Chef's Special tasting menu for two, including a complimentary glass of champagne.
                </p>
                <Link to="/menu" className="inline-flex items-center text-primary font-medium mt-2 hover:underline">
                  View Details <ChevronRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <button 
              onClick={dismissOffer} 
              className="text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300"
              aria-label="Dismiss offer"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Main Interactive Feature */}
      <MainFeature />
      
      {/* Featured Dishes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured Dishes</h2>
          <Link to="/menu" className="text-primary hover:underline flex items-center">
            View Full Menu <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 1,
              name: "Truffle Risotto",
              description: "Creamy arborio rice with wild mushrooms and truffle oil",
              price: "$24",
              image: "https://source.unsplash.com/random/300x200/?risotto"
            },
            {
              id: 2,
              name: "Grilled Salmon",
              description: "Fresh salmon fillet with herb butter and seasonal vegetables",
              price: "$28",
              image: "https://source.unsplash.com/random/300x200/?salmon"
            },
            {
              id: 3,
              name: "Chocolate Soufflé",
              description: "Warm chocolate soufflé with vanilla bean ice cream",
              price: "$12",
              image: "https://source.unsplash.com/random/300x200/?chocolate,dessert"
            }
          ].map(dish => (
            <motion.div 
              key={dish.id}
              className="card overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-48 overflow-hidden rounded-lg -mx-5 -mt-5 mb-4">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-medium text-lg">{dish.name}</h3>
              <p className="text-surface-600 dark:text-surface-300 text-sm mt-1">{dish.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="font-bold text-primary">{dish.price}</p>
                <Link to="/menu" className="btn btn-outline text-sm">View Details</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;