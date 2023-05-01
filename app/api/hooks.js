import { useUserContext } from "../context/hooks";
import apiClient from "./client";
const getAuthHeader = (token) => ({ Authorization: `Token ${token}` });

export const useUser = () => {
  const { setUser, token, setToken, clearToken, user } = useUserContext();
  const login = (data) => apiClient.post("users/login/", data);
  const register = (data) => apiClient.post("users/register/", data);
  const logout = () => clearToken(true);
  const getUser = async (force) => {
    console.log(force);
    if (!force && user) {
      return;
    }
    const resposnse = await apiClient.get(
      "users/profile-view/",
      {},
      {
        headers: getAuthHeader(token),
      }
    );
    if (!resposnse.ok) {
      console.log("apiHooks->useUser", resposnse.problem, resposnse.data);
    }
    setUser(resposnse.data);
  };
  const putUser = async (userData) =>
    await apiClient.put("users/profile/", userData, {
      headers: {
        ...getAuthHeader(token),
        "Content-Type": "multipart/form-data",
      },
    });
  const putUserInfo = ({ url, token, data, multipart = false }) => {
    if (multipart) {
      return apiClient.put(url, data, {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return apiClient.put(url, data, {
      headers: {
        ...getAuthHeader(token),
      },
    });
  };
  const getOrders = (token, params) =>
    apiClient.get("orders/", params, { headers: getAuthHeader(token) });
  const getPendingOrders = (token, params) =>
    apiClient.get("orders/pending/", params, { headers: getAuthHeader(token) });
  const postOrder = (token, data) =>
    apiClient.post("orders/", data, { headers: getAuthHeader(token) });
  const checkoutDelivery = (token, data) =>
    apiClient.post("orders/feedback/", data, { headers: getAuthHeader(token) });
  const getPayments = (token, params) =>
    apiClient.get("payments/", params, { headers: getAuthHeader(token) });
  return {
    putUserInfo,
    login,
    logout,
    getUser,
    register,
    putUser,
    getOrders,
    getPayments,
    postOrder,
    checkoutDelivery,
    getPendingOrders,
  };
};

export const useHospital = () => {
  const getAwardPrograms = (params) => apiClient.get("awards/", params);
  const getAwardRewards = (params) => apiClient.get("awards/rewards/", params);
  const getClinics = (params) => apiClient.get("clinics/");
  return { getAwardPrograms, getAwardRewards, getClinics };
};

export const httpService = {
  get: apiClient.get,
  post: apiClient.post,
  put: apiClient.put,
  getAuthHeader,
};
