import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { UserContextProvider } from "./app/context/UserContext";
import useSecureStore from "./app/hooks/useSecureStore";
import MainNavigation from "./app/navigation/MainNavigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [token, setToken, clearToken] = useSecureStore("token", null);
  const [user, setUser] = useState();
  return (
    <UserContextProvider value={{ token, setToken, clearToken, user, setUser }}>
      <StatusBar style="dark" animated />
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </UserContextProvider>
  );
}
