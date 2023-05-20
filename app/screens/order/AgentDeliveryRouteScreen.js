import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AgentDeliveryRouteScreen = ({ navigation, route }) => {
  const delivery = route.params;
  console.log(delivery);

  return (
    <View>
      <Text>AgentDeliveryRouteScreen</Text>
    </View>
  );
};

export default AgentDeliveryRouteScreen;

const styles = StyleSheet.create({});
