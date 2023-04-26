import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import { useUser } from "../../api/hooks";
import { Avatar, IconButton } from "react-native-paper";
import { useUserContext } from "../../context/hooks";
import colors from "../../utils/colors";
import routes from "../../navigation/routes";

const HomeScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const { getUser } = useUser();

  useEffect(() => {
    if (!user) getUser();
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
});
