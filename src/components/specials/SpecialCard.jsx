import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import { archiveSpecial } from '../../features/specials/specialsSlice';
import { formatSpecialDate, calculateAvailabilityPercentage } from '../../utils/specialsData';
import CountdownTimer from './CountdownTimer';
import { getIcon } from '../../utils/iconUtils';

// Import icons
const ChevronRightIcon = getIcon('chevron-right');
const CalendarIcon = getIcon('calendar');
const UserIcon = getIcon('user');
const PlayIcon = getIcon('play');
const XIcon = getIcon('x');
const PauseIcon = getIcon('pause');
const BellIcon = getIcon('bell');

function SpecialCard({ special }) {
  const dispatch = useDispatch();
  const [showVideo, setShowVideo] = useState(false);
  const [notified, setNotified] = useState(false);
  
  const availability = calculateAvailabilityPercentage(special);
  const availabilityColor = 
    availability > 50 ? 'bg-green-500' : 
    availability > 20 ? 'bg-yellow-500' : 
    'bg-red-500';

  const handleReserveClick = () => {
    toast.success(`Reserved ${special.title}! You'll receive a confirmation shortly.`);
  };

  const handleVideoToggle = () => {
    setShowVideo(!showVideo);
  };

  const handleCountdownExpired = () => {
    toast.info(`${special.title} special has ended.`);
    dispatch(archiveSpecial(special.id));
  };

  const handleNotifyClick = () => {
    if (!notified) {
      setNotified(true);
      toast.success(`You'll be notified before ${special.title} starts!`);
    } else {
      setNotified(false);
      toast.info(`Notification for ${special.title} canceled.`);
    }
  };

  // Render each tag badge
  const renderTag = (tag) => {
    const tagClasses = {
      limited: 'special-badge-limited',
      new: 'special-badge-new',
      featured: 'special-badge-featured',
      seasonal: 'special-badge-seasonal',
      popular: 'special-badge-popular',
      weekend: 'special-badge-limited',
      dessert: 'special-badge-new'
    };
    
    return (
      <span key={tag} className={`special-badge ${tagClasses[tag] || 'special-badge-new'} mr-2 mb-2`}>
        {tag}
      </span>
    );
  };

  return (
    <motion.div
      className="specials-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {availability < 30 && (
        <div className="special-tag">
          Only {special.remainingAvailable} left!
        </div>
      )}
      
      <div className="flex flex-col h-full">
        {/* Image or Video Section */}
        <div className="relative rounded-lg overflow-hidden mb-4">
          {showVideo ? (
            <div className="chef-video-wrapper">
              <ReactPlayer 
                url={special.chefVideo} 
                width="100%" 
                height="100%" 
                controls
                light={special.image}
                playing={true}
              />
              <button 
                onClick={handleVideoToggle}
                className="absolute top-2 right-2 bg-surface-900/70 text-white p-1.5 rounded-full hover:bg-surface-800"
                aria-label="Close video"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative aspect-video">
              <img 
                src={special.image} 
                alt={special.title} 
                className="w-full h-full object-cover rounded-lg"
              />
              <button 
                onClick={handleVideoToggle}
                className="absolute inset-0 flex items-center justify-center bg-surface-900/30 hover:bg-surface-900/40 transition-colors"
                aria-label="Play chef introduction video"
              >
                <div className="bg-primary/90 p-3 rounded-full">
                  <PlayIcon className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-2 left-2 text-white text-sm font-medium bg-surface-900/70 px-2 py-1 rounded">
                  Chef {special.chefName}
                </span>
              </button>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <div className="mb-3 flex flex-wrap">
            {special.tags && special.tags.map(tag => renderTag(tag))}
          </div>
          
          <h3 className="text-xl font-bold mb-2">{special.title}</h3>
          <p className="text-surface-600 dark:text-surface-300 mb-4 flex-grow text-balance">{special.description}</p>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-lg text-primary">{special.price}</div>
              <CountdownTimer targetDate={special.dateRange.end} onExpire={handleCountdownExpired} />
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <button onClick={handleNotifyClick} className={`btn ${notified ? 'btn-outline' : 'btn-primary'} px-3`}>
                <BellIcon className="w-4 h-4 mr-1" /> {notified ? 'Notified' : 'Notify Me'}
              </button>
              <button onClick={handleReserveClick} className="btn btn-secondary">
                Reserve Now <ChevronRightIcon className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SpecialCard;