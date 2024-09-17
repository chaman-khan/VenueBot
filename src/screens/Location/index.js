import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Family} from '../../assets/FontFamily';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../theme';
const {width, height} = Dimensions.get('screen');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const Location = ({navigation, route}) => {
  const location = route.params;
  const GOOGLE_MAPS_APIKEY = 'AIzaSyA-4CW3RJxhVCSTrImtIdOJ-4k9zXMZQF4';
  const origin = location.origin;
  const destination = location.destination;
  const distance = location.distance;
  const [showRoute, setShowRoute] = useState(false);
  const [dottedLineCoordinates, setDottedLineCoordinates] = React.useState([]);
  return (
    <View>
      <MapView
        style={{width: '100%', height: '100%'}}
        provider="google"
        key={'AIzaSyA-4CW3RJxhVCSTrImtIdOJ-4k9zXMZQF4'}
        initialRegion={{
          latitude: destination.latitude,
          longitude: destination.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        mapType="standard"
        userInterfaceStyle="light"
        showsUserLocation={true}
        userLocationUpdateInterval={5000}
        ref={ref => {
          this.mapView = ref;
        }}>
        {showRoute && (
          <>
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="blue"
              onReady={result => {
                const coordinates = result.coordinates;

                // Calculate the point where the solid line should stop
                const solidLineEndIndex = coordinates.length - 2;
                const solidLineCoordinates = coordinates.slice(
                  0,
                  solidLineEndIndex + 1,
                );
                const dottedLineCoordinates =
                  coordinates.slice(solidLineEndIndex);

                setDottedLineCoordinates(dottedLineCoordinates);

                this.mapView.fitToCoordinates(coordinates, {
                  edgePadding: {
                    right: 20,
                    bottom: 20,
                    left: 20,
                    top: 20,
                  },
                });
              }}
              onError={errorMessage => {
                console.log('Error: ', errorMessage);
              }}
            />
            <Polyline
              coordinates={dottedLineCoordinates}
              strokeWidth={3}
              strokeColor="blue"
              lineDashPattern={[1, 10]}
            />
          </>
        )}

        <Marker draggable coordinate={destination} title="Destiation" />
      </MapView>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowRoute(true)}
        style={styles.btn}>
        <Text style={{fontSize: 20, fontFamily: Family, color: 'white'}}>
          Get Direction
        </Text>
      </TouchableOpacity>
      {showRoute && <Text style={styles.distance}>{distance} METERS</Text>}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', margin: 20}}>
        <Entypo name="arrow-long-left" size={30} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    width: '70%',
    height: 50,
    backgroundColor: Colors.primary,
    marginTop: height - 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  distance: {
    color: Colors.primary,
    position: 'absolute',
    padding: 20,
    alignSelf: 'center',
    marginTop: height - 150,
    fontSize: 20,
    fontFamily: Family,
  },
});
export default Location;
