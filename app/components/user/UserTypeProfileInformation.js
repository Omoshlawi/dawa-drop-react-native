import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { List } from "react-native-paper";
import IconText from "../display/IconText";

const DoctorInformation = ({ doctor }) => {
  return <Text>Doctor</Text>;
};
const AgentInformation = ({ agent }) => {
  return <Text>Doctor</Text>;
};
const PatientInformation = ({ patient }) => {
  const {
    url,
    patient_number,
    base_clinic,
    next_of_keen: { list },
  } = patient;
  return (
    <>
      <List.Item
        title="Patient Number"
        titleStyle={styles.listTitle}
        description={patient_number ? patient_number : "None"}
        style={styles.item}
      />
      <List.Item
        title="Base Clinic"
        titleStyle={styles.listTitle}
        description={
          base_clinic ? `${base_clinic.name} | ${base_clinic.address}` : "None"
        }
        style={styles.item}
      />
      <View style={styles.titleRow}>
        <Text style={styles.title}>Next of keen information</Text>
        <IconText icon="square-edit-outline" size={20} />
      </View>
      {list.map(({ full_name, address, phone_number, url }) => (
        <List.Item
          key={url}
          title={full_name}
          titleStyle={styles.listTitle}
          description={`${phone_number} | ${address}`}
          style={styles.item}
        />
      ))}
    </>
  );
};

const UserTypeProfileInformation = ({ userTypeString, userTypeObject }) => {
  if (!userTypeObject) {
    return (
      <List.Item
        title="Not available"
        titleStyle={styles.listTitle}
        style={styles.item}
      />
    );
  }
  if (userTypeString === "patient") {
    return <PatientInformation patient={userTypeObject} />;
  }
  if (userTypeString === "agent") {
    return <AgentInformation />;
  }
  return <DoctorInformation doctor={userTypeObject} />;
};

export default UserTypeProfileInformation;

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 2,
  },
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
  listTitle: {
    color: colors.medium,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
