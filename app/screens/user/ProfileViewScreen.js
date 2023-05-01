import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProfileViewScreen = ({ navigation, route }) => {
  const user = route.params;
  return (
    <View>
      <Text>ProfileViewScreen</Text>
    </View>
  );
};

export default ProfileViewScreen;

const styles = StyleSheet.create({});
