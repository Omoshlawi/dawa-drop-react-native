import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "../screens/order/OrderScreen";
import routes from "./routes";
import CheckoutScreen from "../screens/order/CheckoutScreen";
import OrdersHistoryScreen from "../screens/order/OrdersHistoryScreen";
import OrderDetailScreen from "../screens/order/OrderDetailScreen";
import PendingOrdersScreen from "../screens/order/PendingOrdersScreen";
import TrackDeliveryScreen from "../screens/order/TrackDeliveryScreen";
import DeliveriesScreen from "../screens/order/DeliveriesScreen";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const OrderNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.ORDER_SCREEN}
        component={OrderScreen}
        options={{ title: "" }}
      />
      <Screen
        name={routes.CHECHOUT_SCREEN}
        component={CheckoutScreen}
        options={{ title: "" }}
      />
      <Screen
        name={routes.ORDERS_HISTORY_SCREEN}
        component={OrdersHistoryScreen}
        options={{ title: "Orders History" }}
      />
      <Screen
        name={routes.ORDERS_DETAIL_SCREEN}
        component={OrderDetailScreen}
        options={{ title: "Orders Detail" }}
      />
      <Screen
        name={routes.PENDING_ORDERS_SCREEN}
        component={PendingOrdersScreen}
        options={{ title: "Pending Orders" }}
      />
      <Screen
        name={routes.TRACK_DELIVERY_SCREEN}
        component={TrackDeliveryScreen}
        options={({ route }) => ({ title: route.params.delivery.delivery_id })}
      />
      <Screen
        name={routes.ORDER_AGENT_DELIVERY_SCREEN}
        component={DeliveriesScreen}
        options={{
          title: "",
        }}
      />
    </Navigator>
  );
};

export default OrderNavigation;

const styles = StyleSheet.create({});
