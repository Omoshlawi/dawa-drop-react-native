import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import AppErrorMessage from "./AppErrorMessage";
import AppDateTimePicker from "../input/AppDateTimePicker";

const AppFormDateTimePicker = ({ name, ...otherProps }) => {
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
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormDateTimePicker;

const styles = StyleSheet.create({});
