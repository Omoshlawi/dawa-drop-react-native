import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProgrameDetailScreen = ({ navigation, route }) => {
  const program = route.params;
  console.log(program);
  return (
    <View>
      <Text>ProgrameDetailScreen</Text>
    </View>
  );
};

export default ProgrameDetailScreen;

const styles = StyleSheet.create({});
