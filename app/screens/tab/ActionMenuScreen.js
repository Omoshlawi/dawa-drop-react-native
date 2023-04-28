import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../../utils/colors";
import AppSafeArea from "../../components/AppSafeArea";
import { Surface, Text } from "react-native-paper";

const menItems = [
  {
    title: "Order Medicine",
    image: require("../../assets/medicine.png"),
    id: 1,
  },
  {
    title: "Checkout Delivery",
    image: require("../../assets/delivery-truck.png"),
    id: 2,
  },
  { title: "Order History", image: require("../../assets/clock.png"), id: 3 },
  {
    title: "Pending Orders",
    image: require("../../assets/pending_1.png"),
    id: 4,
  },
  {
    title: "Redeeme Points",
    image: require("../../assets/box.png"),
    id: 5,
  },
  {
    title: "Request Tranfer",
    image: require("../../assets/migration.png"),
    id: 6,
  },
];
const itemWidth = Dimensions.get("window").width / 2 - 5;
const ActionMenuScreen = () => {
  return (
    <AppSafeArea>
      <View style={styles.screen}>
        <View>
          <View style={styles.pointsContainer}>
            <Surface style={styles.surface}>
              <Text style={styles.pointsText}>******</Text>
              <TouchableOpacity style={styles.pointButton}>
                <Text>Show points</Text>
              </TouchableOpacity>
            </Surface>
          </View>
          {/* Menu */}
          <FlatList
            data={menItems}
            keyExtractor={({ id }) => id}
            contentContainerStyle={styles.itemsContainer}
            numColumns={2}
            renderItem={({ item }) => {
              const { title, image } = item;
              return (
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Image
                      resizeMode="contain"
                      style={styles.image}
                      source={image}
                    />
                    <Text variant="titleMedium" style={styles.title}>
                      {title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TouchableOpacity>
          <View style={styles.dashBoard}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require("../../assets/bar-graph.png")}
            />
            <Text variant="titleLarge" style={styles.title}>
              Dashboard
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </AppSafeArea>
  );
};

export default ActionMenuScreen;

const styles = StyleSheet.create({
  itemsContainer: {
    padding: 10,
    alignItems: "center",
  },
  item: {
    width: itemWidth - 5,
    height: 100,
    backgroundColor: colors.background,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: itemWidth,
    height: 60,
  },
  title: {
    color: colors.medium,
  },
  screen: {
    // backgroundColor: colors.white,
    flex: 1,
  },
  dashBoard: {
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    margin: 5,
  },
  pointsContainer: {
    margin: 20,
    alignItems: "center",
  },
  pointsText: {
    padding: 15,
    flex: 1,
    textAlign: "center",
    verticalAlign: "middle",
  },
  pointButton: {
    backgroundColor: colors.secondary,
    padding: 15,
  },
  surface: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 10,
    width: itemWidth,
    borderRadius: 10,
    overflow: "hidden",
  },
});
