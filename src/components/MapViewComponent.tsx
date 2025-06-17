/*
 Create MapView Component Showing Selected Place
 */

 import React from 'react';
 import { View, Text, StyleSheet } from 'react-native';
 import MapView, { Marker, Region } from 'react-native-maps';
 import { useSelector } from 'react-redux';
 import { RootState } from '../store';

 const initialRegion: Region = {
   latitude: 13.0827,
   longitude: 80.2707,
   latitudeDelta: 0.05,
   longitudeDelta: 0.05,
 };

 const MapViewComponent: React.FC = () => {
   const selectedPlace = useSelector(
     (state: RootState) => state.places.selectedPlace,
   );

   return (
     <View style={styles.container}>
       <MapView
         style={styles.map}
         region={
           selectedPlace
             ? {
                 latitude: selectedPlace.location.lat,
                 longitude: selectedPlace.location.lng,
                 latitudeDelta: 0.01,
                 longitudeDelta: 0.01,
               }
             : initialRegion
         }
         key={selectedPlace?.place_id} // Force re-render map on new selection
       >
         {selectedPlace && (
           <Marker
             coordinate={{
               latitude: selectedPlace.location.lat,
               longitude: selectedPlace.location.lng,
             }}
             title={selectedPlace.name}
             description={selectedPlace.address}
           />
         )}
       </MapView>

       {selectedPlace && (
         <View style={styles.detailsContainer}>
           <Text style={styles.placeName}>{selectedPlace.name}</Text>
           <Text style={styles.placeAddress}>{selectedPlace.address}</Text>
         </View>
       )}
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   map: {
     flex: 1,
   },
   detailsContainer: {
     position: 'absolute',
     bottom: 20,
     left: 10,
     right: 10,
     backgroundColor: 'rgba(255,255,255,0.9)',
     borderRadius: 8,
     padding: 15,
     elevation: 3,
   },
   placeName: {
     fontWeight: 'bold',
     fontSize: 16,
   },
   placeAddress: {
     marginTop: 2,
     color: '#555',
   },
 });

 export default MapViewComponent;