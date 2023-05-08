import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import AppForm from "../../forms/AppForm";
import AppFormField from "../../forms/AppFormField";
import AppFormSubmitButton from "../../forms/AppFormSubmitButton";
import Logo from "../../Logo";
import { useUser } from "../../../api/hooks";
import { useUserContext } from "../../../context/hooks";
import * as Yup from "yup";
const validationSchemer = Yup.object().shape({
  username: Yup.string().label("Username"),
  first_name: Yup.string().label("First Name"),
  last_name: Yup.string().label("Last Name"),
  email: Yup.string().label("Email Adress").required(),
});

const AccountInfoForm = ({ navigation, route }) => {
  const { url, first_name, last_name, email, username } = route.params;
  const { token } = useUserContext();
  const { getUser, putUserInfo } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    const response = await putUserInfo({ url, data: values, token });
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
        return console.log(
          "AccountInfo form: ",
          response.problem,
          response.data
        );
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
        initialValues={{ first_name, last_name, email, username }}
        onSubmit={handleSubmit}
      >
        <AppFormField
          name="username"
          placeholder="Enter username"
          icon="account"
        />
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
