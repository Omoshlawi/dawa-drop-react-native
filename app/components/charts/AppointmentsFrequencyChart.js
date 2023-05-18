import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ContributionGraph } from "react-native-chart-kit";
import { screenHeight, screenWidth } from "../../utils/contants";
import colors from "../../utils/colors";
import { Avatar, Card, IconButton } from "react-native-paper";

const AppointmentsFrequencyChart = ({ attendanceData }) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        titleVariant="titleLarge"
        title="Appointment Frequency"
        subtitle="BMI status scales and range"
        subtitleStyle={styles.subTitle}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={require("../../assets/medical-appointment.png")}
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
      <ContributionGraph
        values={attendanceData}
        endDate={new Date()}
        numDays={105}
        width={screenWidth * 0.95} // from react-native
        height={screenHeight * 0.2}
        chartConfig={weightChartConfig}
        style={styles.weights}
      />
    </Card>
  );
};

export default AppointmentsFrequencyChart;

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
