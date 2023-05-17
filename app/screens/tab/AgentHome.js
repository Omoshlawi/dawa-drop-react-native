import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useLocation from "../../hooks/useLocation";
import { useDelivery } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import DeliveryRequest from "../../components/home/DeliveryRequest";
import { useFocusEffect } from "@react-navigation/native";

const AgentHome = () => {
  const location = useLocation();
  const { getDeliveryRequests } = useDelivery();
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const { token } = useUserContext();

  const handleFetch = async () => {
    const response = await getDeliveryRequests(token, {});
    if (response.ok) {
      setDeliveryRequests(response.data.results);
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
    </View>
  );
};

export default AgentHome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
