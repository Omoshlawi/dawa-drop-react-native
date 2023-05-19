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
import { getBMIStatus, toPiechartData } from "../../utils/helpers";

const NutritionChart = ({ bmi }) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        titleVariant="titleLarge"
        title="Recomended nutrition"
        subtitle="Food nutrition content recomended to take in grames"
        subtitleStyle={styles.subTitle}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={require("../../assets/diet.png")}
            style={styles.icon}
          />
        )}
      />
      <Card.Content>
        <Text>Your BMI: {bmi}</Text>
        <Text>BMI status: {getBMIStatus(bmi)}</Text>
      </Card.Content>
      <PieChart
        data={toPiechartData(bmi)}
        width={screenWidth * 0.95}
        height={220}
        chartConfig={weightChartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[0, 0]}
        absolute
        style={styles.weights}
      />
    </Card>
  );
};

export default NutritionChart;

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
