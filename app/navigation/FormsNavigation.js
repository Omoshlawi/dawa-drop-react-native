import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import routes from "./routes";
import AccountInfoForm from "../components/user/forms/AccountInfoForm";
import ProfileInfoForm from "../components/user/forms/ProfileInfoForm";
import NextOfKeenForm from "../components/user/forms/NextOfKeenForm";
import RedeemForm from "../components/user/forms/RedeemForm";

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
        name={routes.FORMS_NEXT_OF_KEEN_FORM}
        component={NextOfKeenForm}
        options={{ headerTitle: "Update Next of keen" }}
      />
      <Screen
        name={routes.FORMS_REDEEM_FORM}
        component={RedeemForm}
        options={{ headerTitle: "Redeem Points" }}
      />
    </Navigator>
  );
};

export default FormsNavigation;
