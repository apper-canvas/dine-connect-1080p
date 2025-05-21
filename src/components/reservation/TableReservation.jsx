import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../../utils/iconUtils';
import { formatDateForDisplay, generateCalendarDays } from '../../utils/dateUtils';
import { SPECIAL_OCCASIONS } from '../../utils/restaurantData';
import FloorPlan from './FloorPlan';
import TimeSlotPicker from './TimeSlotPicker';
import {
  setSelectedDate,
  setSelectedTime,
  setSelectedTable,
  setPartySize,
  setSpecialOccasion,
  updateCustomerInfo,
  setCurrentStep,
  completeReservation,
  resetReservation,
  selectReservationsState
} from '../../features/reservations/reservationsSlice';

// Import icons
const CalendarIcon = getIcon('calendar');
const ClockIcon = getIcon('clock');
const UsersIcon = getIcon('users');
const TableIcon = getIcon('layout-grid');
const ChevronRightIcon = getIcon('chevron-right');
const ChevronLeftIcon = getIcon('chevron-left');
const CheckIcon = getIcon('check-circle');
const InfoIcon = getIcon('info');
const CakeIcon = getIcon('cake');

function TableReservation() {
  const dispatch = useDispatch();
  const reservation = useSelector(selectReservationsState);
  
  const [calendarDays, setCalendarDays] = useState([]);
  const [errors, setErrors] = useState({});
  
  // Generate calendar days on component mount
  useEffect(() => {
    setCalendarDays(generateCalendarDays(14));
  }, []);
  
  // Handle date selection
  const handleDateSelect = (dateString) => {
    dispatch(setSelectedDate(dateString));
    clearError('date');
  };
  
  // Handle time selection
  const handleTimeSelect = (time) => {
    dispatch(setSelectedTime(time));
    clearError('time');
  };
  
  // Handle table selection
  const handleTableSelect = (table) => {
    dispatch(setSelectedTable(table));
    clearError('table');
  };
  
  // Handle party size change
  const handlePartySizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size > 0 && size <= 20) {
      dispatch(setPartySize(size));
      clearError('partySize');
    }
  };
  
  // Handle special occasion selection
  const handleSpecialOccasion = (occasion) => {
    dispatch(setSpecialOccasion(occasion));
  };
  
  // Handle customer info changes
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCustomerInfo({ [name]: value }));
    clearError(name);
  };
  
  // Clear a specific error
  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Validate the current step
  const validateStep = () => {
    const newErrors = {};
    
    if (reservation.currentStep === 1) {
      if (!reservation.selectedDate) {
        newErrors.date = 'Please select a date';
      }
      if (!reservation.selectedTime) {
        newErrors.time = 'Please select a time';
      }
      if (!reservation.partySize || reservation.partySize < 1) {
        newErrors.partySize = 'Please enter a valid party size';
      }
    } else if (reservation.currentStep === 2) {
      if (!reservation.selectedTable) {
        newErrors.table = 'Please select a table';
      }
    } else if (reservation.currentStep === 3) {
      if (!reservation.customerInfo.name.trim()) {
        newErrors.name = 'Please enter your name';
      }
      if (!reservation.customerInfo.email.trim()) {
        newErrors.email = 'Please enter your email';
      } else if (!/^\S+@\S+\.\S+$/.test(reservation.customerInfo.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!reservation.customerInfo.phone.trim()) {
        newErrors.phone = 'Please enter your phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      dispatch(setCurrentStep(reservation.currentStep + 1));
      window.scrollTo(0, 0);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    dispatch(setCurrentStep(reservation.currentStep - 1));
    window.scrollTo(0, 0);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      // Simulate API submission
      setTimeout(() => {
        dispatch(completeReservation());
        toast.success('Table reservation confirmed!');
      }, 1000);
    }
  };
  
  // Reset reservation
  const handleReset = () => {
    dispatch(resetReservation());
    setErrors({});
  };
  
  return (
    <div className="card dark:shadow-neu-dark">
      {!reservation.reservationComplete ? (
        <>
          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${reservation.currentStep >= 1 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'}`}>
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${reservation.currentStep >= 2 ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'}`}></div>
                </div>
                <span className={`text-xs mt-1 block ${reservation.currentStep === 1 ? 'text-primary font-medium' : ''}`}>Date & Time</span>
              </div>
              
              <div className="w-full">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${reservation.currentStep >= 2 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'}`}>
                    <TableIcon className="w-4 h-4" />
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${reservation.currentStep >= 3 ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'}`}></div>
                </div>
                <span className={`text-xs mt-1 block ${reservation.currentStep === 2 ? 'text-primary font-medium' : ''}`}>Table Selection</span>
              </div>
              
              <div className="w-full">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${reservation.currentStep >= 3 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'}`}>
                    <UsersIcon className="w-4 h-4" />
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${reservation.currentStep >= 4 ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'}`}></div>
                </div>
                <span className={`text-xs mt-1 block ${reservation.currentStep === 3 ? 'text-primary font-medium' : ''}`}>Guest Info</span>
              </div>
              
              <div className="w-full">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${reservation.currentStep >= 4 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'}`}>
                    <CheckIcon className="w-4 h-4" />
                  </div>
                </div>
                <span className={`text-xs mt-1 block ${reservation.currentStep === 4 ? 'text-primary font-medium' : ''}`}>Confirmation</span>
              </div>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {/* Step 1: Date & Time Selection */}
            {reservation.currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Select Date & Time</h3>
                
                {/* Party Size Selection */}
                <div className="mb-6">
                  <label htmlFor="partySize" className="block text-sm font-medium mb-1">
                    Party Size
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <UsersIcon className="w-4 h-4 text-surface-500 dark:text-surface-400" />
                    </div>
                    <input
                      type="number"
                      id="partySize"
                      min="1"
                      max="20"
                      value={reservation.partySize}
                      onChange={handlePartySizeChange}
                      className={`input pl-10 ${errors.partySize ? 'border-red-500' : ''}`}
                      placeholder="Number of guests"
                    />
                  </div>
                  {errors.partySize && (
                    <p className="text-red-500 text-xs mt-1">{errors.partySize}</p>
                  )}
                </div>
                
                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Select Date
                  </label>
                  <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex space-x-2">
                      {calendarDays.map((day, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleDateSelect(day.dateString)}
                          className={`
                            flex-shrink-0 w-28 p-3 rounded-lg border text-center
                            ${reservation.selectedDate === day.dateString 
                              ? 'bg-primary text-white border-primary' 
                              : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700'}
                          `}
                        >
                          {day.isToday && (
                            <span className="text-xs font-medium block mb-1 text-primary-light">Today</span>
                          )}
                          <span className="block text-sm font-medium">{day.displayDate}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                  )}
                </div>
                
                {/* Time Selection */}
                {reservation.selectedDate && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Select Time
                    </label>
                    <TimeSlotPicker 
                      timeSlots={reservation.availableTimeSlots} 
                      selectedTime={reservation.selectedTime}
                      onSelectTime={handleTimeSelect}
                    />
                    {errors.time && (
                      <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                    )}
                  </div>
                )}
                
                {/* Special Occasion */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Special Occasion (Optional)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SPECIAL_OCCASIONS.map(occasion => (
                      <button
                        key={occasion.id}
                        type="button"
                        onClick={() => handleSpecialOccasion(occasion.id)}
                        className={`
                          p-2 rounded-lg border text-sm text-center
                          ${reservation.specialOccasion === occasion.id
                            ? 'bg-primary-light/10 dark:bg-primary-dark/20 border-primary/30 text-primary'
                            : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700'}
                        `}
                      >
                        {occasion.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn btn-primary flex items-center"
                    disabled={!reservation.selectedDate || !reservation.selectedTime}
                  >
                    Continue <ChevronRightIcon className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Table Selection */}
            {reservation.currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Select Your Table</h3>
                
                <div className="bg-surface-50 dark:bg-surface-800/50 rounded-lg p-3 mb-6">
                  <div className="flex flex-wrap gap-3 items-center text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 text-primary mr-1" />
                      <span>{formatDateForDisplay(reservation.selectedDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 text-primary mr-1" />
                      <span>{reservation.selectedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="w-4 h-4 text-primary mr-1" />
                      <span>{reservation.partySize} {reservation.partySize === 1 ? 'guest' : 'guests'}</span>
                    </div>
                    {reservation.specialOccasion && (
                      <div className="flex items-center">
                        <CakeIcon className="w-4 h-4 text-primary mr-1" />
                        <span>{SPECIAL_OCCASIONS.find(o => o.id === reservation.specialOccasion)?.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
                  Please select a table from the floor plan below. Tables shown in yellow are available but may not accommodate your party size.
                </p>
                
                <FloorPlan 
                  tables={reservation.availableTables}
                  selectedTable={reservation.selectedTable}
                  onSelectTable={handleTableSelect}
                  partySize={reservation.partySize}
                />
                
                {errors.table && (
                  <p className="text-red-500 text-sm mt-2">{errors.table}</p>
                )}
                
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-outline flex items-center"
                  >
                    <ChevronLeftIcon className="w-4 h-4 mr-2" /> Back
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn btn-primary flex items-center"
                    disabled={!reservation.selectedTable}
                  >
                    Continue <ChevronRightIcon className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Guest Information */}
            {reservation.currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Guest Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={reservation.customerInfo.name}
                      onChange={handleCustomerInfoChange}
                      className={`input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={reservation.customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={reservation.customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      className={`input ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows="3"
                      value={reservation.customerInfo.specialRequests}
                      onChange={handleCustomerInfoChange}
                      className="input resize-none"
                      placeholder="Any dietary requirements or other special requests?"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-outline flex items-center"
                  >
                    <ChevronLeftIcon className="w-4 h-4 mr-2" /> Back
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn btn-primary flex items-center"
                  >
                    Review Reservation <ChevronRightIcon className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 4: Confirmation */}
            {reservation.currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Confirm Your Reservation</h3>
                
                <div className="bg-surface-50 dark:bg-surface-800/50 rounded-lg p-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-primary mb-2">Reservation Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div>
                        <span className="text-surface-500 dark:text-surface-400">Date:</span>
                        <span className="ml-2 font-medium">{formatDateForDisplay(reservation.selectedDate)}</span>
                      </div>
                      <div>
                        <span className="text-surface-500 dark:text-surface-400">Time:</span>
                        <span className="ml-2 font-medium">{reservation.selectedTime}</span>
                      </div>
                      <div>
                        <span className="text-surface-500 dark:text-surface-400">Party Size:</span>
                        <span className="ml-2 font-medium">{reservation.partySize} {reservation.partySize === 1 ? 'guest' : 'guests'}</span>
                      </div>
                      <div>
                        <span className="text-surface-500 dark:text-surface-400">Table:</span>
                        <span className="ml-2 font-medium">{reservation.selectedTable.name}</span>
                      </div>
                      {reservation.specialOccasion && (
                        <div className="col-span-full">
                          <span className="text-surface-500 dark:text-surface-400">Special Occasion:</span>
                          <span className="ml-2 font-medium">{SPECIAL_OCCASIONS.find(o => o.id === reservation.specialOccasion)?.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-surface-200 dark:border-surface-700">
                    <h4 className="font-medium text-primary mb-2">Guest Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div>
                        <span className="text-surface-500 dark:text-surface-400">Name:</span>
                        <span className="ml-2 font-medium">{reservation.customerInfo.name}</span>
                      </div>
                      <div>
                        <span className="text-surface-500 dark:text-surface-400">Email:</span>
                        <span className="ml-2 font-medium">{reservation.customerInfo.email}</span>
                      </div>
                      <div>
                        <span className="text-surface-500 dark:text-surface-400">Phone:</span>
                        <span className="ml-2 font-medium">{reservation.customerInfo.phone}</span>
                      </div>
                    </div>
                    
                    {reservation.customerInfo.specialRequests && (
                      <div className="mt-2">
                        <span className="text-surface-500 dark:text-surface-400 text-sm">Special Requests:</span>
                        <p className="text-sm mt-1">{reservation.customerInfo.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg">
                  <div className="flex items-start">
                    <InfoIcon className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      <p className="font-medium">Cancellation Policy</p>
                      <p className="mt-1">Reservations can be canceled up to 3 hours before your scheduled time without any charge. For same-day changes, please call us.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-outline flex items-center"
                  >
                    <ChevronLeftIcon className="w-4 h-4 mr-2" /> Back
                  </button>
                  
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
              <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-500" />
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-2">Your Table is Reserved!</h3>
          <p className="text-surface-600 dark:text-surface-300 mb-6 max-w-md mx-auto">
            We've sent a confirmation email to <span className="font-medium">{reservation.customerInfo.email}</span> with all the details.
          </p>
          
          <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-4 mb-6 max-w-md mx-auto text-left">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-surface-500 dark:text-surface-400">Date</p>
                <p className="font-medium">{formatDateForDisplay(reservation.selectedDate)}</p>
              </div>
              <div>
                <p className="text-surface-500 dark:text-surface-400">Time</p>
                <p className="font-medium">{reservation.selectedTime}</p>
              </div>
              <div>
                <p className="text-surface-500 dark:text-surface-400">Table</p>
                <p className="font-medium">{reservation.selectedTable.name}</p>
              </div>
              <div>
                <p className="text-surface-500 dark:text-surface-400">Party Size</p>
                <p className="font-medium">{reservation.partySize} people</p>
              </div>
              <div>
                <p className="text-surface-500 dark:text-surface-400">Reservation ID</p>
                <p className="font-medium">RS-{Math.floor(Math.random() * 1000000)}</p>
              </div>
            </div>
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
    </div>
  );
}

export default TableReservation;