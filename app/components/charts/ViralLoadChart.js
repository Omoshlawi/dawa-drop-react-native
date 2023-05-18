import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  ProgressChart,
  PieChart,
} from "react-native-chart-kit";
import { screenWidth } from "../../utils/contants";
import { screenHeight } from "../../utils/contants";
import colors from "../../utils/colors";
const ViralLoadChart = ({ x, y }) => {
  return (
    <View>
      <Text variant="titleLarge">Viral Load</Text>
      <BarChart
        data={{
          labels: x,
          legend: ["Pressure in mm/Hg"],
          datasets: [
            {
              data: y,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            },
          ],
        }}
        width={screenWidth * 0.95} // from react-native
        height={screenHeight * 0.2}
        // yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={weightChartConfig}
        style={styles.weights}
      />
    </View>
  );
};

export default ViralLoadChart;
const styles = StyleSheet.create({
  weights: {
    borderRadius: 16,
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
