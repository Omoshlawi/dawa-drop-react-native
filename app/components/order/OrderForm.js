import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  AppFormSubmitButton,
} from "../../components/forms";
import LocationPicker from "./LocationPicker";
import { List } from "react-native-paper";
import colors from "../../utils/colors";
import AppFormItemListPicker from "../forms/AppFormItemListPicker";
const validationSchemer = Yup.object().shape({
  delivery_mode: Yup.string().label("Delivery Mode").required(),
  time_slot: Yup.string().label("Delivery Time Slot").required(),
  reach_out_phone_number: Yup.string().label("Phone Number").required(),
  latitude: Yup.number().label("Latitude").required(),
  longitude: Yup.number().label("Longitude").required(),
});

const OrderForm = ({
  initialValues,
  onSubmit,
  deliveryTimeSlots,
  deliveryModes,
  loading,
  futureAppointments,
  prescription,
  update,
}) => {
  return (
    <View>
      <AppForm
        validationSchema={validationSchemer}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <AppFormItemListPicker
          title="Delivery Modes"
          icon="truck-outline"
          name="delivery_mode"
          labelExtractor={({ mode }) => mode}
          placeHolder="Choose Delivery Mode"
          data={deliveryModes}
          valueExtractor={({ url }) => url}
          renderItem={({ item }) => {
            const { mode, url } = item;
            return (
              <List.Item
                title={mode}
                style={styles.listItem}
                left={(props) => (
                  <List.Icon {...props} icon="truck" color={colors.medium} />
                )}
              />
            );
          }}
        />
        <AppFormItemListPicker
          title="Delivery Time Slots"
          icon="clock-outline"
          name="time_slot"
          labelExtractor={({ slot }) => slot}
          placeHolder="Choose Time Slot"
          data={deliveryTimeSlots}
          valueExtractor={({ url }) => url}
          renderItem={({ item }) => {
            const { slot, url } = item;
            return (
              <List.Item
                title={slot}
                style={styles.listItem}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="clock-outline"
                    color={colors.medium}
                  />
                )}
              />
            );
          }}
        />
        <AppFormField
          icon="phone"
          name="reach_out_phone_number"
          placeholder="Phone Number"
        />
        <LocationPicker />
        <AppFormSubmitButton
          title={update ? "Update" : "Order Now"}
          loading={loading}
          disabled={
            Boolean(futureAppointments) === false ||
            Boolean(prescription) == false
          }
        />
      </AppForm>
    </View>
  );
};

export default OrderForm;

const styles = StyleSheet.create({});
