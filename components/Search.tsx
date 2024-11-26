import React, { useState } from "react";
import { TextInput, Button, StyleSheet, View } from "react-native";

interface SearchComponentProps {
  onSearch: (cityName: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>("");

  // Handle input change
  const handleChange = (text: string) => {
    setCity(text);
  };

  // Trigger the search when the user presses "Done" or "Enter"
  const handleSubmit = () => {
    if (city.trim() !== "") {
      onSearch(city);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter City Name"
        value={city}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit} // Triggers onSubmit when "Enter" is pressed
        returnKeyType="done" // Sets the keyboard "Done" button
      />
      <Button title="Search" onPress={() => onSearch(city)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
  input: {
    color: "white",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    width: "80%",
  },
});

export default SearchComponent;
