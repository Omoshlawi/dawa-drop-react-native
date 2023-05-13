import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { LineChart } from "react-native-chart-kit";
import { getMonthlyMeans } from "../../utils/helpers";
import moment from "moment";
import {
  screenHeight,
  screenWidth,
  weightChartConfig,
} from "../../utils/contants";
import { FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../../utils/colors";

const DashBoard = ({ navigation }) => {
  const [triads, setTriads] = useState([]);
  const { getUser, getUserInfo } = useUser();
  const { user, token } = useUserContext();
  const [dropDownItems, setDropDownItems] = useState([
    { label: "Weight", value: "weight" },
    { label: "Height", value: "height" },
    { label: "Pressure", value: "pressure" },
  ]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownValue, setdropDownValue] = useState("weight");

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
      <View style={styles.triad}>
        <View style={styles.dropDow}>
          <DropDownPicker
            open={openDropDown}
            value={dropDownValue}
            items={dropDownItems}
            setOpen={setOpenDropDown}
            setValue={setdropDownValue}
            setItems={setDropDownItems}
            style={{ width: screenWidth * 0.3 }}
          />
        </View>
        <>
          {dropDownValue === "weight" && (
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
          )}
          {dropDownValue === "height" && (
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
              bezier
              style={styles.weights}
            />
          )}
          {dropDownValue === "pressure" && (
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
          )}
        </>
        
      </View>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  weights: {
    borderRadius: 16,
  },

  screen: {
    flex: 1,
  },
  dropDow: {
    zIndex: 1,
    alignSelf: "center",
  },
  triad: {
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.light,
  },
});
