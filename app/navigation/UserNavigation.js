import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/user/ProfileScreen";
import routes from "./routes";
import PaymentDetailScreen from "../screens/user/PaymentDetailScreen";
import ProfileViewScreen from "../screens/user/ProfileViewScreen";

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
        options={{ title: "Your profile" }}
      />
      <Screen
        name={routes.PAYMENT_SCREEN}
        component={PaymentDetailScreen}
        options={({ route }) => ({
          title: route.params.payment_id,
        })}
      />
    </Navigator>
  );
};

export default UserNavigation;
