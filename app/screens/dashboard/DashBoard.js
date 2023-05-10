import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { LineChart } from "react-native-chart-kit";
import { getMonthlyMeans } from "../../utils/helpers";
import moment from "moment";
import { weightChartConfig } from "../../utils/contants";

const DashBoard = ({ navigation }) => {
  const [triads, setTriads] = useState([]);
  const { getUser, getUserInfo } = useUser();
  const { user, token } = useUserContext();

  const handleFetchTriads = async (url) => {
    const response = await getUserInfo({ url, token, params: {} });
    if (response.ok) {
      setTriads(response.data.results);
    } else {
      console.log("Dashboard: ", response.problem, response.data);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      if (user) {
        const {
          profile_information: { user_type },
        } = user;
        if (user_type == "patient") {
          const {
            user_type_information: { patient },
          } = user;
          if (patient) {
            const {
              triads: { count, url, url_list },
            } = patient;
            handleFetchTriads(url);
          }
        }
      }
    }
  }, [user]);
  const { monthlyHeights, monthlyWeights, monthlypressure, months } =
    getMonthlyMeans(triads);
  return (
    <View>
      <LineChart
        data={{
          labels: months,
          datasets: [
            {
              data: monthlyWeights,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        // yAxisLabel="$"
        yAxisSuffix="Kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={weightChartConfig}
        bezier
        style={styles.weights}
      />
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  weights: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
