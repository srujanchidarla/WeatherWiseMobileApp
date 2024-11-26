import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, MapViewProps, Region } from "react-native-maps";

// Define the types for the props
interface City {
  lat: number;
  lon: number;
}

interface WeatherData {
  city: {
    coord: {
      lat: number;
      lon: number;
    };
  };
}

interface MapComponentProps {
  cities: City[]; // Array of cities with latitude and longitude
  weatherData: WeatherData | null; // Weather data to center the map on
}

const MapComponent: React.FC<MapComponentProps> = ({ cities, weatherData }) => {
  // Type the mapRef as a reference to MapView
  const mapRef = useRef<MapView | null>(null);

  // Default region if weatherData is unavailable
  const defaultRegion: Region = {
    latitude: 37.78825, // Default latitude (San Francisco)
    longitude: -122.4324, // Default longitude (San Francisco)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Update the map region based on weather data or cities
  useEffect(() => {
    if (mapRef.current && weatherData) {
      const { lat, lon } = weatherData.city.coord;
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [weatherData]);

  // Ensuring cities is an array and handling if no city is available
  const citiesList = Array.isArray(cities) && cities.length > 0 ? cities : [];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={
          weatherData
            ? {
                latitude: weatherData.city.coord.lat,
                longitude: weatherData.city.coord.lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : defaultRegion
        } // Set the initial region based on available weather data or fallback to default
      >
        {citiesList.map((city, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: city.lat, longitude: city.lon }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapComponent;
