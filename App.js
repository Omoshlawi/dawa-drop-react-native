import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { UserContextProvider } from "./app/context/UserContext";
import useSecureStore from "./app/hooks/useSecureStore";
import MainNavigation from "./app/navigation/MainNavigation";
import { StatusBar } from "expo-status-bar";
import Dialog from "./app/components/dialog/Dialog";
import { StyleSheet, View, Text } from "react-native";
import { screenWidth } from "./app/utils/contants";
import PinAuthForm from "./app/components/user/forms/PinAuthForm";
import { SettingsContextProvider } from "./app/context/SettingsContext";
import useAsyncStorage from "./app/hooks/useAsyncStorage";

export default function App() {
  const [token, setToken, clearToken] = useSecureStore("token", null);
  const [pin, setPin, clearPin] = useSecureStore("pin", null);
  const [appConf, setAppConf, clearAppConf] = useAsyncStorage("config", {
    privacy: {
      isAuthenticated: false,
      pin,
      setPin,
      clearPin,
      enabled: false,
    },
  });
  const [user, setUser] = useState();
  console.log(appConf);
  return (
    <UserContextProvider value={{ token, setToken, clearToken, user, setUser }}>
      <SettingsContextProvider
        value={{
          appConfiguration: appConf,
          setAppConfiguration: setAppConf,
          clearAppConfiguration: clearAppConf,
        }}
      >
        <StatusBar style="dark" animated />
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
        <Dialog
          visible={!appConf.privacy.isAuthenticated && appConf.privacy.enabled}
          title="Please provide pin"
        >
          <View style={styles.dialog}>
            <PinAuthForm />
          </View>
        </Dialog>
      </SettingsContextProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  dialog: {
    width: screenWidth * 0.85,
  },
});
