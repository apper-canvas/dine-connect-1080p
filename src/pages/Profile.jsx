import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

// Import icons
const UserIcon = getIcon('user');
const CalendarIcon = getIcon('calendar');
const HeartIcon = getIcon('heart');
const BellIcon = getIcon('bell');
const CreditCardIcon = getIcon('credit-card');
const SaveIcon = getIcon('save');

function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    birthdate: '1985-07-15',
    allergies: 'Shellfish',
    dietaryPreferences: ['Vegetarian']
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  
  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten Free' },
    { id: 'dairy-free', label: 'Dairy Free' },
    { id: 'pescatarian', label: 'Pescatarian' },
    { id: 'keto', label: 'Keto' }
  ];
  
  const toggleDietaryPreference = (preference) => {
    setEditedProfile(prev => {
      if (prev.dietaryPreferences.includes(preference)) {
        return {
          ...prev,
          dietaryPreferences: prev.dietaryPreferences.filter(p => p !== preference)
        };
      } else {
        return {
          ...prev,
          dietaryPreferences: [...prev.dietaryPreferences, preference]
        };
      }
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'reservations', label: 'Past Reservations', icon: CalendarIcon },
    { id: 'favorites', label: 'Favorites', icon: HeartIcon },
    { id: 'payment', label: 'Payment Methods', icon: CreditCardIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon }
  ];
  
  const pastReservations = [
    { id: 1, date: 'May 15, 2023', time: '7:30 PM', guests: 2, table: 'Table 12' },
    { id: 2, date: 'April 22, 2023', time: '6:00 PM', guests: 4, table: 'Table 8' },
    { id: 3, date: 'March 10, 2023', time: '8:00 PM', guests: 2, table: 'Table 15' }
  ];
  
  const favoriteItems = [
    { id: 1, name: 'Truffle Risotto', category: 'Main Course', lastOrdered: 'May 15, 2023' },
    { id: 2, name: 'Chocolate Soufflé', category: 'Dessert', lastOrdered: 'April 22, 2023' },
    { id: 3, name: 'Signature Martini', category: 'Drinks', lastOrdered: 'March 10, 2023' }
  ];
  
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Profile</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 border-b border-surface-200 dark:border-surface-700 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex items-center whitespace-nowrap px-4 py-2 mr-2 rounded-t-lg border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {!isEditing ? (
                <button
                  className="btn btn-outline text-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  className="btn btn-primary text-sm flex items-center"
                  onClick={handleSave}
                >
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              )}
            </div>
            
            {!isEditing ? (
              // View Mode
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">First Name</p>
                  <p className="font-medium">{profile.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Last Name</p>
                  <p className="font-medium">{profile.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Phone</p>
                  <p className="font-medium">{profile.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Date of Birth</p>
                  <p className="font-medium">{new Date(profile.birthdate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Allergies</p>
                  <p className="font-medium">{profile.allergies || 'None'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-surface-500 dark:text-surface-400 mb-2">Dietary Preferences</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.dietaryPreferences.length > 0 ? (
                      profile.dietaryPreferences.map(pref => (
                        <div key={pref} className="bg-surface-100 dark:bg-surface-800 px-3 py-1 rounded-full text-sm">
                          {pref}
                        </div>
                      ))
                    ) : (
                      <p>No preferences set</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={editedProfile.firstName}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={editedProfile.lastName}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      value={editedProfile.birthdate}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="allergies" className="block text-sm font-medium mb-1">
                      Allergies
                    </label>
                    <input
                      type="text"
                      id="allergies"
                      name="allergies"
                      value={editedProfile.allergies}
                      onChange={handleInputChange}
                      placeholder="E.g., Nuts, Shellfish, etc."
                      className="input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Dietary Preferences
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {dietaryOptions.map(option => (
                      <div
                        key={option.id}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                          editedProfile.dietaryPreferences.includes(option.label)
                            ? 'bg-primary/10 border-primary/30 text-primary'
                            : 'border-surface-200 dark:border-surface-700'
                        }`}
                        onClick={() => toggleDietaryPreference(option.label)}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={editedProfile.dietaryPreferences.includes(option.label)}
                          onChange={() => {}} // Handled by the div's onClick
                        />
                        <span className="text-sm">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-surface-200 dark:border-surface-700">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setEditedProfile(profile);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary flex items-center"
                    onClick={handleSave}
                  >
                    <SaveIcon className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        
        {/* Past Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Your Past Reservations</h2>
              
              {pastReservations.length > 0 ? (
                <div className="space-y-4">
                  {pastReservations.map(reservation => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border border-surface-200 dark:border-surface-700"
                    >
                      <div>
                        <div className="flex items-center mb-2">
                          <CalendarIcon className="w-4 h-4 text-primary mr-2" />
                          <p className="font-medium">{reservation.date}</p>
                        </div>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {reservation.time} • {reservation.guests} guests • {reservation.table}
                        </p>
                      </div>
                      <div className="flex space-x-2 mt-4 sm:mt-0">
                        <button className="btn btn-outline text-sm">View Details</button>
                        <button className="btn btn-primary text-sm">Book Again</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full mb-4">
                    <CalendarIcon className="w-8 h-8 text-surface-400" />
                  </div>
                  <h3 className="text-lg font-medium">No Past Reservations</h3>
                  <p className="text-surface-500 dark:text-surface-400 mt-2 max-w-md mx-auto">
                    You haven't made any reservations with us yet. Would you like to book a table now?
                  </p>
                  <button className="btn btn-primary mt-4">Make a Reservation</button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Your Favorite Items</h2>
              
              {favoriteItems.length > 0 ? (
                <div className="space-y-4">
                  {favoriteItems.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-between items-center p-4 rounded-lg border border-surface-200 dark:border-surface-700"
                    >
                      <div className="flex items-center">
                        <div className="bg-surface-100 dark:bg-surface-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          <HeartIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-surface-600 dark:text-surface-400">
                            {item.category} • Last ordered: {item.lastOrdered}
                          </p>
                        </div>
                      </div>
                      <button className="btn btn-outline text-sm">Order Again</button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full mb-4">
                    <HeartIcon className="w-8 h-8 text-surface-400" />
                  </div>
                  <h3 className="text-lg font-medium">No Favorites Yet</h3>
                  <p className="text-surface-500 dark:text-surface-400 mt-2 max-w-md mx-auto">
                    You haven't added any items to your favorites yet. Browse our menu to find dishes you love!
                  </p>
                  <button className="btn btn-primary mt-4">View Menu</button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Other tabs would be implemented similarly */}
        {activeTab === 'payment' && (
          <div className="card text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full mb-4">
              <CreditCardIcon className="w-8 h-8 text-surface-400" />
            </div>
            <h3 className="text-lg font-medium">Payment Methods</h3>
            <p className="text-surface-500 dark:text-surface-400 mt-2 max-w-md mx-auto">
              This feature is coming soon! You'll be able to save payment methods for faster checkout.
            </p>
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="card text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full mb-4">
              <BellIcon className="w-8 h-8 text-surface-400" />
            </div>
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <p className="text-surface-500 dark:text-surface-400 mt-2 max-w-md mx-auto">
              This feature is coming soon! You'll be able to manage your notification preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;