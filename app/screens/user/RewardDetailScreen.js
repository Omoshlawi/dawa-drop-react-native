import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { Avatar, Card } from "react-native-paper";

const RewardDetailScreen = ({ navigation, route }) => {
  const reward = route.params;
  const {
    url,
    name,
    unit_point,
    image,
    description,
    point_rate,
    members_count,
    is_default,
    created_at,
  } = reward;
  return (
    <View>
      <Card.Title
        left={(props) => <Avatar.Image {...props} source={{ uri: image }} />}
        title={name}
      />
    </View>
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
});
