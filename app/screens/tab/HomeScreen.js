import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import { useHospital, useUser } from "../../api/hooks";
import { Avatar, Card, IconButton, List, Text } from "react-native-paper";
import { useUserContext } from "../../context/hooks";
import colors from "../../utils/colors";
import routes from "../../navigation/routes";
import SearchHeader from "../../components/SearchHeader";
import { screenWidth } from "../../utils/contants";
import ProgrameCards from "../../components/home/ProgrameCards";
import RewardsCards from "../../components/home/RewardsCards";
import AddsContainer from "../../components/home/AdsContainer";

const HomeScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const { getUser } = useUser();
  const { getAwardPrograms, getAwardRewards } = useHospital();
  const [awardPrograms, setAwardProgrames] = useState([]);
  const [awardRewards, setAwardRewards] = useState([]);

  const handleFetch = async () => {
    const programeResponse = await getAwardPrograms();
    const rewardsResponse = await getAwardRewards();
    if (!programeResponse.ok) {
      return console.log(
        "HOME SCREEN",
        programeResponse.problem,
        programeResponse.data
      );
    } else {
      setAwardProgrames(programeResponse.data.results);
    }
    if (!rewardsResponse.ok) {
      return console.log(
        "HOME SCREEN",
        rewardsResponse.problem,
        rewardsResponse.data
      );
    } else {
      setAwardRewards(rewardsResponse.data.results);
    }
  };

  useEffect(() => {
    if (!user) getUser();
    handleFetch();
  }, []);

  return (
    <AppSafeArea>
      <View style={styles.headecontainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.USER_NAVIGATION, {
              screen: routes.PROFILE_SCREEN,
              params: user,
            })
          }
        >
          {user && user.profile.image ? (
            <Avatar.Image source={{ uri: user.profile.image }} size={45} />
          ) : (
            <Avatar.Icon
              icon="account"
              size={45}
              style={{ backgroundColor: colors.primary }}
            />
          )}
        </TouchableOpacity>
        <IconButton
          icon="magnify"
          style={styles.searchButn}
          iconColor={colors.white}
          mode="outlined"
          onPress={() => {
            navigation.navigate(routes.SEARCH_SCREEN);
          }}
          size={30}
        />
      </View>
      <RewardsCards rewards={awardRewards} />
      <ProgrameCards awardPrograms={awardPrograms} />
      <List.Item
        onPress={() => {}}
        style={styles.listItem}
        title="View Near by Clinics"
        left={(props) => <List.Icon icon="hospital-building" {...props} />}
        right={(props) => <List.Icon icon="chevron-right" {...props} />}
      />
      <AddsContainer />
    </AppSafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  searchButn: {
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
  },
  listItem: {
    backgroundColor: colors.white,
    margin: 5,
    padding: 5,
    height: 80,
    justifyContent: "center",
  },
});
