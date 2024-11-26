import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2024 WeatherWise. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: "#333",
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});

export default Footer;
