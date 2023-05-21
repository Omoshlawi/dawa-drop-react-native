import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import colors from "../../utils/colors";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";

const ProgrameCards = ({ awardPrograms, backgroundColor = colors.light }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header} variant="titleMedium">
        Award Programs
      </Text>
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.USER_NAVIGATION, {
                  screen: routes.PROGRAM_DETAIL_SCREEN,
                  params: item,
                })
              }
            >
              <View style={[styles.programeCard, { backgroundColor }]}>
                <Image
                  style={styles.programImage}
                  resizeMode="contain"
                  source={{ uri: image }}
                />
                {/* <View style={styles.devidor} /> */}
                <View style={{ padding: 10 }}>
                  <Text variant="titleMedium" style={styles.title}>
                    {name}
                  </Text>
                  <Text style={styles.text}>{members_count} Members</Text>
                  <Text style={styles.text}>Ksh.{point_rate} Rate</Text>
                  <Text style={styles.text}>
                    {unit_point} points award
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ProgrameCards;

const styles = StyleSheet.create({
  programImage: {
    height: screenWidth * 0.1,
  },
  programesContainer: {
    // padding: 10,
  },
  programeCard: {
    // height: screenWidth * 0.35,
    width: screenWidth * 0.3,
    margin: 5,
    borderRadius: 30,
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
    textAlign: "center",
  },
  header: {
    paddingHorizontal: 20,
    fontWeight: "bold",
    paddingTop: 5,
    color: colors.white,
  },
  container: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
});
