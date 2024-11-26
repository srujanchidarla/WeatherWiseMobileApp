import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Correct import

// Define the type for each daily forecast
interface DailyForecast {
  dt: number; // Timestamp in seconds
  main: {
    temp: number; // Temperature in °C
    humidity: number; // Humidity in %
  };
  weather: Array<{
    description: string; // Weather condition description
    main: string; // Main weather condition (e.g., rain, snow)
  }>;
}

interface FiveDayForecastProps {
  forecastList: DailyForecast[];
  cityName: string;
}

const weatherIcons = {
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

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({
  forecastList,
  cityName,
}) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>5-Day Forecast for {cityName}</Text>
      <ScrollView horizontal style={styles.scrollView}>
        {forecastList.map((day, index) => {
          const weatherCondition = day.weather[0].description.toLowerCase();
          const iconName = weatherIcons[weatherCondition] || "weather-sunny"; // Default to sunny if no match
          const formattedDate = formatDate(day.dt);

          return (
            <View key={index} style={styles.card}>
              <Text style={styles.date}>{formattedDate}</Text>
              <MaterialCommunityIcons
                name={iconName}
                size={40}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.temp}>{day.main.temp}°C</Text>
              <Text style={styles.condition}>{day.weather[0].main}</Text>
              <Text style={styles.humidity}>
                Humidity: {day.main.humidity}%
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
    backgroundColor: "grey", // Tomato color for the card
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 120, // Fixed width for the card
  },
  date: {
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
    fontSize: 14,
  },
  humidity: {
    color: "white",
    fontSize: 12,
  },
});

export default FiveDayForecast;
