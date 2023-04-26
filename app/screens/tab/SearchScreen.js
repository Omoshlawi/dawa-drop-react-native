import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import colors from "../../utils/colors";
import { IconButton, Text } from "react-native-paper";

const sliderWidth = Dimensions.get("window").width * 0.63;

const SearchScreen = () => {
  return (
    <AppSafeArea>
      <View style={styles.header}>
        <View style={styles.search}>
          <TextInput style={styles.input} placeholder="Search..." />
          <IconButton
            style={styles.searchButton}
            icon="magnify"
            mode="outlined"
            iconColor={colors.white}
          />
        </View>
        <IconButton
          style={styles.filterButton}
          icon="filter"
          mode="outlined"
          iconColor={colors.white}
          size={27}
        />
      </View>
    </AppSafeArea>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.white,
    flexDirection: "row",
    borderRadius: 10,
    flex: 1,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  searchButton: {
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  filterButton: {
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  header: {
    margin: 10,
    flexDirection: "row",
  },
});
