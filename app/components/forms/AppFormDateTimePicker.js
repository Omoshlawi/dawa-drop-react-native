import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import AppErrorMessage from "./AppErrorMessage";
import AppDateTimePicker from "../input/AppDateTimePicker";

const AppFormDateTimePicker = ({ name }) => {
  const { setFieldTouched, handleChange, touched, errors, values } =
    useFormikContext();
  return (
    <>
      <AppDateTimePicker
        value={values[name]}
        onChangeDate={(date) => {
          const selectedDate = new Date(date);
          handleChange(name)(selectedDate.toISOString());
        }}
        // onChangeDate={handleChange(name)}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormDateTimePicker;

const styles = StyleSheet.create({});
