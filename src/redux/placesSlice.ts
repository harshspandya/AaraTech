/*
Create Redux Slice to Manage Search History
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Place {
  place_id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface PlacesState {
  history: Place[];
  selectedPlace: Place | null;
}

const initialState: PlacesState = {
  history: [],
  selectedPlace: null,
};

const HISTORY_KEY = '@places_search_history';

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setSelectedPlace(state, action: PayloadAction<Place>) {
      state.selectedPlace = action.payload;
    },

    addPlaceToHistory(state, action: PayloadAction<Place>) {
      // Avoid duplicates based on place_id
      const exists = state.history.find((place) => place.place_id === action.payload.place_id);

      if (!exists) {
        state.history = [action.payload, ...state.history];
        AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(state.history)).catch(e =>
          console.error('Error>> saving history>> ', e),
        );
      }
    },

    setHistory(state, action: PayloadAction<Place[]>) {
      state.history = action.payload;
    },

    clearHistory(state) {
      state.history = [];
      AsyncStorage.removeItem(HISTORY_KEY).catch(e => console.error('Error>> Clearing history from storage>> ', e),);
    },
  },
});

export const { setSelectedPlace, addPlaceToHistory, setHistory, clearHistory } = placesSlice.actions;

export const loadHistoryFromStorage = () => async (dispatch: any) => {
  try {
    const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);
    if (jsonValue != null) {
      const places = JSON.parse(jsonValue) as Place[];
      dispatch(setHistory(places));
    }
  } catch (e) {
    console.error('Error>> Failed to load history', e);
  }
};

export default placesSlice.reducer;