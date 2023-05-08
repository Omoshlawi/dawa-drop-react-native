import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { List, Text } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import moment from "moment/moment";
import { Image } from "react-native";
import ExpandableText from "../../components/display/ExpandableText";
import colors from "../../utils/colors";
import { FlatList } from "react-native";
import RewardsCards from "../../components/home/RewardsCards";

const ProgrameDetailScreen = ({ navigation, route }) => {
  const program = route.params;
  const {
    name,
    unit_point,
    image,
    description,
    point_rate,
    rewards,
    members_count,
    is_default,
    created_at,
  } = program;
  return (
    <ScrollView>
      <View>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <Text variant="titleLarge" style={styles.title}>
        {name}
      </Text>
      <View style={styles.textContainer}>
        <List.Item
          title={name}
          description={is_default ? "Default" : ""}
          style={styles.listItem}
          descriptionStyle={styles.description}
        />
        <List.Item
          title="Unit Point awarded"
          description={unit_point}
          style={styles.listItem}
          descriptionStyle={styles.description}
        />
        <List.Item
          title="Point Rate"
          description={point_rate}
          style={styles.listItem}
          descriptionStyle={styles.description}
        />
        <List.Item
          title="Date created"
          description={moment(created_at).format("Do MMMM YYYY")}
          style={styles.listItem}
          descriptionStyle={styles.description}
        />
        <List.Item
          title="Members"
          description={`${members_count}`}
          style={styles.listItem}
          descriptionStyle={styles.description}
        />
        <List.Item
          title="Rewards"
          description={`${rewards.length}`}
          style={styles.listItem}
          descriptionStyle={styles.description}
        />
      </View>
      <List.Item
        title="Description"
        style={{ backgroundColor: colors.white, marginBottom: 10 }}
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
      <RewardsCards rewards={rewards} backgroundColor={colors.white} />
    </ScrollView>
  );
};

export default ProgrameDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    margin: 10,
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  text: {
    padding: 2,
    borderWidth: 1,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  listItem: {
    margin: 2,
    width: screenWidth * 0.49,
    backgroundColor: colors.white,
  },
  description: {
    color: colors.medium,
  },
});
