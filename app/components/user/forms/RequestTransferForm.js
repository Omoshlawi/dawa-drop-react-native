import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import AppForm from "../../forms/AppForm";
import AppFormField from "../../forms/AppFormField";
import AppFormSubmitButton from "../../forms/AppFormSubmitButton";
import Logo from "../../Logo";
import { useHospital, useUser } from "../../../api/hooks";
import { useUserContext } from "../../../context/hooks";
import * as Yup from "yup";
import AppFormPicker from "../../forms/AppFormPicker";
import HospitalPicker from "./HospitalPicker";
const validationSchemer = Yup.object().shape({
  hospital: Yup.string().label("Hospital"),
  reason: Yup.string().label("Reason"),
});

const RequestTransferForm = ({ navigation, route }) => {
  const { token } = useUserContext();
  const { getUser, postTransferRequest } = useUser();
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);
  const { getClinics } = useHospital();

  const handleFetch = async () => {
    const clinicsResponse = await getClinics();
    if (!clinicsResponse.ok) {
      return console.log(
        "Request Form SCREEN",
        clinicsResponse.problem,
        clinicsResponse.data
      );
    } else {
      setClinics(clinicsResponse.data.results);
    }
  };

  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    const response = await postTransferRequest(token, values);
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
          "Request Transfer form: ",
          response.problem,
          response.data
        );
      }
    } else {
      await getUser(true);
      navigation.goBack();
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <View>
      <View style={styles.logo}>
        <Logo />
      </View>
      <AppForm
        validationSchema={validationSchemer}
        initialValues={{ reason: "", hospital: "" }}
        onSubmit={handleSubmit}
      >
        <HospitalPicker hospitals={clinics} />
        <AppFormField
          name="reason"
          placeholder="Reason for requesting transfer"
          icon="information-variant"
          multiline
          numberOfLines={3}
        />
        <AppFormSubmitButton title="Update" loading={loading} />
      </AppForm>
    </View>
  );
};

export default RequestTransferForm;

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    padding: 10,
  },
});
