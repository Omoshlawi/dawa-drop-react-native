import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/user/ProfileScreen";
import routes from "./routes";
import ProfileViewScreen from "../screens/user/ProfileViewScreen";
import ProgrameDetailScreen from "../screens/user/ProgrameDetailScreen";
import RewardDetailScreen from "../screens/user/RewardDetailScreen";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const UserNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Screen
        name={routes.PROFILE_VIEW_SCREEN}
        component={ProfileViewScreen}
        options={{ title: "Information Center" }}
      />
      <Screen
        name={routes.PROGRAM_DETAIL_SCREEN}
        component={ProgrameDetailScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <Screen
        name={routes.REWARD_DETAIL_SCREEN}
        component={RewardDetailScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </Navigator>
  );
};

export default UserNavigation;
