import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/tab/HomeScreen";
import routes from "./routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utils/colors";
import AccountScreen from "../screens/tab/AccountScreen";
import SearchScreen from "../screens/tab/SearchScreen";
import { Image, View, StyleSheet } from "react-native";
import ActionMenuScreen from "../screens/tab/ActionMenuScreen";
import { useUserContext } from "../context/hooks";
import { useUser } from "../api/hooks";
import { useEffect, useState } from "react";
import AgentHome from "../screens/tab/AgentHome";

const Tab = createBottomTabNavigator();
const Navigator = Tab.Navigator;
const Screen = Tab.Screen;
function BottomTabNavigation() {
  const { user } = useUserContext();
  const { getUser } = useUser();
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      const {
        profile_information: { user_type },
      } = user;
      setUserType(user_type);
    }
  }, [user]);

  return (
    <Navigator
      screenOptions={{
        // tabBarInactiveBackgroundColor: colors.light,
        // tabBarActiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.primary,
        // tabBarInactiveTintColor: colors.black,
        headerShown: false,
      }}
    >
      {userType === "patient" && (
        <>
          <Screen
            component={HomeScreen}
            name={routes.HOME_SCREEN}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Screen
            component={ActionMenuScreen}
            name={routes.ACTION_MENU_SCREEN}
            options={{
              tabBarLabel: "Search",
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <View style={styles.mainTabBar}>
                  <Image
                    style={{ width: size, height: size }}
                    source={require("../assets/heart.png")}
                  />
                </View>
              ),
            }}
          />
        </>
      )}
      {userType === "agent" && (
        <>
          <Screen
            component={AgentHome}
            name={routes.TAB_AGENT_HOME_SCREEN}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
        </>
      )}
      <Screen
        component={AccountScreen}
        name={routes.ACCOUNT_SCREEN}
        options={{
          title: "User Center",
          tabBarLabel: "Account",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  mainTabBar: {
    borderRadius: 70 * 0.5,
    backgroundColor: colors.secondary,
    width: 70,
    height: 70,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    borderWidth: 7,
    borderColor: colors.white,
  },
});

export default BottomTabNavigation;
