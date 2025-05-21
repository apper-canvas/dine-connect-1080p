import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

// Import icons
const CalendarIcon = getIcon('calendar');
const UsersIcon = getIcon('users');
const ClockIcon = getIcon('clock');
const CheckIcon = getIcon('check-circle');
const InfoIcon = getIcon('info');
const ArrowRightIcon = getIcon('arrow-right');

function MainFeature() {
  // Form state
  const [reservation, setReservation] = useState({
    date: '',
    time: '',
    partySize: 2,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  
  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [errors, setErrors] = useState({});
  
  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Update available times when date changes
  useEffect(() => {
    if (reservation.date) {
      // Simulate fetching available times based on the selected date
      // In a real app, this would come from an API
      const times = [];
      // Generate times from 11 AM to 9 PM at 30-minute intervals
      for (let hour = 11; hour <= 21; hour++) {
        for (let minute of [0, 30]) {
          // Skip some times to simulate unavailability
          if ((hour === 19 && minute === 30) || (hour === 20 && minute === 0)) {
            continue;
          }
          
          const formattedHour = hour % 12 || 12;
          const amPm = hour < 12 ? 'AM' : 'PM';
          const formattedMinute = minute === 0 ? '00' : minute;
          const timeString = `${formattedHour}:${formattedMinute} ${amPm}`;
          
          times.push(timeString);
        }
      }
      setAvailableTimes(times);
    }
  }, [reservation.date]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!reservation.date) {
        newErrors.date = 'Please select a date';
      }
      if (!reservation.time) {
        newErrors.time = 'Please select a time';
      }
      if (!reservation.partySize || reservation.partySize < 1) {
        newErrors.partySize = 'Please enter a valid party size';
      }
    } else if (currentStep === 2) {
      if (!reservation.name.trim()) {
        newErrors.name = 'Please enter your name';
      }
      if (!reservation.email.trim()) {
        newErrors.email = 'Please enter your email';
      } else if (!/^\S+@\S+\.\S+$/.test(reservation.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!reservation.phone.trim()) {
        newErrors.phone = 'Please enter your phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      // Simulate API submission
      setTimeout(() => {
        setIsSubmitted(true);
        toast.success('Reservation submitted successfully!');
      }, 1000);
    }
  };
  
  // Reset form
  const handleReset = () => {
    setReservation({
      date: '',
      time: '',
      partySize: 2,
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setErrors({});
  };
  
  return (
    <div className="card dark:shadow-neu-dark space-y-6">
      <div className="flex items-center mb-2">
        <div className="rounded-full bg-primary/10 p-2 mr-3">
          <CalendarIcon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Quick Reservation</h2>
      </div>
      
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form 
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress Indicator */}
            <div className="relative mb-6">
              <div className="w-full h-1 bg-surface-200 dark:bg-surface-700 rounded-full">
                <motion.div 
                  className="h-1 bg-primary rounded-full"
                  initial={{ width: '50%' }}
                  animate={{ width: currentStep === 1 ? '50%' : '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-surface-500 dark:text-surface-400">
                <span className={currentStep === 1 ? 'text-primary font-medium' : ''}>
                  Reservation Details
                </span>
                <span className={currentStep === 2 ? 'text-primary font-medium' : ''}>
                  Contact Information
                </span>
              </div>
            </div>
            
            {/* Step 1: Reservation Details */}
            {currentStep === 1 && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium">
                    Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CalendarIcon className="w-4 h-4 text-surface-500 dark:text-surface-400" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      min={today}
                      value={reservation.date}
                      onChange={handleChange}
                      className={`input pl-10 ${errors.date ? 'border-red-500' : ''}`}
                      aria-invalid={errors.date ? 'true' : 'false'}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="time" className="block text-sm font-medium">
                    Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <ClockIcon className="w-4 h-4 text-surface-500 dark:text-surface-400" />
                    </div>
                    <select
                      id="time"
                      name="time"
                      value={reservation.time}
                      onChange={handleChange}
                      disabled={!reservation.date}
                      className={`input pl-10 ${errors.time ? 'border-red-500' : ''} ${!reservation.date ? 'opacity-60 cursor-not-allowed' : ''}`}
                      aria-invalid={errors.time ? 'true' : 'false'}
                    >
                      <option value="">Select time</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                  )}
                  {!reservation.date && (
                    <p className="text-surface-500 dark:text-surface-400 text-xs mt-1">
                      Please select a date first
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="partySize" className="block text-sm font-medium">
                    Party Size
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UsersIcon className="w-4 h-4 text-surface-500 dark:text-surface-400" />
                    </div>
                    <input
                      type="number"
                      id="partySize"
                      name="partySize"
                      min="1"
                      max="20"
                      value={reservation.partySize}
                      onChange={handleChange}
                      className={`input pl-10 ${errors.partySize ? 'border-red-500' : ''}`}
                      aria-invalid={errors.partySize ? 'true' : 'false'}
                    />
                  </div>
                  {errors.partySize && (
                    <p className="text-red-500 text-xs mt-1">{errors.partySize}</p>
                  )}
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn btn-primary flex items-center"
                  >
                    Continue <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={reservation.name}
                    onChange={handleChange}
                    className={`input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="John Doe"
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={reservation.email}
                    onChange={handleChange}
                    className={`input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="john@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={reservation.phone}
                    onChange={handleChange}
                    className={`input ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="(555) 123-4567"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="specialRequests" className="block text-sm font-medium">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={reservation.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    className="input resize-none"
                    placeholder="Any dietary requirements or special occasions?"
                  ></textarea>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Complete Reservation
                  </button>
                </div>
              </motion.div>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4"
          >
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Reservation Confirmed!</h3>
            <p className="text-surface-600 dark:text-surface-300 mb-6">
              We've sent a confirmation email to <span className="font-medium">{reservation.email}</span>
            </p>
            
            <div className="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-surface-500 dark:text-surface-400">Date & Time</p>
                  <p className="font-medium">{reservation.date} at {reservation.time}</p>
                </div>
                <div>
                  <p className="text-surface-500 dark:text-surface-400">Party Size</p>
                  <p className="font-medium">{reservation.partySize} people</p>
                </div>
                <div>
                  <p className="text-surface-500 dark:text-surface-400">Name</p>
                  <p className="font-medium">{reservation.name}</p>
                </div>
                <div>
                  <p className="text-surface-500 dark:text-surface-400">Phone</p>
                  <p className="font-medium">{reservation.phone}</p>
                </div>
              </div>
              
              {reservation.specialRequests && (
                <div className="mt-3 pt-3 border-t border-surface-200 dark:border-surface-700">
                  <p className="text-surface-500 dark:text-surface-400 text-sm">Special Requests</p>
                  <p className="text-sm">{reservation.specialRequests}</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button 
                onClick={handleReset}
                className="btn btn-primary"
              >
                Make Another Reservation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Info Note */}
      <div className="flex items-start mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
        <InfoIcon className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5 mr-3" />
        <p className="text-sm text-surface-600 dark:text-surface-400">
          Reservations can be canceled or modified up to 3 hours before your scheduled time. For same-day changes, please call us directly.
        </p>
      </div>
    </div>
  );
}

export default MainFeature;