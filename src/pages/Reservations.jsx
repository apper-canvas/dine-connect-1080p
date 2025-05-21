import { useState } from 'react';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import { getIcon } from '../utils/iconUtils';

// Import icons
const MapPinIcon = getIcon('map-pin');
const PhoneIcon = getIcon('phone');
const ClockIcon = getIcon('clock');
const ChevronRightIcon = getIcon('chevron-right');

function Reservations() {
  const [showPolicy, setShowPolicy] = useState(false);
  
  return (
    <div className="py-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Make a Reservation</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Reserve your table at Bistro Elegante for a memorable dining experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MainFeature />
          </div>
          
          <div className="space-y-6">
            {/* Restaurant Information */}
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Restaurant Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-surface-600 dark:text-surface-400 text-sm">
                      123 Gourmet Avenue<br />
                      Foodville, CA 90210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <PhoneIcon className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-surface-600 dark:text-surface-400 text-sm">
                      (555) 123-4567<br />
                      reservations@bistroelegante.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ClockIcon className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <div className="text-surface-600 dark:text-surface-400 text-sm grid grid-cols-2 gap-x-2">
                      <p>Monday - Thursday:</p>
                      <p>11:00 AM - 10:00 PM</p>
                      <p>Friday - Saturday:</p>
                      <p>11:00 AM - 11:00 PM</p>
                      <p>Sunday:</p>
                      <p>11:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cancellation Policy */}
            <div className="card">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowPolicy(!showPolicy)}>
                <h3 className="font-semibold text-lg">Cancellation Policy</h3>
                <ChevronRightIcon className={`w-5 h-5 transition-transform ${showPolicy ? 'rotate-90' : ''}`} />
              </div>
              
              {showPolicy && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-surface-600 dark:text-surface-400 text-sm"
                >
                  <p className="mb-2">
                    We understand that plans can change. Our cancellation policy is as follows:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Reservations can be cancelled or modified up to 3 hours prior to your scheduled time without any charge.</li>
                    <li>For cancellations made less than 3 hours in advance, a fee of $25 per person may apply.</li>
                    <li>No-shows will be charged a fee of $25 per person.</li>
                    <li>For special events and large group bookings (8+ people), cancellation policies may vary.</li>
                  </ul>
                  <p className="mt-2">
                    To cancel or modify your reservation, please call us directly at (555) 123-4567.
                  </p>
                </motion.div>
              )}
            </div>
            
            {/* Map Preview */}
            <div className="card p-0 overflow-hidden">
              <img 
                src="https://source.unsplash.com/random/600x300/?map" 
                alt="Restaurant location map" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium">Bistro Elegante</h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm">123 Gourmet Avenue, Foodville</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full mt-3 text-sm"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservations;