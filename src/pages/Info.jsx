import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

// Import icons
const ClockIcon = getIcon('clock');
const MapPinIcon = getIcon('map-pin');
const PhoneIcon = getIcon('phone');
const MailIcon = getIcon('mail');
const GlobeIcon = getIcon('globe');
const InstagramIcon = getIcon('instagram');
const FacebookIcon = getIcon('facebook');
const TwitterIcon = getIcon('twitter');
const ChefHatIcon = getIcon('chef-hat');
const UsersIcon = getIcon('users');
const HeartIcon = getIcon('heart');
const StarIcon = getIcon('star');

function Info() {
  // Restaurant information
  const restaurantInfo = {
    name: 'Bistro Elegante',
    description: 'Experience authentic cuisine in an elegant yet comfortable setting. Our award-winning chef combines traditional techniques with modern innovations to create unforgettable dining experiences.',
    longDescription: 'Founded in 2010, Bistro Elegante has become a cornerstone of the local culinary scene. We focus on sustainable, locally-sourced ingredients to create dishes that honor traditional recipes while incorporating contemporary flavors and techniques. Our wine selection has been curated to complement our menu perfectly, with options from both well-known and boutique vineyards around the world.',
    hours: [
      { day: 'Monday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Tuesday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Wednesday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Thursday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Friday', hours: '11:00 AM - 11:00 PM' },
      { day: 'Saturday', hours: '11:00 AM - 11:00 PM' },
      { day: 'Sunday', hours: '11:00 AM - 9:00 PM' },
    ],
    address: '123 Gourmet Avenue, Foodville, CA 90210',
    phone: '(555) 123-4567',
    email: 'info@bistroelegante.com',
    website: 'www.bistroelegante.com',
    social: {
      instagram: 'bistro_elegante',
      facebook: 'BistroElegante',
      twitter: 'BistroElegante'
    },
    team: [
      {
        name: 'Maria Rossi',
        role: 'Executive Chef',
        image: 'https://source.unsplash.com/random/300x300/?chef,woman',
        bio: 'With over 15 years of culinary experience in top restaurants across Europe, Chef Maria brings authentic flavors and innovative techniques to every dish.'
      },
      {
        name: 'James Chen',
        role: 'Sommelier',
        image: 'https://source.unsplash.com/random/300x300/?sommelier,man',
        bio: 'Certified by the Court of Master Sommeliers, James has curated our award-winning wine list to perfectly complement our menu.'
      },
      {
        name: 'Sarah Johnson',
        role: 'Pastry Chef',
        image: 'https://source.unsplash.com/random/300x300/?pastry,chef',
        bio: 'A graduate of Le Cordon Bleu, Sarah creates beautiful desserts that balance classic techniques with unexpected flavors.'
      }
    ]
  };
  
  return (
    <div className="py-4 space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden h-64 md:h-80 mb-8">
        <img 
          src="https://source.unsplash.com/random/1200x600/?restaurant,elegant" 
          alt="Restaurant ambiance" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-white text-3xl md:text-4xl font-bold">{restaurantInfo.name}</h1>
            <p className="text-white/90 mt-2 max-w-2xl">{restaurantInfo.description}</p>
          </motion.div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-surface-600 dark:text-surface-400">
            {restaurantInfo.longDescription}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-primary/10 dark:bg-primary/5 rounded-lg p-4 flex flex-col items-center text-center">
              <ChefHatIcon className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-medium">Culinary Excellence</h3>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                Award-winning chef with international experience
              </p>
            </div>
            
            <div className="bg-primary/10 dark:bg-primary/5 rounded-lg p-4 flex flex-col items-center text-center">
              <HeartIcon className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-medium">Local Ingredients</h3>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                Sustainable, locally-sourced produce
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <img 
            src="https://source.unsplash.com/random/400x600/?restaurant,food" 
            alt="Restaurant dish" 
            className="w-full h-56 md:h-72 object-cover rounded-lg"
          />
          <img 
            src="https://source.unsplash.com/random/400x600/?restaurant,chef" 
            alt="Restaurant chef" 
            className="w-full h-56 md:h-72 object-cover rounded-lg mt-8" 
          />
        </div>
      </div>
      
      {/* Contact & Hours Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Hours & Location</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium flex items-center mb-3">
                <ClockIcon className="w-5 h-5 text-primary mr-2" />
                Hours of Operation
              </h3>
              <div className="grid grid-cols-7 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {restaurantInfo.hours.map(item => (
                  <div key={item.day} className="contents">
                    <span className="font-medium col-span-3 md:col-span-1">{item.day}</span>
                    <span className="col-span-4 md:col-span-1">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium flex items-center mb-3">
                <MapPinIcon className="w-5 h-5 text-primary mr-2" />
                Location
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                {restaurantInfo.address}
              </p>
              <div className="mt-3 h-40 bg-surface-100 dark:bg-surface-800 rounded-lg relative overflow-hidden">
                <img 
                  src="https://source.unsplash.com/random/600x300/?map" 
                  alt="Restaurant location map" 
                  className="w-full h-full object-cover"
                />
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 btn btn-primary text-sm"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <PhoneIcon className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-surface-600 dark:text-surface-400">
                  {restaurantInfo.phone}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MailIcon className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-surface-600 dark:text-surface-400">
                  {restaurantInfo.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <GlobeIcon className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Website</p>
                <p className="text-surface-600 dark:text-surface-400">
                  {restaurantInfo.website}
                </p>
              </div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-surface-200 dark:border-surface-700">
              <p className="font-medium mb-3">Follow Us</p>
              <div className="flex space-x-3">
                <a 
                  href={`https://instagram.com/${restaurantInfo.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 p-3 rounded-full"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a 
                  href={`https://facebook.com/${restaurantInfo.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 p-3 rounded-full"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a 
                  href={`https://twitter.com/${restaurantInfo.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 p-3 rounded-full"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-surface-200 dark:border-surface-700">
              <p className="font-medium mb-3">Questions or Feedback?</p>
              <button className="btn btn-primary w-full">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Meet the Team Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantInfo.team.map((member, index) => (
            <motion.div 
              key={member.name}
              className="card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <div className="h-60 -mx-5 -mt-5 mb-4 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                  <p className="text-white/80 text-sm">{member.role}</p>
                </div>
              </div>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">What Our Guests Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Emily R.",
              date: "August 2023",
              text: "The atmosphere is perfect for a date night. We loved the seasonal menu and the wine pairings were excellent. Will definitely be coming back!",
              rating: 5
            },
            {
              name: "Michael T.",
              date: "July 2023",
              text: "Exceptional service and food that exceeded our expectations. The chef's tasting menu was a culinary journey worth experiencing.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? 'text-yellow-400' : 'text-surface-300 dark:text-surface-600'
                    }`}
                  />
                ))}
              </div>
              <p className="italic text-surface-600 dark:text-surface-300 mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex justify-between items-center">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-surface-500 dark:text-surface-400">{testimonial.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {[
            {
              question: "Do you require reservations?",
              answer: "While we accept walk-ins based on availability, we highly recommend making reservations, especially for weekend dining. You can make a reservation through our website or by calling us."
            },
            {
              question: "Is there a dress code?",
              answer: "We maintain a smart casual dress code. While we don't require formal attire, we ask that guests refrain from wearing athletic wear, beachwear, or overly casual clothing."
            },
            {
              question: "Do you accommodate dietary restrictions?",
              answer: "Yes, we're happy to accommodate various dietary needs including vegetarian, vegan, gluten-free, and allergies. Please inform us of any restrictions when making your reservation."
            },
            {
              question: "Is parking available?",
              answer: "We offer complimentary valet parking for our guests. There is also street parking and a public parking garage within a block of the restaurant."
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-surface-200 dark:border-surface-700 pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
              <p className="text-surface-600 dark:text-surface-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Info;