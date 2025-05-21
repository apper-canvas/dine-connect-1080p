import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const HomeIcon = getIcon('home');
const ArrowLeftIcon = getIcon('arrow-left');

function NotFound() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <div className="w-24 h-24 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mb-6">
          {getIcon('coffee').type({ className: "w-12 h-12 text-primary" })}
        </div>
      </motion.div>
      
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. Perhaps you'd like to check our menu or make a reservation instead?
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="btn btn-primary flex items-center justify-center"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Go to Home
        </Link>
        <button 
          onClick={() => window.history.back()} 
          className="btn btn-outline flex items-center justify-center"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Go Back
        </button>
      </div>
    </motion.div>
  );
}

export default NotFound;