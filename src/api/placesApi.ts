/*
 Setup Google Places API Helper
 */

 import axios from 'axios';
 import { API } from '../utils/constants';

 export interface PlaceSuggestion {
   description: string;
   place_id: string;
 }

 export interface PlaceDetails {
   place_id: string;
   name: string;
   address: string;
   location: {
     lat: number;
     lng: number;
   };
 }

 export const getPlaceSuggestions = async (input: string): Promise<PlaceSuggestion[]> => {
   if (!input) return [];

   const url = `${API.GET_PLACE_URL}${encodeURIComponent(input,)}&key=${API.GOOGLE_API_KEY}&types=geocode`;

   const response = await axios.get(url);
   if (response.data.status !== 'OK') {
     console.warn('Warning>> Google Places API Autocomplete error>>', response.data.status);
     return [];
   }

   return response.data.predictions.map((prediction: any) => ({
     description: prediction.description,
     place_id: prediction.place_id,
   }));
 };

 export const getPlaceDetails = async (placeId: string): Promise<PlaceDetails | null> => {
   const url = `${API.GET_PLACE_DETAILS_URL}${placeId}&key=${API.GOOGLE_API_KEY}`;

   const response = await axios.get(url);

   if (response.data.status !== 'OK') {
     console.warn('Warning>> Google Places API Details error>>', response.data.status);
     return null;
   }

   const result = response.data.result;
   const location = result.geometry.location;

   return {
     place_id: result.place_id,
     name: result.name,
     address: result.formatted_address,
     location,
   };
 };