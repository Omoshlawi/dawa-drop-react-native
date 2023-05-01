import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import * as Yup from "yup";
import AppForm from "../../forms/AppForm";
import AppFormField from "../../forms/AppFormField";
import AppFormSubmitButton from "../../forms/AppFormSubmitButton";
import Logo from "../../Logo";
import { httpService, useUser } from "../../../api/hooks";
import { useUserContext } from "../../../context/hooks";
const validationSchemer = Yup.object().shape({
  first_name: Yup.string().label("First Name"),
  last_name: Yup.string().label("Last Name"),
  email: Yup.string().label("Email Adress").required(),
});

const AccountInfoForm = ({ navigation, route }) => {
  const { url, first_name, last_name, email } = route.params;
  const { token } = useUserContext();
  const [loading, setLoading] = useState(false);
  const { getUser } = useUser();

  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    const response = await httpService.put(url, values, {
      headers: { ...httpService.getAuthHeader(token) },
    });
    setLoading(false);
    if (!response.ok) {
      if (response.problem === "CLIENT_ERROR") {
        for (const key in response.data) {
          const element = response.data[key];
          if (element instanceof Array) {
            setFieldError(key, element.join(";"));
          } else if (element instanceof Object) {
            for (const key1 in element) {
              const element1 = element[key1];
              setFieldError(key1, element1.join(";"));
            }
          }
        }
        return console.log("LoginScreen: ", response.problem, response.data);
      }
    } else {
      await getUser(true);
      navigation.goBack();
    }
  };

  return (
    <View>
      <View style={styles.logo}>
        <Logo />
      </View>
      <AppForm
        validationSchema={validationSchemer}
        initialValues={{ first_name, last_name, email }}
        onSubmit={handleSubmit}
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
        <AppFormSubmitButton title="Update" loading={loading} />
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
