import { StyleSheet, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import colors from "../../utils/colors";
import { Image } from "react-native";

const ProgrameCards = ({ awardPrograms }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Award Programs</Text>
      <FlatList
        data={awardPrograms}
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
            point_rate,
            members_count,
            is_default,
          } = item;
          return (
            <View style={styles.programeCard}>
              <Image
                style={styles.programImage}
                resizeMode="contain"
                source={{ uri: image }}
              />
              <View style={styles.devidor} />
              <View>
                <Text variant="headlineMedium" style={styles.title}>
                  {name}
                </Text>
                <View style={styles.row}>
                  <Text style={styles.text}>Members:</Text>
                  <Text style={[styles.text, styles.bold]}>
                    {members_count}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Rate:</Text>
                  <Text style={[styles.text, styles.bold]}>
                    Ksh.{point_rate}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Membership award:</Text>
                  <Text style={[styles.text, styles.bold]}>{unit_point}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProgrameCards;

const styles = StyleSheet.create({
  programImage: {
    height: screenWidth * 0.35,
  },
  programesContainer: {
    // padding: 10,
  },
  programeCard: {
    height: screenWidth * 0.61,
    width: screenWidth * 0.5,
    margin: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  devidor: {
    borderWidth: 1,
    margin: 2,
    borderColor: colors.medium,
  },
  title: {
    color: colors.medium,
    textAlign: "center",
  },
  text: {
    color: colors.medium,
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
