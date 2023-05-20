import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import useLocation from "../../hooks/useLocation";
import { useDelivery, useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import DeliveryRequest from "../../components/home/DeliveryRequest";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../../utils/colors";
import { screenWidth } from "../../utils/contants";
import IconText from "../../components/display/IconText";
import { Button, Card, List } from "react-native-paper";
import routes from "../../navigation/routes";
import AgentDeliveryJobs from "../../components/home/AgentDeliveryJobs";
import DeliveryRequestsList from "../../components/home/DeliveryRequestsList";
const AgentHome = ({ navigation }) => {
  const location = useLocation();
  const { getDeliveryRequests, getDeliveries } = useDelivery();
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const { token } = useUserContext();
  const { postUserInfo } = useUser();

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

  const handleAcceptJob = async (acceptUrl) => {
    const response = await postUserInfo({
      url: acceptUrl,
      token,
      data: location,
      multipart: false,
    });
    if (response.ok) {
      await handleFetch();
      Alert.alert("Success!", "Job accepted successfully!\nSee route?", [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate(routes.ORDER_NAVIGATION, {
              screen: routes.ORDER_AGENT_DELIVERY_ROUTE_SCREEN,
              params: response.data,
            });
          },
        },
      ]);
    } else {
      console.log(response.data);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleFetch();
    }, [])
  );
  return (
    <View style={styles.screen}>
      <DeliveryRequest
        request={deliveryRequests}
        onAcceptRequest={handleAcceptJob}
      />
      <View style={styles.overlay}>
        <AgentDeliveryJobs deliveries={deliveries} />
        {/* <DeliveryRequestsList requests={deliveryRequests} /> */}
      </View>
    </View>
  );
};

export default AgentHome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "25%",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    backgroundColor: colors.light1,
    padding: 20,
  },
});
