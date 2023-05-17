import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/hooks";
import { useHospital, useUser } from "../../api/hooks";
import {
  LineChart,
  BarChart,
  ProgressChart,
  PieChart,
} from "react-native-chart-kit";
import { Text } from "react-native-paper";
import {
  getTestResultsMonthlyMeans,
  getTriadsMonthlyMeans,
} from "../../utils/helpers";
import moment from "moment";
import {
  screenHeight,
  screenWidth,
  weightChartConfig,
} from "../../utils/contants";
import colors from "../../utils/colors";

const DashBoard = ({ navigation }) => {
  const [triads, setTriads] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const { getUser, getTriads, getTestResults } = useUser();
  const { getSummaryStats } = useHospital();
  const [summary, setSummary] = useState(null);

  const { user, token } = useUserContext();

  const handleFetchTriads = async (url) => {
    let response = await getTriads(token, {});
    if (response.ok) {
      setTriads(response.data.results);
    } else {
      console.log("Dashboard: ", response.problem, response.data);
    }

    response = await getTestResults(token, {});
    if (response.ok) {
      setTestResults(response.data.results);
    } else {
      console.log("Dashboard: ", response.problem, response.data);
    }
    response = await getSummaryStats();
    if (response.ok) {
      setSummary(response.data);
    } else {
      console.log("Dashboard: ", response.problem, response.data);
    }
  };

  useEffect(() => {
    if (!user) getUser();
    handleFetchTriads();
  }, []);
  const {
    monthlyHeights,
    monthlyWeights,
    monthlypressure,
    months,
    monthlyHeartRate,
    monthlyTemperature,
  } = getTriadsMonthlyMeans(triads);
  const {
    monthlyCD4Count,
    monthlyViralLoads,
    months: testMonths,
  } = getTestResultsMonthlyMeans(testResults);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.triad}>
        <>
          <Text variant="titleLarge">Weight</Text>
          <LineChart
            data={{
              labels: months,
              legend: ["Weight Kilograms"],
              datasets: [
                {
                  data: monthlyWeights,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                },
              ],
            }}
            width={screenWidth * 0.95} // from react-native
            height={screenHeight * 0.2}
            // yAxisLabel="$"
            yAxisSuffix="Kg"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={weightChartConfig}
            bezier
            style={styles.weights}
          />
          <Text variant="titleLarge">Height</Text>
          <LineChart
            data={{
              labels: months,
              legend: ["Height in Inches"],
              datasets: [
                {
                  data: monthlyHeights,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                },
              ],
            }}
            width={screenWidth * 0.95}
            height={screenHeight * 0.2}
            // yAxisLabel="$"
            yAxisSuffix="'"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={weightChartConfig}
            // bezier
            style={styles.weights}
          />
          <Text variant="titleLarge">Blood pressure</Text>
          <LineChart
            data={{
              labels: months,
              legend: ["Pressure in mm/Hg"],
              datasets: [
                {
                  data: monthlypressure,
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
            bezier
            style={styles.weights}
          />
        </>
        <>
          <Text variant="titleLarge">Cd4 Count</Text>
          <BarChart
            data={{
              labels: testMonths,
              datasets: [
                {
                  data: monthlyCD4Count,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                },
              ],
            }}
            width={screenWidth * 0.95} // from react-native
            height={screenHeight * 0.2}
            // yAxisLabel="$"
            verticalLabelRotation={-45}
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={weightChartConfig}
            style={styles.weights}
          />
          <Text variant="titleLarge">Viral Load</Text>
          <BarChart
            data={{
              labels: testMonths,
              legend: ["Pressure in mm/Hg"],
              datasets: [
                {
                  data: monthlyViralLoads,
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
        </>
        <>
          <Text variant="titleLarge">Temprature</Text>
          <BarChart
            data={{
              labels: testMonths,
              legend: ["Pressure in mm/Hg"],
              datasets: [
                {
                  data: monthlyTemperature,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                },
              ],
            }}
            // radius={32}
            // strokeWidth={16}
            width={screenWidth * 0.95} // from react-native
            height={screenHeight * 0.2}
            chartConfig={weightChartConfig}
            style={styles.weights}
          />
          <Text variant="titleLarge">Heart Rate</Text>
          <BarChart
            data={{
              labels: testMonths,
              legend: ["Pressure in mm/Hg"],
              datasets: [
                {
                  data: monthlyHeartRate,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                },
              ],
            }}
            radius={32}
            strokeWidth={16}
            width={screenWidth * 0.95} // from react-native
            height={screenHeight * 0.2}
            chartConfig={weightChartConfig}
            style={styles.weights}
          />
          <Text variant="titleLarge">Heart Rate</Text>
          {summary && (
            <ProgressChart
              data={{
                labels: Object.keys(summary.gender_distribution), // optional
                data: Object.values(summary.gender_distribution).map(
                  (val) => val / summary.total_patients
                ),
              }}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={weightChartConfig}
              hideLegend={false}
              style={styles.weights}
            />
          )}
        </>
      </View>
    </ScrollView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  weights: {
    borderRadius: 16,
  },

  screen: {
    backgroundColor: colors.white,
  },
  triad: {
    padding: 10,
    alignItems: "center",
    // backgroundColor: colors.light,
  },
});
