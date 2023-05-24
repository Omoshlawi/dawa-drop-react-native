import { useContext } from "react";
import UserContext from "./UserContext";
import SettingsContext from "./SettingsContext";

export const useUserContext = () => {
  const { clearToken, user, setUser, token, setToken } =
    useContext(UserContext);
  return { clearToken, user, setUser, token, setToken };
};

export const useSettinsContext = () => {
  const { appConfiguration, setAppConfiguration, clearAppConfiguration } =
    useContext(SettingsContext);
  const { privacy } = appConfiguration;
  const { pin, setPin, isAuthenticated, clearPin, enabled } = privacy;
  const authenticate = (userPiin) => {
    setAppConfiguration({
      ...appConfiguration,
      privacy: { ...privacy, isAuthenticated: pin === userPiin },
    });
    return pin === userPiin;
  };
  const enablePin = (userPin) => {
    // enable pin
    setAppConfiguration({
      ...appConfiguration,
      privacy: { ...privacy, enabled: true },
    });
    // set pin
    setPin(userPin);
  };

  const disablePin = (userPin) => {
    if (userPin === pin) {
      setAppConfiguration({
        ...appConfiguration,
        privacy: { ...privacy, enabled: false },
      });
    }
  };
  return {
    pin,
    isAuthenticated,
    clearPin,
    authenticate,
    enablePin,
    disablePin,
  };
};
