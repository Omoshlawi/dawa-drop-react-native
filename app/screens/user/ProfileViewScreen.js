import { SectionList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { toSectionListData } from "../../utils/helpers";
import colors from "../../utils/colors";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import UserTypeProfileInformation from "../../components/user/UserTypeProfileInformation";

const ProfileViewScreen = ({ navigation, route }) => {
  const user = route.params;
  const {
    account_information: { url, email, name },
    profile_information: { gender, image, phone_number, address, user_type },
    user_type_information: { [user_type]: userType },
    account_information_edit_url,
    profile_information_edit_url,
    user_type_information_edit_url,
  } = user;
  return (
    <ScrollView>
      <Text style={styles.title}>account information</Text>
      <List.Item
        title="Name"
        titleStyle={styles.listTitle}
        description={name ? name : "None"}
        style={styles.item}
      />
      <List.Item
        title="Email"
        titleStyle={styles.listTitle}
        description={email ? email : "None"}
        style={styles.item}
      />
      <Text style={styles.title}>profile information</Text>
      <List.Item
        title="Gender"
        titleStyle={styles.listTitle}
        description={gender ? gender : "None"}
        style={styles.item}
      />
      <List.Item
        title="Phone Number"
        titleStyle={styles.listTitle}
        description={phone_number ? phone_number : "None"}
        style={styles.item}
      />
      <List.Item
        title="Address"
        titleStyle={styles.listTitle}
        description={address ? address : "None"}
        style={styles.item}
      />
      <Text style={styles.title}>{user_type} information</Text>
      <UserTypeProfileInformation
        userTypeString={user_type}
        userTypeObject={userType}
      />
    </ScrollView>
  );
};

export default ProfileViewScreen;

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
});
