/*
 Configure Redux Store
 */

import { configureStore } from '@reduxjs/toolkit';
import placesReducer from './placesSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
  },
});

// Types for `useSelector` and `useDispatch`
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;