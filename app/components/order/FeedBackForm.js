import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppForm, AppFormField, AppFormSubmitButton } from "../forms";
import RatingBar from "../ratingbar/RatingBar";
import { useFormikContext } from "formik";
import * as Yup from "yup";
const validationSchemer = Yup.object().shape({
  code: Yup.string().label("Delivery Code").required(),
  review: Yup.string().label("Review").required(),
  rating: Yup.number().required().label("Rating"),
});

const FeedBackForm = () => {
  const { values, setFieldValue, handleChange } = useFormikContext();
  return (
    <>
      <AppFormField name="code" placeholder="Delivery Code" />
      <AppFormField name="review" placeholder="Review" />
      <RatingBar
        defaultRating={values["rating"]}
        onRatingChange={handleChange("rating")}
      />
      
    </>
  );
};

export default FeedBackForm;

const styles = StyleSheet.create({});
