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
import { SectionList } from "react-native";

const PrescriptionsScreen = () => {
  const [loading, setloading] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const { getPrescriptions } = useUser();
  const { token } = useUserContext();
  const prescriptionDataToSectionData = (prescriptionsData) => {
    const isCurrentList = prescriptionsData.filter(
      ({ is_current }) => is_current === true
    );
    const notCurrentList = prescriptionsData.filter(
      ({ is_current }) => is_current === false
    );
    return [
      { title: "Current Regimen", data: isCurrentList },
      { title: "Previous Prescriptions", data: notCurrentList },
    ];
  };

  const handleFetch = async () => {
    setloading(true);
    const response = await getPrescriptions(token, {});
    setloading(false);
    if (response.ok) {
      setPrescriptions(response.data.results);
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View style={styles.screen}>
      <SectionList
        refreshing={loading}
        onRefresh={handleFetch}
        sections={prescriptionDataToSectionData(prescriptions)}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? <Text style={styles.title}>{title}</Text> : null
        }
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
  screen: {
    flex: 1,
  },
});
