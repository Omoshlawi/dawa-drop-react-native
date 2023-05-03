import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../utils/colors";
import AppSafeArea from "../../components/AppSafeArea";
import { Surface, Text } from "react-native-paper";
import { menItems } from "../../utils/contants";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";

const itemWidth = Dimensions.get("window").width / 2 - 5;
const ActionMenuScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const { getUser } = useUser();
  const [points, setPoints] = useState({
    value: 0,
    show: false,
  });
  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      if (user) {
        const {
          profile_information: { user_type },
        } = user;
        if (user_type == "patient") {
          const {
            user_type_information: { patient },
          } = user;
          if (patient) {
            const {
              loyalty_points: { redeemable_points: value },
            } = patient;
            setPoints({ ...points, value });
          }
        }
      }
    }
  }, [user]);

  return (
    <AppSafeArea>
      <View style={styles.screen}>
        <View>
          <View style={styles.pointsContainer}>
            <Surface style={styles.surface}>
              <Text style={styles.pointsText}>
                {points.show ? points.value : "******"}
              </Text>
              <TouchableOpacity
                style={styles.pointButton}
                onPress={() => setPoints({ ...points, show: !points.show })}
              >
                <Text>{points.show ? "Hide points" : "Show Points"}</Text>
              </TouchableOpacity>
            </Surface>
          </View>
          {/* Menu */}
          <FlatList
            data={menItems}
            keyExtractor={({ id }) => id}
            contentContainerStyle={styles.itemsContainer}
            numColumns={2}
            renderItem={({ item }) => {
              const { title, image } = item;
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      item.destination.parentRoute,
                      item.destination.nestedRoute
                    )
                  }
                >
                  <View style={styles.item}>
                    <Image
                      resizeMode="contain"
                      style={styles.image}
                      source={image}
                    />
                    <Text variant="titleMedium" style={styles.title}>
                      {title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TouchableOpacity>
          <View style={styles.dashBoard}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require("../../assets/bar-graph.png")}
            />
            <Text variant="titleLarge" style={styles.title}>
              Dashboard
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </AppSafeArea>
  );
};

export default ActionMenuScreen;

const styles = StyleSheet.create({
  itemsContainer: {
    padding: 10,
    alignItems: "center",
  },
  item: {
    width: itemWidth - 5,
    backgroundColor: colors.background,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: itemWidth,
    height: 60,
  },
  title: {
    color: colors.medium,
  },
  screen: {
    // backgroundColor: colors.white,
    flex: 1,
  },
  dashBoard: {
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    margin: 5,
  },
  pointsContainer: {
    margin: 20,
    alignItems: "center",
  },
  pointsText: {
    padding: 15,
    flex: 1,
    textAlign: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
    color: colors.primary,
  },
  pointButton: {
    backgroundColor: colors.secondary,
    padding: 15,
  },
  surface: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 10,
    width: itemWidth,
    borderRadius: 10,
    overflow: "hidden",
  },
});
