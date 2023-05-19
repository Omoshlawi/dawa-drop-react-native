import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { Avatar, List } from "react-native-paper";
import colors from "../../utils/colors";
import { FlatList } from "react-native";
import moment from "moment/moment";
import IconText from "../../components/display/IconText";
import routes from "../../navigation/routes";

const LoyaltyPointsScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const { getUser } = useUser();
  const { user } = useUserContext();
  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      const {
        user_type_information: { patient },
      } = user;
      if (patient) {
        setData(patient.loyalty_points);
      }
    }
  }, [user]);
  if (!data) {
    return <Text>Loading ....</Text>;
  }
  const {
    total,
    total_redeemed_points,
    redeem_count,
    redeemable_points,
    points_url,
    redeem_url,
    redeem_list,
    current_program_enrolment,
  } = data;
  return (
    <View>
      {current_program_enrolment ? (
        <List.Item
          style={styles.listItem}
          title="Current Program"
          description={`${
            current_program_enrolment.program.name
          } | From ${moment(current_program_enrolment.created_at).format(
            "Do MMM YYYY"
          )}`}
          descriptionStyle={styles.listDescription}
          left={(props) => (
            <Avatar.Image
              {...props}
              source={{ uri: current_program_enrolment.program.image }}
            />
          )}
        />
      ) : (
        <List.Item
          style={styles.listItem}
          title="Current Program"
          description={"None"}
          descriptionStyle={styles.listDescription}
        />
      )}
      <List.Item
        style={styles.listItem}
        title="Total Points"
        description={`${total}`}
        descriptionStyle={styles.listDescription}
      />
      <List.Item
        style={styles.listItem}
        title="Total Redeemed Points"
        description={`${total_redeemed_points}`}
        descriptionStyle={styles.listDescription}
      />
      <List.Item
        style={styles.listItem}
        title="Total Redeemable Points"
        description={`${redeemable_points}`}
        descriptionStyle={styles.listDescription}
      />

      <View style={styles.titleRow}>
        <Text style={styles.title}> My redemption rewards</Text>
        <IconText
          icon="gift-open"
          size={20}
          disabled={!Boolean(current_program_enrolment)}
          onPress={() =>
            navigation.navigate(routes.FORMS_NAVIGATION, {
              screen: routes.FORMS_REDEEM_FORM,
              params: data,
            })
          }
        />
      </View>
      <FlatList
        data={redeem_list}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const {
            points_redeemed,
            created_at,
            reward: { name, image },
          } = item;
          return (
            <List.Item
              style={styles.listItem}
              title={name}
              description={`${points_redeemed} points`}
              descriptionStyle={styles.listDescription}
              left={(props) => (
                <List.Image source={{ uri: image }} {...props} />
              )}
              right={(props) => (
                <Text style={styles.listDescription}>
                  {moment(created_at).format("ddd Do MMM YYYY")}
                </Text>
              )}
            />
          );
        }}
      />
    </View>
  );
};

export default LoyaltyPointsScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginTop: 5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
  listDescription: {
    color: colors.medium,
  },
});
