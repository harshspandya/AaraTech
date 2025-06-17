/*
 Create Search Bar with Autocomplete Suggestions
 */

 import React, { useState, useEffect } from 'react';
 import {
   View,
   TextInput,
   FlatList,
   Text,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
 } from 'react-native';
 import { getPlaceSuggestions, getPlaceDetails, PlaceDetails, PlaceSuggestion } from '../api/placesApi';
 import { useDispatch } from 'react-redux';
 import { addPlaceToHistory, setSelectedPlace } from '../redux/placesSlice';
 import { AppDispatch } from '../redux';

 const SearchBar: React.FC = () => {
   const [query, setQuery] = useState('');
   const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
   const [loading, setLoading] = useState(false);
   const [isFocused, setIsFocused] = useState(false);
   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
     if (query.length < 3) {
       setSuggestions([]);
       return;
     }

     const fetchSuggestions = async () => {
       setLoading(true);

       const places = await getPlaceSuggestions(query);

       setSuggestions(places);

       setLoading(false);
     };

     const debounceTimeout = setTimeout(fetchSuggestions, 400);

     return () => clearTimeout(debounceTimeout);
   }, [query]);

   const onSuggestionPress = async (place: PlaceSuggestion) => {
     setQuery('');
     setSuggestions([]);
     setLoading(true);

     const details = await getPlaceDetails(place.place_id);

     if (details) {
       dispatch(setSelectedPlace(details));
       dispatch(addPlaceToHistory(details));
     }
     setLoading(false);
   };

   return (
     <View>
       <TextInput
         style={styles.input}
         placeholder="Search Places"
         placeholderTextColor="#000"
         value={query}
         onChangeText={setQuery}
         onFocus={() => setIsFocused(true)}
         onBlur={() => setIsFocused(false)}
       />

       {loading && <ActivityIndicator size="small" color="#333" />}

       {isFocused == true && suggestions.length > 0 && (
         <FlatList
           keyboardShouldPersistTaps="handled"
           data={suggestions}
           keyExtractor={(item) => item.place_id}
           renderItem={({ item }) => (
             <TouchableOpacity onPress={() => onSuggestionPress(item)} style={styles.suggestionItem}>
               <Text>{item.description}</Text>
             </TouchableOpacity>
           )}
           style={styles.suggestionsList}
         />
       )}
     </View>
   );
 };

 const styles = StyleSheet.create({
   input: {
     backgroundColor: '#fff',
     padding: 10,
     borderRadius: 4,
     elevation: 2,
     margin: 10,
   },
   suggestionsList: {
     backgroundColor: '#fff',
     maxHeight: 150,
     marginHorizontal: 10,
     borderRadius: 4,
     elevation: 2,
   },
   suggestionItem: {
     padding: 10,
     borderBottomWidth: 1,
     borderColor: '#eee',
   },
 });

 export default SearchBar;