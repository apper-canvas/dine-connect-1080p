import { format, addDays, isToday, addMinutes, parse, isBefore } from 'date-fns';
import { BUSINESS_HOURS } from './restaurantData';

/**
 * Formats a date object to display as a date string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string (e.g., "Monday, Jan 1")
 */
export const formatDisplayDate = (date) => {
  return format(date, 'EEEE, MMM d');
};

/**
 * Gets the day type (weekday vs weekend) for hour determination
 * @param {Date} date - The date to check
 * @returns {string} Day type key for BUSINESS_HOURS
 */
export const getDayType = (date) => {
  const day = format(date, 'EEEE').toLowerCase();
  if (day === 'friday' || day === 'saturday') {
    return 'fridayToSaturday';
  } else if (day === 'sunday') {
    return 'sunday';
  } else {
    return 'mondayToThursday';
  }
};

/**
 * Generates time slots for a specific date based on business hours
 * @param {Date} date - The date to generate time slots for
 * @returns {Array} Array of time slot objects with formatted time
 */
export const generateTimeSlots = (date) => {
  const dayType = getDayType(date);
  const hours = BUSINESS_HOURS[dayType];
  const slots = [];
  
  // Parse the open and close times
  const today = new Date();
  const dateString = format(date, 'yyyy-MM-dd');
  const openTime = parse(`${dateString} ${hours.open}`, 'yyyy-MM-dd h:mm a', new Date());
  const closeTime = parse(`${dateString} ${hours.close}`, 'yyyy-MM-dd h:mm a', new Date());
  
  // Generate time slots at intervals
  let currentTime = openTime;
  
  while (isBefore(currentTime, closeTime)) {
    // For today, don't show past times
    if (!isToday(date) || (isToday(date) && isBefore(today, currentTime))) {
      slots.push({
        time: format(currentTime, 'h:mm a'),
        datetime: currentTime,
        available: Math.random() > 0.3 // Simulate availability (would come from API)
      });
    }
    
    currentTime = addMinutes(currentTime, hours.interval);
  }
  
  return slots;
};

/**
 * Generates an array of dates for the calendar view
 * @param {number} daysToShow - Number of days to generate
 * @returns {Array} Array of date objects with formatted strings
 */
export const generateCalendarDays = (daysToShow = 14) => {
  const today = new Date();
  const days = [];
  
  for (let i = 0; i < daysToShow; i++) {
    const date = addDays(today, i);
    days.push({
      date,
      displayDate: formatDisplayDate(date),
      isToday: isToday(date),
      dateString: format(date, 'yyyy-MM-dd')
    });
  }
  
  return days;
};

export const formatDateForDisplay = (dateString) => {
  return format(new Date(dateString), 'MMMM d, yyyy');
};