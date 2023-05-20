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

const DeliveryRequestsList = ({ requests }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.overlatyHeader}>
        <Text style={styles.title}>Delivery Requests</Text>
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
        data={requests}
        keyExtractor={({ url }) => url}
        renderItem={({ item }) => {
          const {
            destination,
            address,
            accept_url,
            delivery_mode,
            time_slot,
            created_at,
          } = item;
          return (
            <TouchableOpacity>
              <View style={styles.card}>
                <Image
                  style={styles.img}
                  resizeMode="contain"
                  source={require("./../../assets/delivery-truck.png")}
                />
                <Text style={styles.text}>To {address}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DeliveryRequestsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  overlatyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    padding: 5,
  },
});
