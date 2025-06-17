/*
 Create Home Screen Composing Components
 */

 import React, { useEffect } from 'react';
 import { SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
 import { useDispatch } from 'react-redux';
 import SearchBar from '../components/SearchBar';
 import MapViewComponent from '../components/MapViewComponent';
 import SearchHistory from '../components/SearchHistory';
 import { loadHistoryFromStorage } from '../redux/placesSlice';
 import { AppDispatch } from '../redux';

 const HomeScreen: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
     dispatch(loadHistoryFromStorage());
   }, [dispatch]);

   return (
     <SafeAreaView style={styles.container}>
       <KeyboardAvoidingView
         style={styles.container}
         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
       >
         <SearchBar />
         <SearchHistory />
         <MapViewComponent />
       </KeyboardAvoidingView>
     </SafeAreaView>
   );
 };

 const styles = StyleSheet.create({
   container: { flex: 1 },
 });

 export default HomeScreen;