import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
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
import AdsConttainer from "../../components/home/AdsContainer";
import { Modal } from "react-native";
import NearHopitals from "../../components/home/NearHopitals";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const { getUser } = useUser();
  const { getAwardPrograms, getAwardRewards, getClinics } = useHospital();
  const [awardPrograms, setAwardProgrames] = useState([]);
  const [awardRewards, setAwardRewards] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleFetch = async () => {
    const programeResponse = await getAwardPrograms();
    const rewardsResponse = await getAwardRewards();
    const clinicsResponse = await getClinics();
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
    if (!clinicsResponse.ok) {
      return console.log(
        "HOME SCREEN",
        clinicsResponse.problem,
        clinicsResponse.data
      );
    } else {
      setClinics(clinicsResponse.data.results);
    }
  };

  useEffect(() => {
    if (!user) getUser();
    handleFetch();
  }, []);
  // console.log((user));
  return (
    <AppSafeArea>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.screen}>
        <View style={styles.headecontainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.USER_NAVIGATION, {
                screen: routes.PROFILE_VIEW_SCREEN,
                params: user,
              })
            }
          >
            {user && user.profile_information.image ? (
              <Avatar.Image
                source={{ uri: user.profile_information.image }}
                size={45}
                style={{ backgroundColor: colors.primary }}
              />
            ) : (
              <Avatar.Icon
                icon="account"
                size={45}
                style={{ backgroundColor: colors.primary }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            {user && (
              <Text
                variant="titleLarge"
                style={{ fontSize: 30, color: colors.light1 }}
              >
                Welcome {user.account_information.username}
              </Text>
            )}
          </View>
          <AdsConttainer />
          <View style={styles.headerTextContainer}>
            <Text
              variant="bodyLarge"
              style={{ color: colors.white, fontWeight: "bold" }}
            >
              Dawa drop, delivering medicine to oyu door step.
            </Text>
          </View>
        </View>
        <View style={styles.bodycontainer}>
          <View style={styles.radiusContainer} />
          <View style={styles.radiusContainer1} />
          <ScrollView style={styles.scroll}>
            <RewardsCards
              rewards={awardRewards}
              backgroundColor={colors.white}
            />
            <ProgrameCards
              awardPrograms={awardPrograms}
              backgroundColor={colors.white}
            />
            <List.Item
              onPress={() => {
                navigation.navigate(routes.USER_NAVIGATION, {
                  screen: routes.USER_FIND_ACCOUNT_SCREEN,
                });
              }}
              style={styles.listItem}
              title="Create your profile"
              left={(props) => <List.Icon icon="magnify" {...props} />}
              right={(props) => <List.Icon icon="chevron-right" {...props} />}
            />
            <List.Item
              onPress={() => setShowModal(true)}
              style={styles.listItem}
              title="View Near by Clinics"
              left={(props) => (
                <List.Icon icon="hospital-building" {...props} />
              )}
              right={(props) => <List.Icon icon="chevron-right" {...props} />}
            />
          </ScrollView>

          <Modal visible={showModal} animationType="slide">
            <NearHopitals hospitals={clinics} setVisible={setShowModal} />
          </Modal>
        </View>
      </View>
    </AppSafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  radiusContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: colors.primary,
    height: 60,
    width: 60,
  },
  radiusContainer1: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: colors.light1,
    height: 60,
    width: 60,
    borderTopRightRadius: 40,
  },
  screen: {
    backgroundColor: colors.light1,
    flex: 1,
  },
  headecontainer: {
    backgroundColor: colors.primary,
    flex: 1,
    borderBottomLeftRadius: 40,
    // maxHeight: screenWidth * 2,
    // minHeight: screenWidth,
    padding: 10,
  },
  bodycontainer: {
    backgroundColor: colors.light1,
    // padding: 5,
    flex: 2,
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
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  scroll: {
    marginTop: 20,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
});
