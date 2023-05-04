import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Avatar, Card, List } from "react-native-paper";
import moment from "moment";
import ExpandableText from "../../components/display/ExpandableText";
import colors from "../../utils/colors";

const TransferDetailScreen = ({ navigation, route }) => {
  const transfer = route.params;
  const {
    patient,
    hospital: { name, address },
    reason,
    is_approved,
    approved_by,
    created_at,
    updated_at,
  } = transfer;
  return (
    <ScrollView>
      <List.Item
        style={styles.listItem}
        title={name}
        descriptionStyle={styles.text}
        description={address}
      />
      <List.Item
        style={styles.listItem}
        title="Date Requested"
        descriptionStyle={styles.text}
        description={moment(created_at).format("ddd Do MMMM YYYY")}
      />
      <List.Item
        style={styles.listItem}
        title="Status"
        descriptionStyle={styles.text}
        description={is_approved ? "Aprooved" : "Pending"}
      />

      <List.Item
        style={styles.listItem}
        title="Reason"
        descriptionStyle={styles.text}
        description={() => (
          <ExpandableText
            color={colors.primary}
            text={reason}
            threshHold={200}
            contentStyle={styles.text}
          />
        )}
      />
      {is_approved && (
        <>
          <List.Item
            style={styles.listItem}
            title="Date Aprooved"
            descriptionStyle={styles.text}
            description={moment(updated_at).format("ddd Do MMMM YYYY")}
          />
          {approved_by && (
            <Card.Title
              style={styles.listItem}
              title={approved_by.name}
              subtitle={approved_by.phone_number}
              subtitleStyle={styles.text}
              left={(props) => (
                <Avatar.Image {...props} source={{ uri: approved_by.image }} />
              )}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

export default TransferDetailScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginTop: 5,
  },
  text: {
    color: colors.medium,
  },
});
