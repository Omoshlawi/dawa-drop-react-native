import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../utils/colors";

const DeliveryRequestCallout = ({ request }) => {
  const { delivery_mode, time_slot, address } = request;
  return (
    <View>
      <View style={styles.container}>
        <Avatar.Icon icon="account" />
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="truck-cargo-container"
            />
            <Text>{delivery_mode.mode}</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons style={styles.icon} name="clock" />
            <Text>{time_slot.slot}</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="information-variant"
            />
            <Text>{address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryRequestCallout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: screenWidth * 0.5,
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  contentContainer: {},
  row: {
    paddingLeft: 10,
    flexDirection: "row",
    paddingVertical: 2,
  },
  icon: {
    paddingRight: 5,
  },
});
