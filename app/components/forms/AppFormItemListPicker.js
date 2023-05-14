import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import AppPicker from "../input/AppPicker";
import AppErrorMessage from "./AppErrorMessage";

const AppFormItemListPicker = ({ name, ...otherProps }) => {
  const { setFieldValue, errors, values, touched, handleChange } =
    useFormikContext();
  return (
    <>
      <AppPicker
        value={values[name] ? `${values[name]}` : ""}
        onSelectItem={handleChange(name)}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormItemListPicker;

const styles = StyleSheet.create({});
