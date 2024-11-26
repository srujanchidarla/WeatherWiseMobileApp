import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Correct import

// Define the type for each hourly forecast
interface HourlyForecast {
  dt: number; // Timestamp in seconds
  temp: number; // Temperature in °C
  weather: Array<{
    description: string; // Weather condition description
    icon: string; // Weather condition icon
  }>;
}

interface HourForecastProps {
  forecastData: HourlyForecast[];
}

const weatherIcons: { [key: string]: string } = {
  "clear sky": "weather-sunny",
  "few clouds": "cloud",
  "scattered clouds": "cloud",
  "broken clouds": "cloud",
  "shower rain": "weather-rainy",
  rain: "weather-rainy",
  thunderstorm: "weather-lightning",
  snow: "weather-snowy",
  mist: "weather-fog",
};

const FiveDayForecast: React.FC<HourForecastProps> = ({ forecastData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hourly Forecast</Text>
      <ScrollView horizontal style={styles.scrollView}>
        {forecastData.map((hour, index) => {
          const time = new Date(hour.dt * 1000); // Convert timestamp to Date
          const timeLabel = time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const iconName =
            weatherIcons[hour.weather[0].description] || "weather-sunny"; // Default to sunny if no match

          return (
            <View key={index} style={styles.card}>
              <Text style={styles.time}>{timeLabel}</Text>
              <MaterialCommunityIcons
                name={iconName}
                size={40}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.temp}>{hour.temp}°C</Text>
              <Text style={styles.condition}>
                {hour.weather[0].description}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  scrollView: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "secondary", // Tomato color for the card
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 120, // Fixed width for the card
  },
  time: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  icon: {
    marginVertical: 5,
  },
  temp: {
    color: "white",
    fontSize: 16,
  },
  condition: {
    color: "white",
    fontSize: 12,
  },
});

export default FiveDayForecast;
