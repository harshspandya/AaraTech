/*
 Create Search History List Component
 */

 import React from 'react';
 import { StyleSheet, FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
 import { useSelector, useDispatch } from 'react-redux';
 import { RootState, AppDispatch } from '../redux';
 import { setSelectedPlace, clearHistory } from '../redux/placesSlice';

 const SearchHistory: React.FC = () => {
   const history = useSelector((state: RootState) => state.places.history);
   const dispatch = useDispatch<AppDispatch>();

   const onSelectHistoryItem = (place: typeof history[0]) => {
     dispatch(setSelectedPlace(place));
   };

   const confirmClearHistory = () => {
       Alert.alert(
         'Clear History',
         'Are you sure you want to clear all search history?',
         [
           { text: 'Cancel', style: 'cancel' },
           {
             text: 'Clear',
             style: 'destructive',
             onPress: () => dispatch(clearHistory()),
           },
         ],
         { cancelable: true },
       );
     };

   if (history.length === 0) {
     return (
       <View style={styles.emptyContainer}>
         <Text style={styles.emptyText}>No search history</Text>
       </View>
     );
   }

   return (
     <View style={styles.container}>
       <View style={styles.headerRow}>
               <Text style={styles.title}>Search History</Text>
               <TouchableOpacity
                 onPress={confirmClearHistory}
                 activeOpacity={0.7}
               >
                 <Text style={styles.clearButtonText}>Clear</Text>
               </TouchableOpacity>
             </View>
       <FlatList
         data={history}
         keyExtractor={(item) => item.place_id}
         renderItem={({ item }) => (
           <TouchableOpacity
             onPress={() => onSelectHistoryItem(item)}
             style={styles.historyItem}
           >
             <Text style={styles.name}>{item.name}</Text>
             <Text style={styles.address}>{item.address}</Text>
           </TouchableOpacity>
         )}
         ItemSeparatorComponent={() => <View style={styles.separator} />}
       />
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     maxHeight: 150,
     margin: 10,
     backgroundColor: '#f9f9f9',
     borderRadius: 6,
     padding: 10,
     elevation: 1,
   },
   headerRow: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: 8,
     alignItems: 'center',
   },
   title: {
     fontWeight: 'bold',
   },
   clearButtonText: {
     color: '#d9534f',
     fontWeight: '600',
   },
   historyItem: {
     paddingVertical: 8,
   },
   name: {
     fontWeight: '600',
   },
   address: {
     color: '#555',
   },
   separator: {
     height: 1,
     backgroundColor: '#ddd',
   },
   emptyContainer: {
     alignItems: 'center',
     marginVertical: 20,
   },
   emptyText: {
     color: '#777',
     fontStyle: 'italic',
   },
 });

 export default SearchHistory;