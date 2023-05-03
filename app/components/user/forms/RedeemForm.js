import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useHospital } from "../../../api/hooks";
import { useUserContext } from "../../../context/hooks";
import { FlatList } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import colors from "../../../utils/colors";
import IconText from "../../display/IconText";

const RedeemForm = ({ navigation, route }) => {
  const data = route.params;
  const { getAwardRewards } = useHospital();
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
  const handleRedeem = async () => {};
  const isEligible = (programe_url) => {
    const {
      current_program_enrolment: {
        program: { url: program },
      },
    } = data;
    return programe_url === program;
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
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.awardCard}>
                <View style={styles.badge}>
                  <IconText
                    icon={
                      isEligible(program)
                        ? "check-decagram-outline"
                        : "alert-decagram-outline"
                    }
                    color={isEligible(program) ? colors.primary : colors.danger}
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
                </View>
              </View>
            </TouchableOpacity>
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
    backgroundColor: colors.background,
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
});
