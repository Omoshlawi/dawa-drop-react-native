import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import {
  Avatar,
  Badge,
  Card,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import colors from "../../utils/colors";
import moment from "moment";
import Logo from "../../components/Logo";
import ExpandableText from "../../components/display/ExpandableText";
import { ScrollView } from "react-native";
import { callNumber } from "../../utils/helpers";

const Delivery = ({ is_allocated, delivery }) => {
  if (!is_allocated) {
    return null;
  }
  const {
    delivery_id,
    created_at,
    delivery_medicine,
    prescription: { regimen, regimen_line },
    agent,
    doctor,
  } = delivery;
  return (
    <>
      <List.Item
        title="Delivery id"
        description={delivery_id}
        style={styles.listItem}
        descriptionStyle={styles.listItemDescription}
        left={(props) => (
          <List.Icon
            {...props}
            icon="truck-delivery-outline"
            color={colors.primary}
          />
        )}
      />
      <List.Item
        style={styles.listItem}
        title={regimen}
        left={(props) => (
          <List.Icon {...props} icon="medical-bag" color={colors.primary} />
        )}
        descriptionStyle={styles.listItemDescription}
        description={regimen_line}
      />
      <Card.Title
        style={styles.userCard}
        title={doctor.name}
        subtitle={`${doctor.phone_number} | Doctor`}
        subtitleVariant="bodySmall"
        subtitleStyle={{ color: colors.medium }}
        left={(props) =>
          agent.image ? (
            <Avatar.Image
              {...props}
              style={{ backgroundColor: colors.light }}
              source={{ uri: doctor.image }}
            />
          ) : (
            <Avatar.Icon
              icon="account"
              {...props}
              style={{ backgroundColor: colors.light }}
              color={colors.primary}
            />
          )
        }
        right={(props) => (
          <IconButton
            {...props}
            icon="phone"
            mode="outlined"
            containerColor={colors.primary}
            disabled={!Boolean(doctor.phone_number)}
            iconColor={colors.white}
            onPress={() => callNumber(doctor.phone_number)}
          />
        )}
      />
      <Card.Title
        style={styles.userCard}
        title={agent.name}
        subtitle={`${agent.phone_number} | Agent`}
        subtitleVariant="bodySmall"
        subtitleStyle={{ color: colors.medium }}
        left={(props) =>
          agent.image ? (
            <Avatar.Image
              {...props}
              style={{ backgroundColor: colors.light }}
              source={{ uri: agent.image }}
            />
          ) : (
            <Avatar.Icon
              icon="account-outline"
              {...props}
              style={{ backgroundColor: colors.light }}
              color={colors.primary}
            />
          )
        }
        right={(props) => (
          <IconButton
            {...props}
            mode="outlined"
            icon="phone-outline"
            disabled={!Boolean(agent.phone_number)}
            iconColor={colors.primary}
            onPress={() => callNumber(agent.phone_number)}
          />
        )}
      />
    </>
  );
};

const OrderDetailScreen = ({ navigation, route }) => {
  const {
    order_id,
    created_at,
    is_delivered,
    is_allocated,
    longitude,
    latitude,
    reach_out_phone_number,
    date_of_depletion,
    national_id,
    delivery,
    time_slot,
    delivery_mode,
  } = route.params;
  return (
    <ScrollView>
      <List.Item
        title="OrderId"
        description={order_id}
        style={styles.listItem}
        descriptionStyle={styles.listItemDescription}
        left={(props) => (
          <List.Icon {...props} icon="shopping" color={colors.primary} />
        )}
      />
      <List.Item
        title="Date Odered"
        description={moment(created_at).format("Do MMM YYYY, h:mm a")}
        style={styles.listItem}
        descriptionStyle={styles.listItemDescription}
        left={(props) => (
          <List.Icon {...props} icon="calendar" color={colors.primary} />
        )}
      />
      <List.Item
        title="Time Slot"
        description={time_slot ? time_slot.slot : "Any"}
        style={styles.listItem}
        descriptionStyle={styles.listItemDescription}
        left={(props) => (
          <List.Icon {...props} icon="clock" color={colors.primary} />
        )}
      />
      <List.Item
        title="Allocation Status"
        description={is_allocated ? "Allocated" : "pending"}
        style={styles.listItem}
        descriptionStyle={styles.listItemDescription}
        left={(props) => (
          <List.Icon {...props} icon="progress-clock" color={colors.primary} />
        )}
      />
      <List.Item
        title="Delivery Status"
        description={is_delivered ? "delivered" : "pending"}
        style={styles.listItem}
        descriptionStyle={styles.listItemDescription}
        left={(props) => (
          <List.Icon {...props} icon="progress-clock" color={colors.primary} />
        )}
      />
      <List.Item
        title="Delivery Mode"
        description={delivery_mode ? delivery_mode.mode : "Any"}
        style={styles.listItem}
        descriptionStyle={styles.listItemDescription}
        left={(props) => (
          <List.Icon {...props} icon="truck" color={colors.primary} />
        )}
      />
      <List.Item
        title="Phone Number"
        description={reach_out_phone_number}
        style={styles.listItem}
        descriptionStyle={styles.listItemDescription}
        left={(props) => (
          <List.Icon {...props} icon="phone" color={colors.primary} />
        )}
      />
      <List.Item
        title="Delivery Location"
        description={`(${parseFloat(latitude).toFixed(2)}, ${parseFloat(
          longitude
        ).toFixed(2)})`}
        style={styles.listItem}
        descriptionStyle={styles.listItemDescription}
        left={(props) => (
          <List.Icon {...props} icon="google-maps" color={colors.primary} />
        )}
      />
      <Delivery is_allocated={is_allocated} delivery={delivery} />
    </ScrollView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 10,
  },
  valuesRow: {
    flexDirection: "row",
    padding: 5,
  },
  value: {
    fontWeight: "bold",
  },
  orderCard: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
  userCard: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
  listItem: {
    backgroundColor: colors.white,
    marginTop: 5,
  },
  listItemDescription: {
    color: colors.medium,
  },
});
