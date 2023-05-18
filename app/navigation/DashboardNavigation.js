import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import DashBoard from "../screens/dashboard/DashBoard";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const DashboardNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.DASHBOARD_SCREEN}
        component={DashBoard}
        options={{ title: "Dashboard" }}
      />
    </Navigator>
  );
};

export default DashboardNavigation;

const styles = StyleSheet.create({});
