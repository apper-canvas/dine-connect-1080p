import { addDays, addHours, format } from 'date-fns';

// Helper to create dates for specials
const createDateRange = (startOffsetDays, startOffsetHours, endOffsetDays, endOffsetHours) => {
  const now = new Date();
  return {
    start: addHours(addDays(now, startOffsetDays), startOffsetHours),
    end: addHours(addDays(now, endOffsetDays), endOffsetHours)
  };
};

// Generate test data
export const getSpecials = () => [
  {
    id: 'sp1',
    title: "Chef's Truffle Tasting Menu",
    description: "Experience our exclusive 5-course tasting menu featuring seasonal truffles from Italy, paired with premium wines. Limited availability.",
    price: "$85 per person",
    type: "limited",
    image: "https://source.unsplash.com/random/600x400/?truffle,food",
    chefVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    chefName: "Marco Bellucci",
    dateRange: createDateRange(0, 2, 2, 22),
    totalAvailable: 20,
    remainingAvailable: 8,
    tags: ["featured", "limited"]
  },
  {
    id: 'sp2',
    title: "Seafood Tower Thursdays",
    description: "Our magnificent seafood tower featuring the freshest catch of the day, including lobster, crab, oysters, and more. Perfect for sharing.",
    price: "$120 for two",
    type: "weekly",
    image: "https://source.unsplash.com/random/600x400/?seafood,tower",
    chefVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    chefName: "Sophia Chen",
    dateRange: createDateRange(1, 0, 1, 23),
    totalAvailable: 15,
    remainingAvailable: 12,
    tags: ["new", "popular"]
  },
  {
    id: 'sp3',
    title: "Summer Berry Pavlova",
    description: "Celebrate summer with our special pavlova featuring seasonal berries, chantilly cream, and edible flowers. Available for a limited time.",
    price: "$14",
    type: "seasonal",
    image: "https://source.unsplash.com/random/600x400/?pavlova,dessert",
    chefVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    chefName: "Emma Reyes",
    dateRange: createDateRange(0, 1, 7, 23),
    totalAvailable: 40,
    remainingAvailable: 28,
    tags: ["seasonal", "dessert"]
  },
  {
    id: 'sp4',
    title: "BBQ Wagyu Beef Special",
    description: "Premium A5 Wagyu beef expertly grilled with our signature spice rub, served with truffle mashed potatoes and seasonal vegetables.",
    price: "$65",
    type: "weekend",
    image: "https://source.unsplash.com/random/600x400/?wagyu,beef",
    chefVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    chefName: "James Peterson",
    dateRange: createDateRange(2, 0, 3, 23),
    totalAvailable: 30,
    remainingAvailable: 17,
    tags: ["featured", "popular"]
  },
  {
    id: 'sp5',
    title: "Rosé All Day Brunch",
    description: "Enjoy our special weekend brunch with unlimited rosé, featuring avocado toast, eggs benedict, and our famous brioche french toast.",
    price: "$45 per person",
    type: "weekend",
    image: "https://source.unsplash.com/random/600x400/?brunch,rose",
    chefVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    chefName: "Isabella Martinez",
    dateRange: createDateRange(3, 10, 3, 15),
    totalAvailable: 50,
    remainingAvailable: 22,
    tags: ["new", "weekend"]
  }
];

// Format date for display
export const formatSpecialDate = (date) => {
  return format(date, "MMM d, h:mm a");
};

// Check if a special is active
export const isSpecialActive = (special) => {
  const now = new Date();
  return now >= special.dateRange.start && now <= special.dateRange.end;
};

// Calculate percentage of availability remaining
export const calculateAvailabilityPercentage = (special) => {
  return Math.round((special.remainingAvailable / special.totalAvailable) * 100);
};