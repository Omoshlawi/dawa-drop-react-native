import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { Banner, IconButton, List, Snackbar } from "react-native-paper";
import IconText from "../display/IconText";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { Alert } from "react-native";

const DoctorInformation = ({ doctor }) => {
  return <Text>Doctor</Text>;
};
const AgentInformation = ({ agent }) => {
  return <Text>Doctor</Text>;
};
const PatientInformation = ({ patient }) => {
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const navigation = useNavigation();
  const { deleteUserInfo, getUser } = useUser();
  const { token } = useUserContext();
  const {
    url,
    patient_number,
    base_clinic,
    next_of_keen: { list, url: createUrl },
  } = patient;

  const handleDelete = async ({ url: deletUrl, full_name }) => {
    Alert.alert(
      "Delete!",
      `Are you sure you want to delete "${full_name} " ?`,
      [
        {
          text: "Delete",
          onPress: async () => {
            const response = await deleteUserInfo({ token, url: deletUrl });
            if (!response.ok) {
              setMessage(
                "Error occured when attempting to delete next of keen!!"
              );
              onToggleSnackBar();
            } else {
              setMessage("Added next of Keen succesfully!!");
              await getUser(true);
              onToggleSnackBar();
            }
          },
        },
        { text: "Cancel", onPress: () => {} },
      ]
    );
  };
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
        <IconText
          icon="plus"
          size={20}
          onPress={() =>
            navigation.navigate(routes.FORMS_NAVIGATION, {
              screen: routes.FORMS_NEXT_OF_KEEN_FORM,
              params: { createUrl, next_of_keen: null },
            })
          }
        />
      </View>
      {list.map((nok) => {
        const { full_name, address, phone_number, url } = nok;
        return (
          <List.Item
            key={url}
            title={full_name}
            titleStyle={styles.listTitle}
            description={`${phone_number} | ${address}`}
            style={styles.item}
            onPress={() =>
              navigation.navigate(routes.FORMS_NAVIGATION, {
                screen: routes.FORMS_NEXT_OF_KEEN_FORM,
                params: { createUrl, next_of_keen: nok },
              })
            }
            right={(props) => (
              <IconButton
                icon="trash-can-outline"
                iconColor={colors.danger}
                onPress={async () => {
                  await handleDelete(nok);
                }}
              />
            )}
          />
        );
      })}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Dismiss",
          onPress: () => {
            // Do something
          },
        }}
      >
        {message}
      </Snackbar>
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
