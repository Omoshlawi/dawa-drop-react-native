import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "../utils/colors";
import { IconButton } from "react-native-paper";

const SearchHeader = () => {
  return (
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
  );
};

export default SearchHeader;

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
