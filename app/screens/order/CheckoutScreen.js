import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TabBar from "../../components/tab/TabBar";
import colors from "../../utils/colors";
import { chechoutTabs } from "../../utils/contants";

const CheckoutScreen = () => {
  return (
    <View>
      <TabBar
        tabItems={chechoutTabs}
        activeIndex={0}
        activeBackgroundColor={colors.secondary}
      />
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
