import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { getIcon } from '../../utils/iconUtils';
import SpecialCard from './SpecialCard';
import { 
  selectSpecials, 
  selectNotificationsEnabled, 
  selectNotificationCount, 
  toggleNotifications,
  clearNotifications
} from '../../features/specials/specialsSlice';

const BellIcon = getIcon('bell');
const BellOffIcon = getIcon('bell-off');
const ArrowLeftIcon = getIcon('arrow-left');
const ArrowRightIcon = getIcon('arrow-right');

function DailySpecials() {
  const dispatch = useDispatch();
  const specials = useSelector(selectSpecials);
  const notificationsEnabled = useSelector(selectNotificationsEnabled);
  const notificationCount = useSelector(selectNotificationCount);
  const [permissionRequested, setPermissionRequested] = useState(false);

  const handleNotificationsToggle = async () => {
    if (!notificationsEnabled && !permissionRequested) {
      setPermissionRequested(true);
      
      try {
        // Check if the browser supports notifications
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          
          if (permission === 'granted') {
            dispatch(toggleNotifications());
            toast.success('You will now receive notifications about special offers!');
            
            // Example notification
            new Notification('Daily Specials Notifications Enabled', {
              body: 'You will now receive updates about our special offers.',
              icon: '/favicon.ico'
            });
          } else {
            toast.info('Please allow notifications to receive updates about special offers.');
          }
        } else {
          toast.info('Your browser does not support notifications.');
        }
      } catch (error) {
        toast.error('There was an error setting up notifications.');
        console.error('Notification error:', error);
      }
    } else {
      dispatch(toggleNotifications());
      dispatch(clearNotifications());
      toast.info('Special offers notifications disabled.');
    }
  };

  // Navigation arrows
  const SlideNextButton = () => {
    return (
      <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-surface-800/80 shadow-md -mr-3">
        <ArrowRightIcon className="w-5 h-5 text-surface-600 dark:text-surface-300" />
      </button>
    );
  };

  const SlidePrevButton = () => {
    return (
      <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-surface-800/80 shadow-md -ml-3">
        <ArrowLeftIcon className="w-5 h-5 text-surface-600 dark:text-surface-300" />
      </button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Daily Specials</h2>
        <button 
          onClick={handleNotificationsToggle}
          className="relative btn btn-outline text-sm"
          aria-label={notificationsEnabled ? "Disable notifications" : "Enable notifications"}
        >
          {notificationsEnabled ? <BellIcon className="w-4 h-4 mr-2" /> : <BellOffIcon className="w-4 h-4 mr-2" />}
          {notificationsEnabled ? 'Notifications On' : 'Get Notifications'}
          {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
        </button>
      </div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        pagination={{ clickable: true, dynamicBullets: true, el: '.swiper-special-pagination' }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="pb-10"
      >
        {specials.map(special => (
          <SwiperSlide key={special.id}>
            <SpecialCard special={special} />
          </SwiperSlide>
        ))}
        <div className="swiper-special-pagination mt-4 flex justify-center"></div>
        <SlideNextButton />
        <SlidePrevButton />
      </Swiper>
    </motion.div>
  );
}

export default DailySpecials;