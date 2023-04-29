import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "../screens/order/OrderScreen";
import routes from "./routes";
import CheckoutScreen from "../screens/order/CheckoutScreen";
import OrdersHistoryScreen from "../screens/order/OrdersHistoryScreen";
import OrderDetailScreen from "../screens/order/OrderDetailScreen";

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
    </Navigator>
  );
};

export default OrderNavigation;

const styles = StyleSheet.create({});
