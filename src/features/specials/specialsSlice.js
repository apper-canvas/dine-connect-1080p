import { createSlice } from '@reduxjs/toolkit';
import { getSpecials } from '../../utils/specialsData';

const initialState = {
  specials: getSpecials(),
  isLoading: false,
  notificationsEnabled: false,
  notificationCount: 0,
  archivedSpecials: [],
  error: null
};

export const specialsSlice = createSlice({
  name: 'specials',
  initialState,
  reducers: {
    fetchSpecialsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSpecialsSuccess: (state, action) => {
      state.specials = action.payload;
      state.isLoading = false;
    },
    fetchSpecialsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
      if (state.notificationsEnabled) {
        state.notificationCount = 0;
      }
    },
    incrementNotifications: (state) => {
      if (state.notificationsEnabled) {
        state.notificationCount += 1;
      }
    },
    clearNotifications: (state) => {
      state.notificationCount = 0;
    },
    archiveSpecial: (state, action) => {
      const specialId = action.payload;
      const specialToArchive = state.specials.find(special => special.id === specialId);
      
      if (specialToArchive) {
        state.archivedSpecials.push({...specialToArchive, archivedAt: new Date().toISOString()});
        state.specials = state.specials.filter(special => special.id !== specialId);
      }
    }
  }
});

export const {
  fetchSpecialsStart,
  fetchSpecialsSuccess,
  fetchSpecialsFailed,
  toggleNotifications,
  incrementNotifications,
  clearNotifications,
  archiveSpecial
} = specialsSlice.actions;

// Selectors
export const selectSpecials = (state) => state.specials.specials;
export const selectIsLoading = (state) => state.specials.isLoading;
export const selectNotificationsEnabled = (state) => state.specials.notificationsEnabled;
export const selectNotificationCount = (state) => state.specials.notificationCount;

export default specialsSlice.reducer;