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
import { Button, Card } from "react-native-paper";
import routes from "../../navigation/routes";
import AgentDeliveryJobs from "../../components/home/AgentDeliveryJobs";


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
      Alert.alert("Success!", "Job accepted successfully!\nSee route?");
      await handleFetch();
      console.log(response.data);
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
        <AgentDeliveryJobs deliveries={deliveries} />
      </View>
    </View>
  );
};

export default AgentHome;

const styles = StyleSheet.create({
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
