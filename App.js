import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { UserContextProvider } from "./app/context/UserContext";
import useSecureStore from "./app/hooks/useSecureStore";
import MainNavigation from "./app/navigation/MainNavigation";
import { StatusBar } from "expo-status-bar";
import Dialog from "./app/components/dialog/Dialog";
import { StyleSheet, View, Text, AppState } from "react-native";
import { screenWidth } from "./app/utils/contants";
import PinAuthForm from "./app/components/user/forms/PinAuthForm";
import { SettingsContextProvider } from "./app/context/SettingsContext";
import useAsyncStorage from "./app/hooks/useAsyncStorage";

export default function App() {
  const appStateDubscriptionRef = useRef(null);
  const [token, setToken, clearToken] = useSecureStore("token", null);
  const [appConf, setAppConf, clearAppConf] = useAsyncStorage("config", {
    privacy: {
      isAuthenticated: false,
      pin: null,
      enabled: false,
    },
  });
  const [user, setUser] = useState();

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      // App gains focus
      // Perform your login logic here
      console.log("App is active, state is ", appConf);
    } else if (nextAppState.match(/inactive|background/)) {
      // App goes to background or is closed
      // Perform any necessary cleanup or logout logic here

      if (appConf && appConf.privacy.enabled) {
        console.log("App is in background or closed, state is ", appConf);
        setAppConf({
          ...appConf,
          privacy: { ...appConf.privacy, isAuthenticated: false },
        });
      }
    }
  };

  useEffect(() => {
    // // Subscribe to app state changes
    appStateDubscriptionRef.current = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    if (
      appConf &&
      appStateDubscriptionRef.current &&
      !appConf.privacy.enabled
    ) {
      appStateDubscriptionRef.current.remove();
    }
    // // Clean up the subscription when component unmounts
    // return () => {
    //   if (
    //     appConf &&
    //     appStateDubscriptionRef.current &&
    //     !appConf.privacy.enabled
    //   ) {
    //     appStateDubscriptionRef.current.remove();
    //   }
    // };
  }, [appConf]);

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
