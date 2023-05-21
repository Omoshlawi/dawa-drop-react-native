import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import {
  Avatar,
  Card,
  Checkbox,
  DataTable,
  IconButton,
  List,
  Text,
  Button,
} from "react-native-paper";
import moment from "moment/moment";
import QuanterSizer from "../../components/input/QuanterSizer";
import routes from "../../navigation/routes";
import colors from "../../utils/colors";
import TriStatusBar from "../../components/display/TriStatusBar";
import { statusTorange } from "../../utils/helpers";
import { screenWidth } from "../../utils/contants";

const OrdersHistoryScreen = ({ navigation }) => {
  const { token } = useUserContext();
  const { getOrders } = useUser();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleFetch = async () => {
    setRefreshing(true);
    const response = await getOrders(token, { page_size: 100 });
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
            delivery_mode,
            time_slot,
            is_delivered,
            is_allocated,
            longitude,
            latitude,
            delivery,
            reach_out_phone_number,
          } = item;
          return (
            <Card
              style={styles.listItem}
              onPress={() =>
                navigation.navigate(routes.ORDERS_DETAIL_SCREEN, item)
              }
            >
              <Card.Title
                title={order_id}
                subtitle={`${moment(created_at).format(
                  "Do MMM YYYY, h:mm a"
                )} ${is_allocated ? "| Allocated" : ""} ${
                  is_delivered ? "| Delivered" : ""
                } `}
                subtitleStyle={{ color: colors.medium }}
                left={(props) => (
                  <Avatar.Icon
                    icon="shopping"
                    {...props}
                    style={{ backgroundColor: colors.light }}
                    color={is_delivered ? colors.success : colors.danger}
                  />
                )}
                right={(props) =>
                  is_delivered ? (
                    <IconButton icon="chevron-right" {...props} />
                  ) : (
                    <Button
                      icon="square-edit-outline"
                      textColor={colors.primary}
                      // disabled={!Boolean(agent_phone)}
                      onPress={() =>
                        navigation.navigate(routes.ORDER_NAVIGATION, {
                          screen: routes.ORDER_SCREEN,
                          params: item,
                        })
                      }
                    >
                      Edit
                    </Button>
                  )
                }
              />
              <Card.Actions></Card.Actions>
            </Card>
          );
        }}
      />
      {refreshing == false && orders.length == 0 && (
        <Text variant="titleLarge" style={styles.text}>
          No orders ....
        </Text>
      )}
    </View>
  );
};

export default OrdersHistoryScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginTop: 5,
    elevation: 0,
    borderRadius: 0,
  },
  screen: {
    marginBottom: 20,
    flex: 1,
    // backgroundColor: colors.background,
  },
  text: {
    textAlign: "center",
    position: "absolute",
    // backgroundColor: "red",
    width: screenWidth,
    color: colors.medium,
    padding: 30,
  },
});
