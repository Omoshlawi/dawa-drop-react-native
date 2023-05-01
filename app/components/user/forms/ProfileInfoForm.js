import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppFormImagePicker from "../../forms/AppFormImagePicker";
import AppFormDropDown from "../../forms/AppFormDropDown";
import * as Yup from "yup";
import AppForm from "../../forms/AppForm";
import AppFormField from "../../forms/AppFormField";
import AppFormSubmitButton from "../../forms/AppFormSubmitButton";
import Logo from "../../Logo";

import { httpService, useUser } from "../../../api/hooks";
import { useUserContext } from "../../../context/hooks";
import { getFormFileFromUri } from "../../../utils/helpers";
const validationSchemer = Yup.object().shape({
  address: Yup.string().label("Last Name"),
  image: Yup.string().label("Image").required(),
  gender: Yup.string().label("Gender").required(),
  phone_number: Yup.string().label("Phone number").required(),
});

const ProfileInfoForm = ({ navigation, route }) => {
  const { url, gender, image, phone_number, address } = route.params;
  const [genderOptions, setGenderOptions] = useState([
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]);
  const [loading, setLoading] = useState(false);
  const { token } = useUserContext();
  const { getUser, putUserInfo } = useUser();

  const handleSubmit = async (values, { setFieldError }) => {
    // return console.log(values);

    const { gender, image, phone_number, address } = values;
    const formData = new FormData();
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("phone_number", phone_number);
    formData.append("image", getFormFileFromUri(image));
    setLoading(true);
    const response = await putUserInfo({
      data: formData,
      token,
      url,
      multipart: true,
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
        return console.log(
          "Profile Info form: ",
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
      <AppForm
        validationSchema={validationSchemer}
        initialValues={{ gender, image, phone_number, address }}
        onSubmit={handleSubmit}
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
