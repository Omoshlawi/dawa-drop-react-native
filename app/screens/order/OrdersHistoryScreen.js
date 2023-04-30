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
            <Card
              elevation={0}
              style={styles.orderCard}
              onPress={() =>
                navigation.navigate(routes.ORDERS_DETAIL_SCREEN, item)
              }
            >
              <Card.Title
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
                  <IconButton icon="chevron-right" {...props} />
                )}
              />
            </Card>
          );
        }}
      />
    </View>
  );
};

export default OrdersHistoryScreen;

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: colors.white,
    // marginHorizontal: 5,
    margin: 3,
    borderRadius: 20,
  },
  screen: {
    marginBottom: 20,
    flex: 1,
    backgroundColor: colors.background,
  },
});
