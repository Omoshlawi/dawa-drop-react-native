import { Alert, SectionList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { toSectionListData } from "../../utils/helpers";
import colors from "../../utils/colors";
import { ScrollView } from "react-native";
import { IconButton, List } from "react-native-paper";
import UserTypeProfileInformation from "../../components/user/UserTypeProfileInformation";
import IconText from "../../components/display/IconText";
import routes from "../../navigation/routes";

const ProfileViewScreen = ({ navigation, route }) => {
  const user = route.params;
  const {
    account_information,
    profile_information,
    user_type_information,
    account_information_edit_url,
    profile_information_edit_url,
    user_type_information_edit_url,
  } = user;
  const { url, email, name } = account_information;
  const { gender, image, phone_number, address, user_type } =
    profile_information;
  const { [user_type]: userType } = user_type_information;

  return (
    <ScrollView>
      <View style={styles.titleRow}>
        <Text style={styles.title}>account information</Text>
        <IconText
          icon="square-edit-outline"
          size={20}
          onPress={() =>
            navigation.navigate(routes.FORMS_NAVIGATION, {
              screen: routes.FORMS_ACCOUNT_FORM,
              params: account_information,
            })
          }
        />
      </View>
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
      <View style={styles.titleRow}>
        <Text style={styles.title}>profile information</Text>
        <IconText
          icon="square-edit-outline"
          size={20}
          onPress={() =>
            navigation.navigate(routes.FORMS_NAVIGATION, {
              screen: routes.FORMS_PROFILE_FORM,
              params: profile_information,
            })
          }
        />
      </View>
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
      <View style={styles.titleRow}>
        <Text style={styles.title}>{user_type} information</Text>
        <IconText icon="square-edit-outline" size={20} />
      </View>
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  listTitle: {
    color: colors.medium,
  },
});
