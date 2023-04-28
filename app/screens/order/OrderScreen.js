import { StyleSheet, View, Platform, Modal } from "react-native";
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
import LocationChoice from "../../components/order/LocationChoice";
import colors from "../../utils/colors";

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
  const [showModal, setShowModal] = useState(false);
  const [deliverLocation, setDeliveryLocation] = useState();
  const [showLocError, setShowLocError] = useState(false);
  const handleSubmit = async (values, { setFieldError, setFieldValue }) => {
    if (!deliverLocation) {
      return setShowLocError(true);
    }
    setShowLocError(false);
    // console.log(deliverLocation);
    setFieldValue("longitude", deliverLocation.longitude);
    setFieldValue("latitude", deliverLocation.latitude);
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
        <View>
          <List.Item
            onPress={() => {
              setShowModal(true);
            }}
            title={
              deliverLocation
                ? `Change Location (${deliverLocation.latitude},${deliverLocation.longitude})`
                : `Select Delivery Location`
            }
            titleStyle={{ color: colors.primary }}
            left={(props) => (
              <List.Icon {...props} icon="google-maps" color={colors.medium} />
            )}
          />
          {showLocError && (
            <Text style={styles.error}>
              Delivery Location must be specified
            </Text>
          )}
        </View>
        <AppFormSubmitButton title="Order Now" />
      </AppForm>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        animationType="slide"
      >
        <LocationChoice
          setVisible={setShowModal}
          onLocationChosen={setDeliveryLocation}
        />
      </Modal>
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
  error: {
    color: colors.danger,
    paddingHorizontal: 10,
  },
});
