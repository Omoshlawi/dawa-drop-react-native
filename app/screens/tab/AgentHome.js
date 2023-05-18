import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useLocation from "../../hooks/useLocation";
import { useDelivery } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import DeliveryRequest from "../../components/home/DeliveryRequest";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../../utils/colors";

const AgentHome = () => {
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
        <FlatList
          horizontal
          data={deliveries}
          keyExtractor={({ url }) => url}
          renderItem={({ item }) => {
            const {} = item;
            return (
              <TouchableOpacity>
                <View>
                  <Text>Delivery oNE</Text>
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
    backgroundColor: colors.white,
    padding: 20,
  },
});
