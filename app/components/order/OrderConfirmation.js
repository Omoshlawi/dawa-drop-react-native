import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, IconButton, List, Text } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import colors from "../../utils/colors";
import { useFormikContext } from "formik";
import { AppFormSubmitButton } from "../forms";
import AppButton from "../input/AppButton";

const OrderConfirmation = ({
  deliveryTimeSlots = [],
  deliveryModes = [],
  onSubmit,
}) => {
  const { values, handleSubmit } = useFormikContext();
  const slot = deliveryTimeSlots.find(({ url }) => url === values["time_slot"]);
  const mode = deliveryModes.find(({ url }) => url === values["delivery_mode"]);

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.text}>
        Please verify your order details
      </Text>
      <List.Item
        style={styles.listItem}
        title="Delivery Mode"
        description={mode ? mode.mode : "None"}
        left={(props) => <List.Icon icon="truck" {...props} />}
      />
      <List.Item
        style={styles.listItem}
        title="Time Slot"
        description={slot ? slot.slot : "None"}
        left={(props) => <List.Icon icon="clock" {...props} />}
      />
      <List.Item
        style={styles.listItem}
        title="Phone Number"
        description={
          values["reach_out_phone_number"]
            ? values["reach_out_phone_number"]
            : "None"
        }
        left={(props) => <List.Icon icon="phone" {...props} />}
      />
      <List.Item
        style={styles.listItem}
        title="Delivery Location"
        description={
          values["latitude"] || values["longitude"]
            ? `(${values["latitude"]}, ${values["longitude"]})`
            : "None"
        }
        left={(props) => <List.Icon icon="hospital-marker" {...props} />}
      />
      <AppButton
        title="Submit"
        onPress={(events) => {
          onSubmit(events);
          handleSubmit(events);
        }}
      />
    </View>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.7,
  },
  listItem: {
    backgroundColor: colors.light,
    marginBottom: 10,
  },
  text: {
    padding: 10,
  },
});
