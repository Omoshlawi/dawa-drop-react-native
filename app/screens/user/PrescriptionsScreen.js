import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { Chip, List, Searchbar } from "react-native-paper";
import SearchHeader from "../../components/SearchHeader";
import colors from "../../utils/colors";
import moment from "moment/moment";
import { screenWidth } from "../../utils/contants";
import IconText from "../../components/display/IconText";

const PrescriptionsScreen = () => {
  const [filterParams, setFilterParams] = useState({ search: "" });
  const [prescriptions, setPrescriptions] = useState([]);
  const { getPrescriptions } = useUser();
  const { token } = useUserContext();
  const [] = useState();
  const handleFetch = async () => {
    const response = await getPrescriptions(token, filterParams);
    if (response.ok) {
      setPrescriptions(response.data.results);
    }
  };
  useEffect(() => {
    handleFetch();
  }, [filterParams]);
  return (
    <View>
      <SearchHeader
        text={filterParams.search}
        onTextChange={(search) => setFilterParams({ ...filterParams, search })}
      />
      <Text style={styles.title}>My Prescriptions</Text>
      <FlatList
        horizontal
        data={prescriptions}
        renderItem={({ item, index }) => {
          const {
            created_at,
            is_current,
            regimen: { regimen_line, regimen },
            doctor: { name },
          } = item;
          return (
            <List.Item
              style={styles.listItem}
              title={`${regimen_line}(${regimen})`}
              description={moment(created_at).format("ddd Do MMMM YYYY")}
              descriptionStyle={styles.listDescription}
              left={(props) => (
                <List.Image
                  {...props}
                  source={require("./../../assets/prescription.png")}
                />
              )}
              right={({ color, style }) => (
                <IconText
                  text={is_current ? "Current" : ""}
                  size={25}
                  //   {...props}
                  left={false}
                  icon="chevron-right"
                />
              )}
            />
          );
        }}
      />
    </View>
  );
};

export default PrescriptionsScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    padding: 10,
  },
  listItem: {
    backgroundColor: colors.white,
    marginTop: 5,
    width: screenWidth,
  },
  listDescription: {
    color: colors.medium,
  },
});
