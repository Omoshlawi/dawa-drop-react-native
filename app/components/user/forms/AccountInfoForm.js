import { StyleSheet, Text, View } from "react-native";
import React from "react";

import * as Yup from "yup";
import AppForm from "../../forms/AppForm";
import AppFormField from "../../forms/AppFormField";
import AppFormSubmitButton from "../../forms/AppFormSubmitButton";
import Logo from "../../Logo";
const validationSchemer = Yup.object().shape({
  first_name: Yup.string().label("First Name"),
  last_name: Yup.string().label("Last Name"),
  email: Yup.string().label("Email Adress").required(),
});

const AccountInfoForm = ({ navigation, route }) => {
  const { url, first_name, last_name, email } = route.params;
  console.log(route.params);
  return (
    <View>
      <View style={styles.logo}>
        <Logo />
      </View>
      <AppForm
        validationSchema={validationSchemer}
        initialValues={{ first_name, last_name, email }}
      >
        <AppFormField
          name="first_name"
          placeholder="First name"
          icon="account-edit"
        />
        <AppFormField
          name="last_name"
          placeholder="Last name"
          icon="account-edit"
        />
        <AppFormField name="email" placeholder="Email Address" icon="email" />
        <AppFormSubmitButton title="Update" />
      </AppForm>
    </View>
  );
};

export default AccountInfoForm;

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    padding: 10,
  },
});
