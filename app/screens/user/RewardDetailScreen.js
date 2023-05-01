import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RewardDetailScreen = ({ navigation, route }) => {
  const reward = route.params;
  console.log(reward);
  return (
    <View>
      <Text>RewardDetailScreen</Text>
    </View>
  );
};

export default RewardDetailScreen;

const styles = StyleSheet.create({});
