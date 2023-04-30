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

const Delivery = ({ is_approved, delivery }) => {
  if (!is_approved) {
    return null;
  }
  const {
    delivery_id,
    created_at,
    delivery_medicine,
    instruction,
    agent,
    doctor,
  } = delivery;
  return (
    <>
      <View style={styles.title}>
        <Text variant="titleLarge">Delivery: {delivery_id}</Text>
      </View>
      <ExpandableText title={"Medicine Delivered"} text={delivery_medicine} />
      <ExpandableText title={"Instruction"} text={instruction} />
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
            mode="outlined"
            icon="phone"
            iconColor={colors.primary}
            onPress={() => callNumber(agent.phone_number)}
          />
        )}
      />
      {/* <View style={styles.detailsRow}>
        <View>
          <View style={styles.valuesRow}>
            <Text>Deliver Id: </Text>
            <Text style={styles.value}>{delivery_id}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Date Odered:</Text>
            <Text style={styles.value}>
              {moment(created_at).format("Do MMM YYYY, h:mm a")}
            </Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Date Finished: </Text>
            <Text style={styles.value}>
              {moment(date_of_depletion).format("Do MMM YYYY")}
            </Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Aprooved Status: </Text>
            <Text
              style={[
                { borderRadius: 5, padding: 2, color: colors.white },
                is_approved
                  ? { backgroundColor: colors.success }
                  : { backgroundColor: colors.danger },
              ]}
            >
              {is_approved ? "aprooved" : "pending"}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.valuesRow}>
            <Text>National Id: </Text>
            <Text style={styles.value}>{national_id}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Phone Number: </Text>
            <Text style={styles.value}>{reach_out_phone_number}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Delivery Location: </Text>
            <Text style={styles.value}>{`(${parseFloat(latitude).toFixed(
              2
            )}, ${parseFloat(longitude).toFixed(2)})`}</Text>
          </View>

          <View style={styles.valuesRow}>
            <Text>Delivery Status: </Text>
            <Text
              style={[
                { borderRadius: 5, padding: 2, color: colors.white },
                is_delivered
                  ? { backgroundColor: colors.success }
                  : { backgroundColor: colors.danger },
              ]}
            >
              {is_delivered ? "delivered" : "pending"}
            </Text>
          </View>
        </View>
      </View> */}
    </>
  );
};

const OrderDetailScreen = ({ navigation, route }) => {
  const {
    order_id,
    created_at,
    is_delivered,
    is_approved,
    longitude,
    latitude,
    reach_out_phone_number,
    date_of_depletion,
    national_id,
    delivery,
  } = route.params;
  return (
    <ScrollView>
      <View style={styles.logo}>
        <Logo variant="black" />
      </View>
      <View style={styles.title}>
        <Text variant="titleLarge">Order: {order_id}</Text>
      </View>
      <View style={styles.detailsRow}>
        {/* col1 */}
        <View>
          <View style={styles.valuesRow}>
            <Text>Order Id: </Text>
            <Text style={styles.value}>{order_id}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Date Odered:</Text>
            <Text style={styles.value}>
              {moment(created_at).format("Do MMM YYYY, h:mm a")}
            </Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Date Finished: </Text>
            <Text style={styles.value}>
              {moment(date_of_depletion).format("Do MMM YYYY")}
            </Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Aprooved Status: </Text>
            <Text
              style={[
                { borderRadius: 5, padding: 2, color: colors.white },
                is_approved
                  ? { backgroundColor: colors.success }
                  : { backgroundColor: colors.danger },
              ]}
            >
              {is_approved ? "aprooved" : "pending"}
            </Text>
          </View>
        </View>
        {/* Col 2 */}
        <View>
          <View style={styles.valuesRow}>
            <Text>National Id: </Text>
            <Text style={styles.value}>{national_id}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Phone Number: </Text>
            <Text style={styles.value}>{reach_out_phone_number}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Delivery Location: </Text>
            <Text style={styles.value}>{`(${parseFloat(latitude).toFixed(
              2
            )}, ${parseFloat(longitude).toFixed(2)})`}</Text>
          </View>

          <View style={styles.valuesRow}>
            <Text>Delivery Status: </Text>
            <Text
              style={[
                { borderRadius: 5, padding: 2, color: colors.white },
                is_delivered
                  ? { backgroundColor: colors.success }
                  : { backgroundColor: colors.danger },
              ]}
            >
              {is_delivered ? "delivered" : "pending"}
            </Text>
          </View>
        </View>
      </View>
      <Delivery is_approved={is_approved} delivery={delivery} />
    </ScrollView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
  },
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
  title: {
    alignItems: "center",
    padding: 10,
  },
  userCard: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
});
