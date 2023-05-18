import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  LineChart,
  BarChart,
  ProgressChart,
  PieChart,
} from "react-native-chart-kit";
import { screenWidth } from "../../utils/contants";
import { screenHeight } from "../../utils/contants";
import colors from "../../utils/colors";
import { Avatar, Card, IconButton, Text } from "react-native-paper";
const CD4Chart = ({ x, y }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Card style={styles.card}>
      <Card.Title
        titleVariant="titleLarge"
        title="CD4 Count"
        subtitle="Weight progression with time"
        subtitleStyle={styles.subTitle}
        left={(props) => (
          <Avatar.Icon {...props} icon="weight-kilogram" style={styles.icon} />
        )}
        right={(props) => (
          <IconButton
            {...props}
            icon="more"
            onPress={() => setShowDescription(!showDescription)}
          />
        )}
      />
      {showDescription && (
        <Card.Content>
          <Text>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </Text>
        </Card.Content>
      )}
      <BarChart
        data={{
          labels: x,
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
        verticalLabelRotation={-45}
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={weightChartConfig}
        style={styles.weights}
      />
    </Card>
  );
};

export default CD4Chart;

const styles = StyleSheet.create({
  weights: {
    borderRadius: 16,
  },
  icon: {
    backgroundColor: colors.primary,
  },
  card: {
    backgroundColor: colors.light1,
    marginBottom:5
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
