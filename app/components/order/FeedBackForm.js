import { StyleSheet } from "react-native";
import React from "react";
import { AppErrorMessage, AppFormField } from "../forms";
import RatingBar from "../ratingbar/RatingBar";
import { useFormikContext } from "formik";
const FeedBackForm = () => {
  const { values, handleChange, setFieldValue, touched, errors } =
    useFormikContext();
  return (
    <>
      <AppFormField name="code" placeholder="Delivery Code" />
      <AppFormField name="review" placeholder="Review" />
      <RatingBar
        defaultRating={values["rating"]}
        onRatingChange={(rating) => setFieldValue("rating", rating)}
      />
      <AppErrorMessage error={errors["rating"]} visible={touched["rating"]} />
    </>
  );
};

export default FeedBackForm;

const styles = StyleSheet.create({});
