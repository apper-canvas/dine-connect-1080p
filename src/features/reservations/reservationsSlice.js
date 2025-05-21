import { createSlice } from '@reduxjs/toolkit';
import { generateTimeSlots } from '../../utils/dateUtils';
import { TABLES } from '../../utils/restaurantData';

const initialState = {
  selectedDate: null,
  selectedTime: null,
  selectedTable: null,
  partySize: 2,
  specialOccasion: null,
  customerInfo: {
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  },
  availableTables: [],
  availableTimeSlots: [],
  loading: false,
  error: null,
  currentStep: 1,
  reservationComplete: false
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      // When date changes, reset time and table selections
      state.selectedTime = null;
      state.selectedTable = null;
      // Generate available time slots for the selected date
      state.availableTimeSlots = generateTimeSlots(new Date(action.payload));
    },
    
    setSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
      state.selectedTable = null;
      
      // Simulate fetching available tables for the selected time
      // In a real app, this would be an API call
      const availableTables = TABLES.map(table => {
        // Randomly mark some tables as unavailable (for demo purposes)
        // In a real app, this data would come from the backend
        const isAvailable = !(
          // Make some tables specifically unavailable for demo variety
          (table.id === 3 && action.payload.includes('7:00')) ||
          (table.id === 10 && action.payload.includes('8:00')) ||
          // Randomly mark some others as unavailable
          (Math.random() > 0.8)
        );
        
        return {
          ...table,
          available: isAvailable,
          // If party size is too large for the table, it's not suitable
          suitable: isAvailable && table.seats >= state.partySize
        };
      });
      
      state.availableTables = availableTables;
    },
    
    setSelectedTable: (state, action) => {
      state.selectedTable = action.payload;
    },
    
    setPartySize: (state, action) => {
      state.partySize = action.payload;
      
      // Update table suitability based on new party size
      if (state.availableTables.length > 0) {
        state.availableTables = state.availableTables.map(table => ({
          ...table,
          suitable: table.available && table.seats >= action.payload
        }));
      }
      
      // If selected table is no longer suitable, deselect it
      if (state.selectedTable && state.selectedTable.seats < action.payload) {
        state.selectedTable = null;
      }
    },
    
    setSpecialOccasion: (state, action) => {
      state.specialOccasion = action.payload;
    },
    
    updateCustomerInfo: (state, action) => {
      state.customerInfo = {
        ...state.customerInfo,
        ...action.payload
      };
    },
    
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    
    completeReservation: (state) => {
      state.reservationComplete = true;
    },
    
    resetReservation: () => initialState
  }
});

export const {
  setSelectedDate, setSelectedTime, setSelectedTable,
  setPartySize, setSpecialOccasion, updateCustomerInfo,
  setCurrentStep, completeReservation, resetReservation
} = reservationsSlice.actions;

export const selectReservationsState = (state) => state.reservations;

export default reservationsSlice.reducer;