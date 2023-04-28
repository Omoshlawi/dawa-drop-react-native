import { StyleSheet, View, Platform } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { AppForm, AppFormField } from "../../components/forms";
import moment from "moment";
import { Button, Text } from "react-native-paper";
import AppDateTimePicker from "../../components/input/AppDateTimePicker";

const validationSchemer = Yup.object().shape({
  national_id: Yup.number().label("National Id"),
  date_of_depletion: Yup.string().label("Date of depletion"),
  reach_out_phone_number: Yup.string().label("Phone Number").required(),
});

const initialValues = {
  national_id: 0,
  date_of_depletion: moment.now(),
  reach_out_phone_number: "",
};

const OrderScreen = () => {
  const handleSubmit = async (values, { setFieldError }) => {};

  return (
    <View>
      <Text>Hellow there</Text>
      <AppForm
        validationSchema={validationSchemer}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <AppFormField name="national_id" plaholder="National Id" />
        <AppFormField name="date_of_depletion" />
        <AppFormField name="reach_out_phone_number" />
        <AppDateTimePicker onChangeDate={(date) => console.log(date)} />
      </AppForm>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
