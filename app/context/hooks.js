import { useContext } from "react";
import UserContext from "./UserContext";

export const useUserContext = () => {
  const { clearToken, user, setUser, token, setToken } =
    useContext(UserContext);
  return { clearToken, user, setUser, token, setToken };
};
