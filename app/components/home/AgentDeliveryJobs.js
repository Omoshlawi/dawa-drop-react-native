import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { screenWidth } from "../../utils/contants";

const AgentDeliveryJobs = ({ deliveries }) => {
  return (
    <View>
      <FlatList
        horizontal
        data={deliveries.filter(
          ({ status }) => status === null || status === "in_progress"
        )}
        keyExtractor={({ url }) => url}
        renderItem={({ item }) => {
          const { phone_number, address, status } = item;
          return (
            <TouchableOpacity>
              <View style={styles.card}>
                <Image
                  style={styles.img}
                  resizeMode="contain"
                  source={require("./../../assets/delivery-truck.png")}
                />
                <Text style={styles.text}>{phone_number}</Text>
                <Text style={styles.text}>To {address}</Text>
                <Text style={styles.text}>
                  {status === "in_progress" ? "In progress" : "Pending"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AgentDeliveryJobs;

const styles = StyleSheet.create({
  text: {},
  card: {
    backgroundColor: colors.white,
    width: screenWidth * 0.3,
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },
});
