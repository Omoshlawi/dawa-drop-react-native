import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useHospital, useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { Chip, List, Searchbar } from "react-native-paper";
import SearchHeader from "../../components/SearchHeader";
import colors from "../../utils/colors";
import moment from "moment/moment";
import { screenWidth } from "../../utils/contants";

const AppointMentsScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [filterParams, setFilterParams] = useState({ type: "", search: "" });
  const { getAppointments } = useUser();
  const { getAppointmentTypes } = useHospital();
  const { token } = useUserContext();
  const handleFetchAppointments = async () => {
    const response = await getAppointments(token, filterParams);
    if (response.ok) {
      setAppointments(response.data.results);
    }
  };
  const handleFetchAppointTypes = async () => {
    const typeResponse = await getAppointmentTypes({});
    if (typeResponse.ok) {
      setAppointmentTypes(typeResponse.data.results);
    }
  };
  useEffect(() => {
    handleFetchAppointTypes();
    handleFetchAppointments();
  }, []);
  useEffect(() => {
    handleFetchAppointments();
  }, [filterParams]);
  return (
    <View>
      <SearchHeader
        text={filterParams.search}
        onTextChange={(search) => setFilterParams({ ...filterParams, search })}
      />

      <Text style={styles.title}>Filter by appointmentTypes</Text>
      <FlatList
        horizontal
        data={appointmentTypes}
        renderItem={({ item, index }) => {
          const { type } = item;
          return (
            <Chip
              selected={type === filterParams.type}
              style={styles.chipFilter}
              key={index}
              onPress={() => {
                if (type === filterParams.type) {
                  setFilterParams({ ...filterParams, type: "" });
                } else {
                  setFilterParams({ ...filterParams, type });
                }
              }}
              textStyle={styles.chipText}
            >
              {type}
            </Chip>
          );
        }}
      />
      <Text style={styles.title}>Appointments</Text>

      <FlatList
        horizontal
        data={appointments}
        renderItem={({ item, index }) => {
          const {
            created_at,
            type: {type},
            doctor: { name },
          } = item;
          return (
            <List.Item
              style={styles.listItem}
              title={`With Doctor ${name}`}
              description={`${moment(created_at).format(
                "ddd Do MMMM YYYY"
              )} | ${type}`}
              descriptionStyle={styles.listDescription}
              left={(props) => (
                <List.Image
                  {...props}
                  source={require("./../../assets/medical-appointment.png")}
                />
              )}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          );
        }}
      />
    </View>
  );
};

export default AppointMentsScreen;

const styles = StyleSheet.create({
  chipFilter: {
    margin: 2,
    backgroundColor: colors.white,
  },
  chipText: {
    color: colors.primary,
  },
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
