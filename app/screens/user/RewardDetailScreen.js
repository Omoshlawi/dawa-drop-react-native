import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { Avatar, Card, List } from "react-native-paper";
import moment from "moment/moment";
import ExpandableText from "../../components/display/ExpandableText";

const RewardDetailScreen = ({ navigation, route }) => {
  const reward = route.params;
  const {
    url,
    name,
    image,
    description,
    point_value,
    created_at,
    program,
    max_redemptions,
  } = reward;
  return (
    <ScrollView>
      <List.Item
        style={styles.listIntem}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{ uri: image }}
            style={styles.image}
          />
        )}
        title={name}
        description={program.name}
        descriptionStyle={styles.description}
      />
      <List.Item
        style={styles.listIntem}
        // left={(props) => <Avatar.Image {...props} source={{ uri: image }} />}
        title="Awarded from"
        description={moment(created_at).format("Do MMMM YYYY")}
        descriptionStyle={styles.description}
      />
      <List.Item
        style={styles.listIntem}
        // left={(props) => <Avatar.Image {...props} source={{ uri: image }} />}
        title="Points Value"
        description={point_value}
        descriptionStyle={styles.description}
      />
      <List.Item
        style={styles.listIntem}
        // left={(props) => <Avatar.Image {...props} source={{ uri: image }} />}
        title="Total allowed redemtion"
        description={max_redemptions}
        descriptionStyle={styles.description}
      />
      <List.Item
        style={styles.listIntem}
        // left={(props) => <Avatar.Image {...props} source={{ uri: image }} />}
        title="Description"
        description={() => (
          <ExpandableText
            color={colors.primary}
            text={description ? description : "None"}
            threshHold={200}
            contentStyle={styles.description}
          />
        )}
        descriptionStyle={styles.description}
      />
    </ScrollView>
  );
};

export default RewardDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
  },
  headerRow: {
    flexDirection: "row",
  },
  listIntem: {
    backgroundColor: colors.white,
    marginTop: 5,
  },
  description: {
    color: colors.medium,
  },
  image: {
    backgroundColor: colors.background,
    margin:5
  },
});
