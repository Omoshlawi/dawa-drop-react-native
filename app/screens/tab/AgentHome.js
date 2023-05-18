import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import useLocation from "../../hooks/useLocation";
import { useDelivery } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import DeliveryRequest from "../../components/home/DeliveryRequest";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../../utils/colors";
import { screenWidth } from "../../utils/contants";
import IconText from "../../components/display/IconText";
import { Button, Card } from "react-native-paper";
import routes from "../../navigation/routes";

const AgentHome = ({ navigation }) => {
  const location = useLocation();
  const { getDeliveryRequests, getDeliveries } = useDelivery();
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const { token } = useUserContext();

  const handleFetch = async () => {
    let response = await getDeliveryRequests(token, {});
    if (response.ok) {
      setDeliveryRequests(response.data.results);
    }
    response = await getDeliveries(token, {});
    if (response.ok) {
      setDeliveries(response.data.results);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleFetch();
    }, [])
  );
  return (
    <View style={styles.screen}>
      <DeliveryRequest request={deliveryRequests} setVisible={() => {}} />
      <View style={styles.overlay}>
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
    </View>
  );
};

export default AgentHome;

const styles = StyleSheet.create({
  text: {},
  overlatyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    padding: 5,
  },
  screen: {
    flex: 1,
  },
  img: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
  },
  card: {
    backgroundColor: colors.white,
    width: screenWidth * 0.3,
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "30%",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    backgroundColor: colors.light1,
    padding: 20,
  },
});
