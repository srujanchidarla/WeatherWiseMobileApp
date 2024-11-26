import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Define types for the props
interface WeatherCardProps {
  weather: {
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  };
  city: string;
  country: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  city,
  country,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>
        {city}, {country}
      </Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text style={styles.condition}>{weather.weather[0].description}</Text>
      <View style={styles.details}>
        <Text style={styles.detail}>Humidity: {weather.main.humidity}%</Text>
        <Text style={styles.detail}>Wind Speed: {weather.wind.speed} km/h</Text>
        <Text style={styles.detail}>Pressure: {weather.main.pressure} hPa</Text>
      </View>
      <Image
        style={styles.icon}
        source={{
          uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#89f7fe",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 10,
    alignItems: "center",
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  temp: {
    fontSize: 32,
    color: "#FF6347", // Tomato color for temp
    marginBottom: 8,
  },
  condition: {
    fontSize: 18,
    marginBottom: 16,
  },
  details: {
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default WeatherCard;
