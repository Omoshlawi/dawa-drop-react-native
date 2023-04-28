import { StyleSheet, View, Platform } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  AppFormSubmitButton,
} from "../../components/forms";
import moment from "moment";
import { Button, IconButton, List, Text } from "react-native-paper";
import AppDateTimePicker from "../../components/input/AppDateTimePicker";
import AppFormDateTimePicker from "../../components/forms/AppFormDateTimePicker";
import Logo from "../../components/Logo";

const validationSchemer = Yup.object().shape({
  national_id: Yup.number().label("National Id"),
  date_of_depletion: Yup.string().label("Date of depletion"),
  reach_out_phone_number: Yup.string().label("Phone Number").required(),
});

const initialValues = {
  national_id: 0,
  date_of_depletion: new Date(Date.now()).toISOString(),
  reach_out_phone_number: "",
};

const OrderScreen = () => {
  const handleSubmit = async (values, { setFieldError }) => {
    console.log(values);
  };

  return (
    <View>
      <View style={styles.header}>
        <Logo />
        <Text style={styles.headerText} variant="titleLarge">
          Order Medicine
        </Text>
      </View>
      <AppForm
        validationSchema={validationSchemer}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <AppFormField
          keyboardType="numeric"
          icon="account"
          name="national_id"
          placeholder="National Id"
        />
        <AppFormField
          icon="phone"
          name="reach_out_phone_number"
          placeholder="Phone Number"
        />
        <AppFormDateTimePicker icon="timetable" name="date_of_depletion" />
        <List.Item
          onPress={() => {}}
          title="Select Delivery Location"
          left={(props) => <List.Icon {...props} icon="google-maps" />}
        />
        <AppFormSubmitButton title="Order Now" />
      </AppForm>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  headerText: {
    padding: 10,
    fontSize: 40,
  },
});
