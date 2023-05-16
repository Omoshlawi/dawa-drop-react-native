import { StyleSheet, View, Platform, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
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
import { useHospital, useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import routes from "../../navigation/routes";

import * as Yup from "yup";
import AppPicker from "../../components/input/AppPicker";
import AppFormItemListPicker from "../../components/forms/AppFormItemListPicker";
import TextInputField from "../../components/input/TextInputField";
import { screenWidth } from "../../utils/contants";
import LocationPicker from "../../components/order/LocationPicker";
const validationSchemer = Yup.object().shape({
  delivery_mode: Yup.string().label("Delivery Mode").required(),
  time_slot: Yup.string().label("Delivery Time Slot").required(),
  reach_out_phone_number: Yup.string().label("Phone Number").required(),
  latitude: Yup.number().label("Latitude").required(),
  longitude: Yup.number().label("Longitude").required(),
});

const initialValues = {
  delivery_mode: "",
  reach_out_phone_number: "",
  time_slot: "",
  latitude: undefined,
  longitude: undefined,
};

const OrderScreen = ({ navigation }) => {
  const { getDeliveryModes, getDeliveryTimeSlots } = useHospital();
  const [deliveryModes, setDeliveryModes] = useState([]);
  const [deliveryTimeSlots, setDeliveryTimeSlots] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState(null);
  const [prescription, setPrescription] = useState();
  const [loading, setLoading] = useState(false);
  const { postOrder, getPrescriptions, getAppointments } = useUser();
  const { token } = useUserContext();
  const handleSubmit = async (values, { setFieldError }) => {
    // post to server
    setLoading(true);
    const response = await postOrder(token, values);
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
        if (response.status === 403) {
          Alert.alert("Error", response.data.detail);
        }
      }
      return console.log("OrderScreen: ", response.problem, response.data);
    }
    navigation.navigate(routes.TAB_NAVIGATION, {
      screen: routes.ACTION_MENU_SCREEN,
      params: response.data,
    });
    console.log(response.data);
  };
  const handleFetch = async () => {
    const response = await getDeliveryModes({});
    if (response.ok) {
      setDeliveryModes(response.data.results);
    }
    const slotsResponse = await getDeliveryTimeSlots({});
    if (slotsResponse.ok) {
      setDeliveryTimeSlots(slotsResponse.data.results);
    }
    const prescResponse = await getPrescriptions(token, {});
    if (prescResponse.ok) {
      setPrescription(
        prescResponse.data.results.find(({ is_current }) => is_current === true)
      );
    }
    const appResponse = await getAppointments(token, {
      next_appointment_date_from: moment().format("YYYY-MM-DD"),
      next_appointment_date_to: moment().add(1, "days").format("YYYY-MM-DD"),
      type: "Refill",
    });
    if (appResponse.ok) {
      setFutureAppointments(
        appResponse.data.count > 0 ? appResponse.data.results[0] : null
      );
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <Logo />
        <View style={styles.prefilled}>
          <List.Item
            title="Current Prescription"
            style={styles.prefiledItem}
            description={prescription ? prescription.regimen.regimen : "None"}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
          />
          <List.Item
            title={
              futureAppointments
                ? `${futureAppointments.type.type} Appointment`
                : ""
            }
            style={styles.prefiledItem}
            description={
              futureAppointments
                ? moment(futureAppointments.next_appointment_date).format(
                    "dddd Do MMMM YYYY"
                  )
                : "Not Eligibe"
            }
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
          />
        </View>
        <Text style={styles.headerText}>Fill Order Details</Text>
      </View>
      <AppForm
        validationSchema={validationSchemer}
        initialValues={initialValues}
        onSubmit={handleSubmit}
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
          title="Order Now"
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
  listItem: {
    marginTop: 5,
    backgroundColor: colors.white,
  },
  listTitle: { color: colors.primary },
  listDescription: { color: colors.medium },
  prefilled: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  prefiledItem: {
    width: screenWidth * 0.47,
    marginHorizontal: 2,
    backgroundColor: colors.white,
  },
});
