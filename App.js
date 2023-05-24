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

export default function App() {
  const [token, setToken, clearToken] = useSecureStore("token", null);
  const [user, setUser] = useState();
  const [showAuth, setShowAuth] = useState(true);
  return (
    <UserContextProvider value={{ token, setToken, clearToken, user, setUser }}>
      <StatusBar style="dark" animated />
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
      <Dialog visible={showAuth} title="Please provide pin">
        <View style={styles.dialog}>
          <PinAuthForm />
        </View>
      </Dialog>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  dialog: {
    width: screenWidth * 0.85,
  },
});
