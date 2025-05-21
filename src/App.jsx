import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from './utils/iconUtils';

// Import pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Profile from './pages/Profile';
import Info from './pages/Info';
import NotFound from './pages/NotFound';

// Import icons
const HomeIcon = getIcon('home');
const MenuIcon = getIcon('utensils');
const CalendarIcon = getIcon('calendar');
const UserIcon = getIcon('user');
const InfoIcon = getIcon('info');
const SunIcon = getIcon('sun');
const MoonIcon = getIcon('moon');
const BurgerMenuIcon = getIcon('menu');
const XIcon = getIcon('x');

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Update document class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Navigation items
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/menu', icon: MenuIcon, label: 'Menu' },
    { path: '/reservations', icon: CalendarIcon, label: 'Reservations' },
    { path: '/profile', icon: UserIcon, label: 'Profile' },
    { path: '/info', icon: InfoIcon, label: 'Info' }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Logo Bar */}
      <div className="bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700 fixed top-0 left-0 right-0 z-40">
        <div className="container-custom py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src="https://source.unsplash.com/random/40x40/?restaurant-logo" alt="DineConnect Logo" className="w-10 h-10 rounded-md mr-3" />
            <h1 className="text-xl font-bold text-primary">DineConnect</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="flex items-center">
            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 mr-2"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? 
                  <XIcon className="w-5 h-5 text-surface-600 dark:text-surface-300" /> : 
                  <BurgerMenuIcon className="w-5 h-5 text-surface-600 dark:text-surface-300" />
                }
              </button>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-secondary" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black bg-opacity-70 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              className="absolute top-0 right-0 h-full w-64 bg-white dark:bg-surface-800 shadow-lg"
              style={{ top: '0', marginTop: '0' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex flex-col space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary-light/10 text-primary"
                          : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-grow pt-20 pb-16 md:pb-6">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-[calc(100vh-10rem)]"
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/info" element={<Info />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation for Mobile and Tablet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 md:hidden z-40 shadow-lg">
        <div className="grid grid-cols-5 h-14">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center text-xs font-medium ${
                  isActive
                    ? "text-primary"
                    : "text-surface-600 dark:text-surface-400"
                }`
              }
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;