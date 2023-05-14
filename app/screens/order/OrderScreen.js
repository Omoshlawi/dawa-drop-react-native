import { StyleSheet, View, Platform, Modal } from "react-native";
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
const validationSchemer = Yup.object().shape({
  delivery_mode: Yup.string().label("Delivery Mode").required(),
  time_slot: Yup.string().label("Delivery Time Slot"),
  reach_out_phone_number: Yup.string().label("Phone Number").required(),
});

const initialValues = {
  delivery_mode: "",
  reach_out_phone_number: "",
  time_slot: "",
};

const OrderScreen = ({ navigation }) => {
  const { getDeliverModes } = useHospital();
  const [deliveryModes, setDeliveryModes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliverLocation, setDeliveryLocation] = useState();
  const [showLocError, setShowLocError] = useState(false);
  const { postOrder } = useUser();
  const { token } = useUserContext();
  const handleSubmit = async (values, { setFieldError, setFieldValue }) => {
    // validate location
    if (!deliverLocation) {
      return setShowLocError(true);
    }
    setShowLocError(false);
    // set location params
    setFieldValue("longitude", deliverLocation.longitude);
    setFieldValue("latitude", deliverLocation.latitude);
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
        return console.log("OrderScreen: ", response.problem, response.data);
      }
    }
    navigation.navigate(routes.TAB_NAVIGATION, {
      screen: routes.ACTION_MENU_SCREEN,
      params: response.data,
    });
    console.log(response.data);
  };
  const handleFetch = async () => {
    const response = await getDeliverModes({});
    if (response.ok) {
      setDeliveryModes(response.data.results);
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);

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
        <AppFormItemListPicker
          title="Delivery Modes"
          icon="apps"
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
                style={{ marginTop: 10, backgroundColor: colors.white }}
              />
            );
          }}
        />
        <AppFormField
          icon="phone"
          name="reach_out_phone_number"
          placeholder="Phone Number"
        />
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
        <AppFormSubmitButton title="Order Now" loading={loading} />
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
