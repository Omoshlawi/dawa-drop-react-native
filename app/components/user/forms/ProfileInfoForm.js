import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppFormImagePicker from "../../forms/AppFormImagePicker";
import AppFormDropDown from "../../forms/AppFormDropDown";
import * as Yup from "yup";
import AppForm from "../../forms/AppForm";
import AppFormField from "../../forms/AppFormField";
import AppFormSubmitButton from "../../forms/AppFormSubmitButton";
import Logo from "../../Logo";
const validationSchemer = Yup.object().shape({
  address: Yup.string().label("Last Name"),
  image: Yup.string().label("Image").required(),
  gender: Yup.string().label("Gender").required(),
  phone_number: Yup.string().label("Phone number").required(),
});
const ProfileInfoForm = ({ navigation, route }) => {
  const { gender, image, phone_number, address } = route.params;
  const [genderOptions, setGenderOptions] = useState([
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]);
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <AppForm
        validationSchema={validationSchemer}
        initialValues={{ gender, image, phone_number, address }}
      >
        <View style={{ alignItems: "center" }}>
          <AppFormImagePicker name="image" />
        </View>

        <AppFormField
          name="phone_number"
          placeholder="Enter phone number"
          icon="phone"
        />
        <AppFormField
          name="address"
          placeholder="Enter Address"
          icon="card-account-details-outline"
        />
        <AppFormDropDown
          name="gender"
          icon="human-edit"
          placeholder="Gender"
          data={genderOptions}
          setData={setGenderOptions}
        />

        <AppFormSubmitButton title="Update" loading={loading} />
      </AppForm>
    </View>
  );
};

export default ProfileInfoForm;

const styles = StyleSheet.create({});
