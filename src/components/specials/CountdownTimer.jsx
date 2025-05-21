import { useState, useEffect } from 'react';
import { formatCountdown } from '../../utils/dateUtils';
import { getIcon } from '../../utils/iconUtils';

const ClockIcon = getIcon('clock');

/**
 * CountdownTimer component displays a countdown to a target date
 * @param {Object} props Component props
 * @param {Date} props.targetDate The target date to countdown to
 * @param {Function} props.onExpire Callback function when countdown expires
 */
function CountdownTimer({ targetDate, onExpire }) {
  const [countdown, setCountdown] = useState(formatCountdown(targetDate));

  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      const newCountdown = formatCountdown(targetDate);
      setCountdown(newCountdown);
      
      // Check if countdown has expired
      if (newCountdown.expired) {
        clearInterval(timer);
        if (onExpire) onExpire();
      }
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  return (
    <div className="special-timer">
      <ClockIcon className="w-4 h-4 mr-1.5 text-accent" />
      <span>
        {countdown.formatted}
      </span>
    </div>
  );
}

export default CountdownTimer;