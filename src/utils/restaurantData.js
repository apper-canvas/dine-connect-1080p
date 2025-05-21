// Restaurant layout and table data

// Table shapes (for rendering in floor plan)
export const TABLE_SHAPES = {
  ROUND: 'round',
  RECTANGLE: 'rectangle',
  SQUARE: 'square',
  BOOTH: 'booth'
};

// Table areas/sections in the restaurant
export const TABLE_AREAS = {
  MAIN: 'main',
  WINDOW: 'window',
  PATIO: 'patio',
  BAR: 'bar',
  PRIVATE: 'private'
};

// List of all tables in the restaurant
export const TABLES = [
  // Main dining area
  { id: 1, name: 'Table 1', shape: TABLE_SHAPES.ROUND, seats: 2, area: TABLE_AREAS.WINDOW, x: 100, y: 80 },
  { id: 2, name: 'Table 2', shape: TABLE_SHAPES.ROUND, seats: 2, area: TABLE_AREAS.WINDOW, x: 180, y: 80 },
  { id: 3, name: 'Table 3', shape: TABLE_SHAPES.ROUND, seats: 4, area: TABLE_AREAS.WINDOW, x: 260, y: 80 },
  { id: 4, name: 'Table 4', shape: TABLE_SHAPES.ROUND, seats: 4, area: TABLE_AREAS.MAIN, x: 100, y: 160 },
  { id: 5, name: 'Table 5', shape: TABLE_SHAPES.ROUND, seats: 4, area: TABLE_AREAS.MAIN, x: 180, y: 160 },
  { id: 6, name: 'Table 6', shape: TABLE_SHAPES.ROUND, seats: 4, area: TABLE_AREAS.MAIN, x: 260, y: 160 },
  
  // Booths along wall
  { id: 7, name: 'Booth 1', shape: TABLE_SHAPES.BOOTH, seats: 4, area: TABLE_AREAS.MAIN, x: 40, y: 220 },
  { id: 8, name: 'Booth 2', shape: TABLE_SHAPES.BOOTH, seats: 4, area: TABLE_AREAS.MAIN, x: 40, y: 300 },
  { id: 9, name: 'Booth 3', shape: TABLE_SHAPES.BOOTH, seats: 4, area: TABLE_AREAS.MAIN, x: 40, y: 380 },
  
  // Large tables
  { id: 10, name: 'Table 10', shape: TABLE_SHAPES.RECTANGLE, seats: 6, area: TABLE_AREAS.MAIN, x: 180, y: 250 },
  { id: 11, name: 'Table 11', shape: TABLE_SHAPES.RECTANGLE, seats: 6, area: TABLE_AREAS.MAIN, x: 180, y: 350 },
  
  // Bar seating
  { id: 12, name: 'Bar 1', shape: TABLE_SHAPES.SQUARE, seats: 2, area: TABLE_AREAS.BAR, x: 340, y: 220 },
  { id: 13, name: 'Bar 2', shape: TABLE_SHAPES.SQUARE, seats: 2, area: TABLE_AREAS.BAR, x: 340, y: 260 },
  { id: 14, name: 'Bar 3', shape: TABLE_SHAPES.SQUARE, seats: 2, area: TABLE_AREAS.BAR, x: 340, y: 300 },
  { id: 15, name: 'Bar 4', shape: TABLE_SHAPES.SQUARE, seats: 2, area: TABLE_AREAS.BAR, x: 340, y: 340 },
  
  // Patio tables
  { id: 16, name: 'Patio 1', shape: TABLE_SHAPES.ROUND, seats: 4, area: TABLE_AREAS.PATIO, x: 100, y: 450 },
  { id: 17, name: 'Patio 2', shape: TABLE_SHAPES.ROUND, seats: 4, area: TABLE_AREAS.PATIO, x: 180, y: 450 },
  { id: 18, name: 'Patio 3', shape: TABLE_SHAPES.ROUND, seats: 4, area: TABLE_AREAS.PATIO, x: 260, y: 450 },
  
  // Private room
  { id: 19, name: 'Private', shape: TABLE_SHAPES.RECTANGLE, seats: 10, area: TABLE_AREAS.PRIVATE, x: 250, y: 550 }
];

// Restaurant sections with descriptions
export const RESTAURANT_SECTIONS = [
  {
    id: TABLE_AREAS.WINDOW,
    name: 'Window',
    description: 'Enjoy your meal with a view of Gourmet Avenue'
  },
  {
    id: TABLE_AREAS.MAIN,
    name: 'Main Dining',
    description: 'The heart of our restaurant with a warm, inviting atmosphere'
  },
  {
    id: TABLE_AREAS.BAR,
    name: 'Bar Area',
    description: 'Casual seating near our full-service bar'
  },
  {
    id: TABLE_AREAS.PATIO,
    name: 'Patio',
    description: 'Outdoor seating with heaters for year-round comfort'
  },
  {
    id: TABLE_AREAS.PRIVATE,
    name: 'Private Room',
    description: 'Exclusive space for larger groups and special events'
  }
];

// Time slots - These would typically come from a backend API
export const BUSINESS_HOURS = {
  mondayToThursday: {
    open: '11:00 AM',
    close: '10:00 PM',
    interval: 30 // minutes between reservations
  },
  fridayToSaturday: {
    open: '11:00 AM',
    close: '11:00 PM',
    interval: 30
  },
  sunday: {
    open: '11:00 AM',
    close: '9:00 PM',
    interval: 30
  }
};

// Special occasions
export const SPECIAL_OCCASIONS = [
  { id: 'birthday', name: 'Birthday' },
  { id: 'anniversary', name: 'Anniversary' },
  { id: 'date', name: 'Date Night' },
  { id: 'business', name: 'Business Meal' },
  { id: 'graduation', name: 'Graduation' },
  { id: 'other', name: 'Other Special Occasion' }
];