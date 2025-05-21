import { format, parseISO, isValid, addDays, startOfDay, differenceInSeconds, parse, isToday, isBefore, addMinutes } from 'date-fns';
import { BUSINESS_HOURS } from './restaurantData';

/**
 * Formats a date object to display as a date string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string (e.g., "Monday, Jan 1")
 */
export const getDatePlus = (days) => addDays(startOfDay(new Date()), days);

/**
 * Format a countdown in a human-readable format
 * @param {Date} targetDate The target date to countdown to
 * @returns {Object} Object containing days, hours, minutes, seconds and a formatted string
 */
export const formatCountdown = (targetDate) => {
  if (!targetDate || !isValid(new Date(targetDate))) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, formatted: '00:00:00' };
  }

  const now = new Date();
  const target = new Date(targetDate);
  const totalSeconds = differenceInSeconds(target, now);
  
  if (totalSeconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, formatted: '00:00:00', expired: true };
  }

  // Calculate time components
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Format for display
  let formatted = '';
  
  if (days > 0) {
    formatted = `${days}d ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  } else {
    formatted = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }

  return { days, hours, minutes, seconds, formatted };
};

/**
 * Helper to pad numbers with leading zeros
 */
const padZero = (num) => {
  return num.toString().padStart(2, '0');
};

/**
 * Formats a date object to display as a date string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string (e.g., "Monday, Jan 1")
 */
export const formatDisplayDate = (date) => {
  return format(date, 'EEEE, MMM d');

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