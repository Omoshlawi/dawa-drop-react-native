import { SectionList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { toSectionListData } from "../../utils/helpers";
import colors from "../../utils/colors";

const ProfileViewScreen = ({ navigation, route }) => {
  const user = route.params;
  const data = toSectionListData(user);
  // console.log(accountAttrs, profileAttrs);
  return (
    <View>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProfileViewScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 2,
  },
  header: {
    fontSize: 32,
    backgroundColor: colors.white,
  },
});
