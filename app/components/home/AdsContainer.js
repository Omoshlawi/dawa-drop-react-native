import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AdsContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Health tips and encouragement to patient ads
      </Text>
    </View>
  );
};

export default AdsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    verticalAlign: "middle",
  },
});
