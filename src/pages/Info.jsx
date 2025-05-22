import { motion, useScroll, useTransform } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import { Swiper, SwiperSlide } from 'swiper/react';

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
const CalendarIcon = getIcon('calendar');
const UtensilsIcon = getIcon('utensils');
const WineIcon = getIcon('wine');
const AwardIcon = getIcon('award');

import 'swiper/css';

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
      },
      {
        name: 'Robert Williams',
        role: 'Restaurant Manager',
        image: 'https://source.unsplash.com/random/300x300/?manager,man',
        bio: 'With over a decade in fine dining management, Robert ensures that every guest receives exceptional service from the moment they arrive.'
      }
    ],
    gallery: [
      'https://source.unsplash.com/random/600x800/?restaurant,interior',
      'https://source.unsplash.com/random/600x800/?food,gourmet',
      'https://source.unsplash.com/random/600x800/?wine,glass',
      'https://source.unsplash.com/random/600x800/?chef,cooking',
      'https://source.unsplash.com/random/600x800/?dessert,plate',
      'https://source.unsplash.com/random/600x800/?dining,table'
    ],
    awards: [
      'Best Fine Dining Experience 2023',
      'Wine Spectator Award of Excellence',
      'Sustainable Restaurant Certification',
      'Local Food Champion Award'
    ]
  };
  
  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="parallax-container h-[70vh] mb-12">
        <motion.div className="parallax-layer" style={{ y }}>
          <img 
            src="https://source.unsplash.com/random/1920x1080/?restaurant,elegant,interior" 
            alt="Restaurant interior" 
            className="w-full h-[80vh] object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center">
          <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{restaurantInfo.name}</h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-white/90 text-lg md:text-xl font-light mb-8 leading-relaxed">
                {restaurantInfo.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#reserve" className="btn btn-primary px-8 py-3">Reserve a Table</a>
                <a href="#contact" className="btn bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:bg-white/20 px-8 py-3">Contact Us</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <section className="container-custom info-section" id="about">
        <motion.h2 
          className="info-section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Story
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-relaxed text-surface-700 dark:text-surface-300 mb-8">
              {restaurantInfo.longDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ChefHatIcon, title: "Culinary Excellence", description: "Award-winning chef with international experience" },
                { icon: HeartIcon, title: "Local Ingredients", description: "Sustainable, locally-sourced produce" },
                { icon: WineIcon, title: "Curated Wines", description: "Exceptional selection of wines from around the world" },
                { icon: AwardIcon, title: "Award Winning", description: "Recognized for our outstanding dining experience" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-white to-surface-100 dark:from-surface-800 dark:to-surface-900 rounded-xl p-6 shadow-sm border border-surface-200 dark:border-surface-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <feature.icon className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 p-4 border-l-4 border-primary bg-surface-50 dark:bg-surface-800/50 rounded-r-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="italic text-surface-700 dark:text-surface-300">
                "We believe that great food starts with great ingredients, passionate people, and a commitment to excellence in every detail."
              </p>
              <p className="font-medium mt-2">— Maria Rossi, Executive Chef</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://source.unsplash.com/random/800x1000/?restaurant,chef,cooking" 
                alt="Chef preparing food" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-2/3 aspect-video rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-surface-900">
              <img 
                src="https://source.unsplash.com/random/600x400/?food,gourmet,dish" 
                alt="Signature dish" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="container-custom info-section bg-surface-100/50 dark:bg-surface-800/20 py-16 -mx-4 px-4">
        <motion.h2 
          className="info-section-title text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Gallery
        </motion.h2>
        
        <div className="gallery-grid">
          {restaurantInfo.gallery.map((image, index) => (
            <motion.div 
              key={index}
              className="gallery-item aspect-square md:aspect-auto md:h-64 lg:h-80"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <img src={image} alt={`Gallery image ${index + 1}`} />
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Contact & Hours Section */}
      <section className="container-custom info-section" id="contact">
        <motion.h2 
          className="info-section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Visit Us
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white dark:bg-surface-900 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-64 relative">
              <img 
                src="https://source.unsplash.com/random/1200x800/?restaurant,map" 
                alt="Restaurant location" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-semibold">Our Location</h3>
                  <p className="text-white/90 flex items-center mt-2">
                    <MapPinIcon className="w-5 h-5 mr-2 text-primary" />
                    {restaurantInfo.address}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ClockIcon className="w-6 h-6 text-primary mr-2" />
                  Hours of Operation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {restaurantInfo.hours.map((item, index) => (
                    <motion.div 
                      key={item.day}
                      className="flex justify-between items-center p-3 rounded-lg bg-surface-50 dark:bg-surface-800"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <span className="font-medium">{item.day}</span>
                      <span className="text-surface-600 dark:text-surface-400">{item.hours}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary px-8 py-3"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-surface-900 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 space-y-6">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              
              <div className="space-y-4">
                <motion.div 
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-surface-600 dark:text-surface-400">{restaurantInfo.phone}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <MailIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-surface-600 dark:text-surface-400">{restaurantInfo.email}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact-icon">
                    <GlobeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Website</h4>
                    <p className="text-surface-600 dark:text-surface-400">{restaurantInfo.website}</p>
                  </div>
                </motion.div>
              </div>
            
              <div className="border-t border-surface-200 dark:border-surface-700 pt-6 mt-6">
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: InstagramIcon, url: `https://instagram.com/${restaurantInfo.social.instagram}`, label: "Instagram" },
                  { icon: FacebookIcon, url: `https://facebook.com/${restaurantInfo.social.facebook}`, label: "Facebook" },
                  { icon: TwitterIcon, url: `https://twitter.com/${restaurantInfo.social.twitter}`, label: "Twitter" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-800 dark:to-surface-900 p-4 rounded-full shadow-sm"
                    aria-label={social.label}
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <social.icon className="w-6 h-6 text-primary" />
                  </motion.a>
                ))}
              </div>
            </div>
              
              <div className="border-t border-surface-200 dark:border-surface-700 pt-6 mt-6">
                <h4 className="font-medium mb-4">Send Us a Message</h4>
                <form className="space-y-4">
                  <div>
                    <input type="text" placeholder="Your Name" className="input w-full" />
                  </div>
                  <div>
                    <input type="email" placeholder="Your Email" className="input w-full" />
                  </div>
                  <div>
                    <textarea placeholder="Your Message" rows="4" className="input w-full"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-full py-3">Send Message</button>
                </form>
              </div>
            </div>
          </motion.div>
          </div>
      </section>
      
      {/* Meet the Team Section */}
      <section className="container-custom info-section">
        <motion.h2 
          className="info-section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {restaurantInfo.team.map((member, index) => (
            <motion.div 
              key={member.name}
              className="team-card group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="team-card-image"
                />
              </div>
              <div className="team-card-content">
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-surface-600 dark:text-surface-400 text-sm">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="container-custom info-section bg-surface-100/50 dark:bg-surface-800/20 py-16 -mx-4 px-4">
        <motion.h2 
          className="info-section-title text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What Our Guests Say
        </motion.h2>
        
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="mt-8"
        >
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
            },
            {
              name: "Jennifer K.",
              date: "September 2023",
              text: "The attention to detail in both the food presentation and service is remarkable. One of the best dining experiences I've had in years.",
              rating: 5
            },
            {
              name: "David L.",
              date: "June 2023",
              text: "I brought clients here for a business dinner and everyone was impressed. Professional service and incredible food in an elegant setting.",
              rating: 4
            }
          ].map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="testimonial-card h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-surface-300 dark:text-surface-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="italic text-surface-700 dark:text-surface-300 mb-6 text-lg">
                  "{testimonial.text}"
                </p>
                <div className="mt-auto pt-4 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-surface-500 dark:text-surface-400">{testimonial.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      
      {/* Awards Section */}
      <section className="container-custom info-section">
        <motion.h2 
          className="info-section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Recognitions
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurantInfo.awards.map((award, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-surface-800 rounded-xl p-6 text-center shadow-sm border border-surface-200 dark:border-surface-700"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <AwardIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{award}</h3>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="container-custom info-section">
        <motion.h2 
          className="info-section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
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
            <motion.div 
              key={index} 
              className="bg-white dark:bg-surface-900 rounded-xl shadow-sm p-6 border border-surface-200 dark:border-surface-700"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3 className="font-semibold text-lg mb-3 flex items-start">
                <span className="text-primary mr-3 text-2xl font-bold">Q.</span>
                {faq.question}
              </h3>
              <p className="text-surface-600 dark:text-surface-400 pl-8">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container-custom mt-16 mb-8 text-center">
        <a href="#reserve" className="btn btn-primary text-lg px-8 py-3">Reserve Your Table Today</a>
      </section>
    </div>  
  );
}

export default Info;