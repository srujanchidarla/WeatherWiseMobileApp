import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { Ionicons } from "react-native-vector-icons"; // For weather icons
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SearchComponent from "@/components/Search";
import WeatherCard from "@/components/WeatherCard";
import HourForecast from "@/components/HourForecast";
import FiveDayForecast from "@/components/FiveDayForecast";
import MapComponent from "@/components/MapComponent";

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("");

  // Function to fetch weather data based on city name
  const fetchWeatherByCityName = useCallback(async (cityName: string) => {
    const apiKey = "529ff5d7c974c523fa5ec5e81b0dbf59"; // Replace with your OpenWeather API key

    setLoading(true);
    setError(null);
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    try {
      const geoResponse = await axios.get(geocodeUrl);
      const geoData = geoResponse.data;
      if (geoData && geoData.length > 0) {
        const { lat, lon } = geoData[0];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const weatherResponse = await axios.get(weatherUrl);
        setWeatherData(weatherResponse.data);
        setCity(cityName);
      } else {
        setError("City not found");
        setWeatherData(null);
      }
    } catch (error) {
      setError("Error fetching data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch weather data using latitude and longitude
  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    const apiKey = "529ff5d7c974c523fa5ec5e81b0dbf59"; // Replace with your OpenWeather API key

    setLoading(true);
    setError(null);

    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const weatherResponse = await axios.get(weatherUrl);

      // Reverse geocoding to get the city name from coordinates
      const reverseGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
      const reverseGeoResponse = await axios.get(reverseGeoUrl);
      const cityName = reverseGeoResponse.data[0]?.name || "Unknown Location";

      setWeatherData(weatherResponse.data);
      setCity(cityName); // Update city with the dynamically fetched name
    } catch (error) {
      setError("Error fetching weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch location and weather on initial load
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Location permission is required");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    fetchWeatherByCoords(location.coords.latitude, location.coords.longitude); // Now using coordinates to fetch weather data
  };

  // Effect to fetch current location data when the component loads
  useEffect(() => {
    getCurrentLocation(); // Get location when component loads
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/weather.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Welcome to WeatherWise!
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <SearchComponent onSearch={fetchWeatherByCityName} />

      {/* Button to trigger current location fetch, styled to be green */}
      <View style={styles.buttonContainer}>
        <Button
          title="Get Current Location"
          onPress={getCurrentLocation}
          color="green" // Set button color to green
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : weatherData ? (
        <>
          <WeatherCard
            weather={weatherData.list[0]}
            city={city}
            country={weatherData.city.country}
          />
          <HourForecast forecastData={weatherData.list.slice(0, 12)} />
          <FiveDayForecast forecastList={weatherData.list} />
          <MapComponent
            cities={weatherData.city.coord}
            weatherData={weatherData}
          />
        </>
      ) : null}
    </ParallaxScrollView>
  );
};

const globalStyles = StyleSheet.create({
  centerAlign: {
    justifyContent: "center",
    alignItems: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignContent: "center",
    marginTop: 20,
    ...globalStyles.centerAlign,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  reactLogo: {
    marginTop: 60,
    width: 150, // Reduced the size of the logo
    height: 150,
    alignItems: "center",
    alignSelf: "center", // Center the logo horizontally
  },
  loading: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  // Added styles for button container
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
