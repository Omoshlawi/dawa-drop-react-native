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
  full_name: Yup.string().label("Full Name"),
  phone_number: Yup.string().label("Last Name"),
  address: Yup.string().label("Address").required(),
});

const NextOfKeenForm = ({ navigation, route }) => {
  let { next_of_keen, createUrl } = route.params;
  const update = Boolean(next_of_keen);
  const [loading, setLoading] = useState(false);
  const { token } = useUserContext();
  const { getUser, putUserInfo, postUserInfo } = useUser();
  if (!next_of_keen) {
    next_of_keen = {
      full_name: "",
      address: "",
      phone_number: "",
      url: createUrl,
    };
  }
  const { full_name, address, phone_number, url } = next_of_keen;
  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    if (update) {
      var response = await putUserInfo({ url, data: values, token });
    } else {
      var response = await postUserInfo({ url, data: values, token });
    }
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
        initialValues={{ full_name, phone_number, address }}
        onSubmit={handleSubmit}
      >
        <AppFormField
          name="full_name"
          placeholder="Enter Full name"
          icon="account-edit"
        />
        <AppFormField
          name="phone_number"
          placeholder="Enter Phone Number"
          icon="phone"
        />
        <AppFormField
          name="address"
          placeholder="Enter Address"
          icon="card-account-details-outline"
        />
        <AppFormSubmitButton
          title={update ? "Update" : "Add"}
          loading={loading}
        />
      </AppForm>
    </View>
  );
};

export default NextOfKeenForm;

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    padding: 10,
  },
});
