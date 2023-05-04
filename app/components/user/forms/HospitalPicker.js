import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../utils/colors";
import { IconButton, List } from "react-native-paper";
import { Modal } from "react-native";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useFormikContext } from "formik";
import AppErrorMessage from "../../forms/AppErrorMessage";

const HospitalPicker = ({ hospitals = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const { setFieldValue, errors, touched, values } = useFormikContext();
  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="hospital-marker"
          size={30}
          color={colors.medium}
        />
        <Text style={styles.input}>
          {values["hospital"]
            ? hospitals.find(({ url }) => url === values["hospital"]).name
            : "Choose Hospital"}
        </Text>
        <IconButton
          icon="chevron-down"
          size={30}
          onPress={() => setShowModal(true)}
        />
      </View>
      <AppErrorMessage error={errors["hospital"]} visible={touched} />
      <Modal visible={showModal} animationType="slide">
        <View style={styles.mordal}>
          <Text style={styles.title} variant="titleLarge">
            Hospitals
          </Text>
          <FlatList
            data={hospitals}
            keyExtractor={({ url }) => url}
            renderItem={({ item }) => {
              const { url, name, longitude, latitude, address } = item;
              return (
                <List.Item
                  style={styles.listItem}
                  title={name}
                  titleStyle={styles.itemTitle}
                  descriptionStyle={styles.itemDescription}
                  description={address}
                  onPress={() => {
                    setFieldValue("hospital", url);
                    setShowModal(false);
                  }}
                  right={(props) => (
                    <IconButton
                      {...props}
                      iconColor={colors.primary}
                      icon="google-maps"
                    />
                  )}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="hospital"
                      color={colors.medium}
                    />
                  )}
                />
              );
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default HospitalPicker;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 5,
    color: colors.medium,
  },
  listItem: {
    backgroundColor: colors.white,
    marginTop: 8,
  },
  mordal: {
    backgroundColor: colors.background,
    flex: 1,
  },
  itemDescription: {
    color: colors.medium,
  },
  itemTitle: {
    color: colors.black,
  },
  title: {
    padding: 10,
    textAlign: "center",
    color: colors.primary,
  },
});
