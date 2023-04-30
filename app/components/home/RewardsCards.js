import { StyleSheet, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import colors from "../../utils/colors";
import { Image } from "react-native";
const RewardsCards = ({ rewards }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Programs Rewards to win</Text>
      <FlatList
        data={rewards}
        contentContainerStyle={styles.programesContainer}
        keyExtractor={({ url }) => url}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          const {
            name,
            unit_point,
            image,
            description,
            point_value,
            members_count,
            program: { name: programe_name },
            is_default,
          } = item;
          return (
            <View style={styles.programeCard}>
              <Image
                style={styles.programImage}
                resizeMode="contain"
                source={{ uri: image }}
              />
              {/* <View style={styles.devidor} /> */}
              <View>
                <Text
                  variant="bodyLarge"
                  style={styles.title}
                  numberOfLines={1}
                >
                  {name}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default RewardsCards;

const styles = StyleSheet.create({
  programImage: {
    height: screenWidth * 0.2,
  },
  programesContainer: {
    // padding: 10,
  },
  programeCard: {
    // height: screenWidth * 0.35,
    width: screenWidth * 0.25,
    margin: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 5,
  },
  devidor: {
    borderWidth: 1,
    margin: 2,
    borderColor: colors.medium,
  },
  title: {
    color: colors.medium,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    color: colors.medium,
    fontSize: 12,
  },
  header: {
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  container: {
    // backgroundColor: colors.background,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
});
