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
import IconText from "../display/IconText";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";

const AgentDeliveryJobs = ({ deliveries }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.overlatyHeader}>
        <Text style={styles.title}>My Delivery Tasks</Text>
        <IconText
          icon="chevron-right"
          text="View All"
          left={false}
          onPress={() => {
            navigation.navigate(routes.ORDER_NAVIGATION, {
              screen: routes.ORDER_AGENT_DELIVERY_SCREEN,
            });
          }}
        />
      </View>
      <FlatList
        horizontal
        data={deliveries.filter(
          ({ status }) => status === null || status === "in_progress"
        )}
        keyExtractor={({ url }) => url}
        renderItem={({ item }) => {
          const { phone_number, address, status } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.ORDER_NAVIGATION, {
                  screen: routes.ORDER_AGENT_DELIVERY_ROUTE_SCREEN,
                  params: item,
                })
              }
            >
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
  container: {
    flex: 1,
  },
  text: {},
  card: {
    backgroundColor: colors.white,
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  img: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
  },
  overlatyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    padding: 5,
  },
});
