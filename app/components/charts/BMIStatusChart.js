import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  ProgressChart,
  PieChart,
} from "react-native-chart-kit";
import { Avatar, Card, IconButton } from "react-native-paper";
import colors from "../../utils/colors";
import { screenHeight, screenWidth } from "../../utils/contants";

const BMIStatusChart = () => {
  return (
    <Card style={styles.card}>
      <Card.Title
        titleVariant="titleLarge"
        title="BMI Status"
        subtitle="BMI status scales and range"
        subtitleStyle={styles.subTitle}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={require("../../assets/weight-loss.png")}
            style={styles.icon}
          />
        )}
        right={(props) => (
          <IconButton
            {...props}
            icon="more"
            onPress={() => setShowDescription(!showDescription)}
          />
        )}
      />
      <ProgressChart
        data={{
          labels: ["Underweight", "Normal weight", "Overweight", "Obese"],
          data: [0.5, 0.7, 0.5, 0.3],
        }}
        width={screenWidth * 0.95} // from react-native
        height={screenHeight * 0.2}
        strokeWidth={16}
        radius={32}
        chartConfig={weightChartConfig}
        style={styles.weights}
        hideLegend={false}
      />
    </Card>
  );
};

export default BMIStatusChart;

const styles = StyleSheet.create({
  weights: {
    borderRadius: 16,
  },
  icon: {
    backgroundColor: colors.primary,
  },
  card: {
    backgroundColor: colors.background,
    marginBottom: 5,
  },
  subTitle: {
    color: colors.medium,
  },
});

const weightChartConfig = {
  backgroundColor: colors.light,
  backgroundGradientFrom: colors.light,
  backgroundGradientTo: colors.light1,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(6, 253, 28,${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};
