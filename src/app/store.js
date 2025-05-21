import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from '../features/reservations/reservationsSlice';
import specialsReducer from '../features/specials/specialsSlice';

export const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    specials: specialsReducer,
  },
});