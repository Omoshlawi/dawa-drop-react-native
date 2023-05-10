import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  DataTable,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import moment from "moment/moment";
import QuanterSizer from "../../components/input/QuanterSizer";
import routes from "../../navigation/routes";
import colors from "../../utils/colors";
import StatusBar from "../../components/display/TriStatusBar";
import { callNumber, statusTorange } from "../../utils/helpers";
import Logo from "./../../components/Logo";
import { screenWidth } from "../../utils/contants";

const PendingOrdersScreen = ({ navigation }) => {
  const { token } = useUserContext();
  const { getPendingOrders } = useUser();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleFetch = async () => {
    setRefreshing(true);
    const response = await getPendingOrders(token, { page_size: 100 });
    setRefreshing(false);
    if (!response.ok) {
      return console.log("OrderScreen: ", response.problem, response.data);
    }
    const {
      data: { results },
    } = response;
    setOrders(results);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View style={styles.screen}>
      <FlatList
        data={orders}
        refreshing={refreshing}
        onRefresh={handleFetch}
        keyExtractor={({ url }) => url}
        renderItem={({ item }) => {
          const {
            order_id,
            created_at,
            is_delivered,
            is_approved,
            delivery: {
              agent: { phone_number: agent_phone },
              doctor: { phone_number: doctor_phone },
              trip,
            },
            longitude,
            latitude,
            reach_out_phone_number,
            date_of_depletion,
            national_id,
          } = item;
          return (
            <Card
              style={styles.orderCard}
              onPress={() =>
                navigation.navigate(routes.ORDERS_DETAIL_SCREEN, item)
              }
            >
              <Card.Title
                //   style={styles.orderCard}
                title={order_id}
                subtitle={`${moment(created_at).format(
                  "Do MMM YYYY, h:mm a"
                )} ${is_approved ? "| Aprooved" : ""} ${
                  is_delivered ? "| Delivered" : ""
                } `}
                subtitleVariant="bodySmall"
                subtitleStyle={{ color: colors.medium }}
                left={(props) => (
                  <Avatar.Icon
                    icon="shopping"
                    {...props}
                    style={{ backgroundColor: colors.light }}
                    color={is_delivered ? colors.success : colors.danger}
                  />
                )}
                right={(props) => (
                  <IconButton
                    icon="truck-delivery"
                    iconColor={colors.primary}
                    {...props}
                    disabled={!Boolean(trip)}
                    onPress={() =>
                      navigation.navigate(routes.TRACK_DELIVERY_SCREEN, item)
                    }
                  />
                )}
              />
              <Card.Content>
                <Card.Actions>
                  <Button
                    icon="phone"
                    textColor={colors.primary}
                    disabled={!Boolean(agent_phone)}
                    onPress={() => callNumber(agent_phone)}
                  >
                    Call Agent
                  </Button>
                  <Button
                    icon="phone"
                    disabled={!Boolean(doctor_phone)}
                    buttonColor={colors.primary}
                    onPress={() => callNumber(doctor_phone)}
                  >
                    Call Doctor
                  </Button>
                </Card.Actions>
              </Card.Content>
            </Card>
          );
        }}
      />
      {refreshing == false && orders.length == 0 && (
        <Text variant="titleLarge" style={styles.text}>
          No pending orders ....
        </Text>
      )}
    </View>
  );
};

export default PendingOrdersScreen;

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
  text: {
    textAlign: "center",
    position: "absolute",
    // backgroundColor: "red",
    width: screenWidth,
    color: colors.medium,
    padding: 30,
  },
  screen: {
    flex: 1,
    zIndex: 0,
  },
});
