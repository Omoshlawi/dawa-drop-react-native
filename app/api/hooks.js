import { useUserContext } from "../context/hooks";
import apiClient from "./client";
const getAuthHeader = (token) => ({ Authorization: `Token ${token}` });

export const useUser = () => {
  const { setUser, token, setToken, clearToken, user } = useUserContext();
  const login = (data) => apiClient.post("users/login/", data);
  const register = (data) => apiClient.post("users/register/", data);
  const logout = () => clearToken(true);
  const getUser = async (force) => {
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
  const findAccount = (token, params, data) =>
    apiClient.post("users/find-account/", data, {
      headers: getAuthHeader(token),
      params: params,
    });
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
  const getUserInfo = ({ url, token, params }) => {
    return apiClient.get(url, params, {
      headers: {
        ...getAuthHeader(token),
      },
    });
  };
  const postUserInfo = ({ url, token, data, multipart = false }) => {
    if (multipart) {
      return apiClient.post(url, data, {
        headers: {
          ...getAuthHeader(token),
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return apiClient.post(url, data, {
      headers: {
        ...getAuthHeader(token),
      },
    });
  };
  const deleteUserInfo = ({ url, token }) => {
    return apiClient.delete(
      url,
      {},
      {
        headers: {
          ...getAuthHeader(token),
        },
      }
    );
  };
  const postTransferRequest = (token, data) =>
    apiClient.post("transfer-requests/my-requests/", data, {
      headers: getAuthHeader(token),
    });
  const getTransferRequest = (token, params) =>
    apiClient.get("transfer-requests/my-requests/", params, {
      headers: getAuthHeader(token),
    });
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
  const getAppointments = (token, params) =>
    apiClient.get("patients/appointments/", params, {
      headers: getAuthHeader(token),
    });
  const getPrescriptions = (token, params) =>
    apiClient.get("patients/prescriptions/", params, {
      headers: getAuthHeader(token),
    });
  const getTriads = (token, params) =>
    apiClient.get("patients/triads/", params, {
      headers: getAuthHeader(token),
    });
  const getTestResults = (token, params) =>
    apiClient.get("patients/test-results/", params, {
      headers: getAuthHeader(token),
    });
  return {
    getTestResults,
    getTriads,
    getAppointments,
    getPrescriptions,
    findAccount,
    getUserInfo,
    postTransferRequest,
    getTransferRequest,
    deleteUserInfo,
    postUserInfo,
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
  const getClinics = (params) => apiClient.get("facilities/");
  const getAppointmentTypes = (params) => apiClient.get("appointment-types/");
  const getDeliveryModes = (params) => apiClient.get("deliver-mode/");
  const getDeliveryTimeSlots = (params) =>
    apiClient.get("delivery-time-slots/");
  return {
    getAwardPrograms,
    getAwardRewards,
    getClinics,
    getAppointmentTypes,
    getDeliveryModes,
    getDeliveryTimeSlots,
  };
};

export const httpService = {
  get: apiClient.get,
  post: apiClient.post,
  put: apiClient.put,
  getAuthHeader,
};

export const useDelivery = () => {
  const getDirection = (token, params) =>
    apiClient.get("orders/trip/1/route/", params, {
      headers: getAuthHeader(token),
    });
  return { getDirection };
};
