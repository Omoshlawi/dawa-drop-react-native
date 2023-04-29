import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../utils/colors";

const TriStatusBar = ({ status, barThickness = 10 }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          { height: barThickness },
          styles.first,
          status === 1 && { backgroundColor: colors.success },
          status === 2 && { backgroundColor: colors.success },
          status === 3 && { backgroundColor: colors.success },
        ]}
      />
      {status == 1 && (
        <View style={styles.percentageContainer}>
          <Text style={styles.percentage}>25%</Text>
        </View>
      )}
      <View
        style={[
          styles.progress,
          { height: barThickness },
          styles.second,
          status === 1 && { backgroundColor: colors.danger },
          status === 2 && { backgroundColor: colors.success },
          status === 3 && { backgroundColor: colors.success },
        ]}
      />
      {status == 2 && (
        <View style={styles.percentageContainer}>
          <Text style={styles.percentage}>75%</Text>
        </View>
      )}
      <View
        style={[
          styles.progress,
          { height: barThickness },
          styles.third,
          status === 1 && { backgroundColor: colors.danger },
          status === 2 && { backgroundColor: colors.danger },
          status === 3 && { backgroundColor: colors.success },
        ]}
      />
      {status == 3 && (
        <View style={styles.percentageContainer}>
          <Text style={styles.percentage}>100%</Text>
        </View>
      )}
    </View>
  );
};

export default TriStatusBar;

const styles = StyleSheet.create({
  progress: {
    flex: 1,
  },
  first: {
    backgroundColor: colors.danger,
  },
  second: {
    backgroundColor: colors.warning,
  },
  third: {
    backgroundColor: colors.success,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentageContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  percentage: {
    textAlign: "center",
  },
});
