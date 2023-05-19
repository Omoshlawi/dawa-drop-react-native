import { StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useHospital, useUser } from "../../../api/hooks";
import { useUserContext } from "../../../context/hooks";
import { FlatList } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import colors from "../../../utils/colors";
import IconText from "../../display/IconText";

const RedeemForm = ({ navigation, route }) => {
  const data = route.params;
  const { getAwardRewards } = useHospital();
  const { postUserInfo, getUser } = useUser();
  const { token } = useUserContext();
  const [awardRewards, setAwardRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetch = async () => {
    setLoading(true);
    const response = await getAwardRewards();
    setLoading(false);
    if (!response.ok) {
      console.log("Redeem Screen: ", response.problem, response.data);
    } else {
      setAwardRewards(response.data.results);
    }
  };
  const handleRedeem = async (reward) => {
    const {
      redeemable_points,
      redeem_url,
      current_program_enrolment: {
        program: { url: program },
      },
    } = data;
    const { url, name, point_value } = reward;
    Alert.alert(
      "Confirmation",
      `Are you sure you wana redeme points ${point_value} for ${name}`,
      [
        { text: "Cancel" },
        {
          text: "Redeeme",
          onPress: async () => {
            const response = await postUserInfo({
              url: redeem_url,
              token,
              data: { reward: url },
              multipart: false,
            });
            if (response.ok) {
              Alert.alert("Success", "Points Redeemed successfuly");
              getUser(true);
              navigation.goBack();
            }
            if (response.status === 400) {
              Alert.alert("Failure", response.data.reward.join(";"));
            }
          },
        },
      ]
    );
  };
  const isEligible = (programe_url, points) => {
    const {
      redeemable_points,
      current_program_enrolment: {
        program: { url: program },
      },
    } = data;
    return programe_url === program && redeemable_points >= points;
  };
  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View style={styles.screen}>
      <FlatList
        data={awardRewards}
        numColumns={2}
        keyExtractor={({ url }) => url}
        contentContainerStyle={styles.cardsContainer}
        refreshing={loading}
        onRefresh={handleFetch}
        renderItem={({ item }) => {
          const {
            url,
            name,
            image,
            description,
            point_value,
            created_at,
            program: { name: programe_name, url: program },
          } = item;
          return (
            <View style={styles.awardCard}>
              <View style={styles.badge}>
                <IconText
                  icon={
                    isEligible(program, point_value)
                      ? "check-decagram-outline"
                      : "alert-decagram-outline"
                  }
                  color={
                    isEligible(program, point_value)
                      ? colors.primary
                      : colors.danger
                  }
                  size={20}
                  forceEnable
                />
              </View>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: image }}
              />
              <View>
                <Text
                  variant="bodyLarge"
                  style={styles.title}
                  numberOfLines={1}
                >
                  {name}
                </Text>
                <Text
                  style={[styles.title, styles.description]}
                  numberOfLines={1}
                >
                  {`${point_value} points`}
                </Text>
                <Text
                  style={[styles.title, styles.description]}
                  numberOfLines={1}
                >
                  {`${programe_name}`}
                </Text>
                <View>
                  <Button
                    style={styles.btn}
                    textColor={colors.primary}
                    icon="lock-off"
                    mode="outlined"
                    disabled={isEligible(program, point_value) == false}
                    onPress={async () => {
                      await handleRedeem(item);
                    }}
                  >
                    Redeeme
                  </Button>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default RedeemForm;

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    opacity: 1,
  },
  awardCard: {
    width: screenWidth * 0.45,
    backgroundColor: colors.light,
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: screenWidth * 0.48,
    height: screenWidth * 0.25,
  },
  title: {
    textAlign: "center",
    color: colors.primary,
  },
  description: {
    color: colors.medium,
  },
  cardsContainer: {
    alignItems: "center",
  },
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    borderRadius: 5,
    marginHorizontal: 30,
  },
});
