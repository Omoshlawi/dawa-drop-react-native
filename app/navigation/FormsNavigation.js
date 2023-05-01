import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import routes from "./routes";
import AccountInfoForm from "../components/user/forms/AccountInfoForm";
import ProfileInfoForm from "../components/user/forms/ProfileInfoForm";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const FormsNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.FORMS_ACCOUNT_FORM}
        component={AccountInfoForm}
        options={{ headerTitle: "Edit Account Info" }}
      />
      <Screen
        name={routes.FORMS_PROFILE_FORM}
        component={ProfileInfoForm}
        options={{ headerTitle: "Edit Profile Info" }}
      />
      <Screen
        name={routes.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
    </Navigator>
  );
};

export default FormsNavigation;
