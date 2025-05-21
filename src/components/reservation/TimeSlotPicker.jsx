import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../../utils/iconUtils';

const ClockIcon = getIcon('clock');
const CheckIcon = getIcon('check');

function TimeSlotPicker({ timeSlots, selectedTime, onSelectTime }) {
  const [timeGroups, setTimeGroups] = useState([]);
  
  // Group time slots by period (Lunch, Dinner)
  useEffect(() => {
    if (!timeSlots || timeSlots.length === 0) return;
    
    const lunchSlots = timeSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      const period = slot.time.includes('PM') ? 'PM' : 'AM';
      return period === 'AM' || (period === 'PM' && hour < 4);
    });
    
    const dinnerSlots = timeSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      const period = slot.time.includes('PM') ? 'PM' : 'AM';
      return period === 'PM' && hour >= 4;
    });
    
    setTimeGroups([
      { name: 'Lunch', slots: lunchSlots },
      { name: 'Dinner', slots: dinnerSlots }
    ]);
  }, [timeSlots]);
  
  return (
    <div>
      {timeGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6">
          <h3 className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">{group.name}</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {group.slots.map((slot, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.97 }}
                onClick={() => slot.available && onSelectTime(slot.time)}
                disabled={!slot.available}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium flex flex-col items-center justify-center
                  ${slot.available ? 'hover:bg-surface-100 dark:hover:bg-surface-700' : 'opacity-40 cursor-not-allowed'}
                  ${selectedTime === slot.time ? 'bg-primary text-white' : 'bg-white dark:bg-surface-800'}
                  border ${selectedTime === slot.time ? 'border-primary' : slot.available ? 'border-surface-200 dark:border-surface-700' : 'border-surface-200 dark:border-surface-700'}
                `}
              >
                {slot.time}
                {selectedTime === slot.time && <CheckIcon className="w-3 h-3 mt-1" />}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimeSlotPicker;