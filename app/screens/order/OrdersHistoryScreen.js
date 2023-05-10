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
            is_delivered,
            is_approved,
            longitude,
            latitude,
            reach_out_phone_number,
            date_of_depletion,
            national_id,
          } = item;
          return (
            <List.Item
              style={styles.listItem}
              onPress={() =>
                navigation.navigate(routes.ORDERS_DETAIL_SCREEN, item)
              }
              title={order_id}
              description={`${moment(created_at).format(
                "Do MMM YYYY, h:mm a"
              )} ${is_approved ? "| Aprooved" : ""} ${
                is_delivered ? "| Delivered" : ""
              } `}
              descriptionStyle={{ color: colors.medium }}
              left={(props) => (
                <Avatar.Icon
                  icon="shopping"
                  {...props}
                  style={{ backgroundColor: colors.light }}
                  color={is_delivered ? colors.success : colors.danger}
                />
              )}
              right={(props) => <IconButton icon="chevron-right" {...props} />}
            />
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
