import moment from "moment/moment";
import { Linking, Alert, Platform } from "react-native";

export const zip = (ar1, ar2) => {
  if (
    !(ar2 instanceof Array && ar1 instanceof Array && ar1.length === ar2.length)
  )
    throw Error("Invalid argument");
  const zipped = [];
  for (let index = 0; index < ar1.length; index++) {
    zipped.push([ar1[index], ar2[index]]);
  }
  return zipped;
};
export const dict = (arr) => {
  dictionary = {};
  arr.forEach((element) => {
    dictionary[element[0]] = element[1];
  });
  return dict;
};

export const getFormFileFromMediaFile = (mediaFile) => {
  const filename = mediaFile.uri.split("/").pop();
  let fileExt = filename.split(".").pop();
  const mimeType = mediaFile.type + "/" + fileExt;
  return {
    uri: mediaFile.uri,
    name: filename,
    type: mimeType,
  };
};

export const getFormFileFromUri = (uri) => {
  const filename = uri.split("/").pop();
  let fileExt = filename.split(".").pop();
  const mimeType = `image/${fileExt}`;
  // const mimeType = Platform.OS === "ios" ? `image/jpg` : "image/jpeg";
  return {
    uri: uri,
    name: filename,
    type: mimeType,
  };
};

export const rangeToListInclusive = (start, end) => {
  const list = [];
  for (let index = start; index < end + 1; index++) {
    list.push(index);
  }
  return list;
};

export const statusTorange = (is_delivered, is_approved) => {
  if (is_delivered) return 3;
  if (is_approved) return 2;
  return 1;
};

export const callNumber = (phone) => {
  console.log("callNumber ----> ", phone);
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};

export const toSectionListData = (user) => {
  const account = [];
  const profile = [];
  const userType = [];
  const {
    account_information,
    profile_information,
    user_type_information,
    account_information_edit_url,
    profile_information_edit_url,
    user_type_information_edit_url,
  } = user;
  delete account_information.url;
  const { user_type } = profile_information;
  for (let key in account_information) {
    account.push({ key: key, value: account_information[key] });
  }
  for (let key in profile_information) {
    profile.push({ key: key, value: profile_information[key] });
  }
  for (let key in user_type_information[user_type]) {
    userType.push({ key: key, value: user_type_information[user_type][key] });
  }
  const sectionData = [
    { title: "Account Information", data: account },
    { title: "Profile Information", data: profile },
    { title: `${user_type.replace("_", " ")} Information`, data: profile },
  ];
  return sectionData;
};

month_dictionary = {};

const getMonthlyTriads = (triads) => {
  const data = {
    0: { height: [], weight: [], blood_pressure: [] },
    1: { height: [], weight: [], blood_pressure: [] },
    2: { height: [], weight: [], blood_pressure: [] },
    3: { height: [], weight: [], blood_pressure: [] },
    4: { height: [], weight: [], blood_pressure: [] },
    5: { height: [], weight: [], blood_pressure: [] },
    6: { height: [], weight: [], blood_pressure: [] },
    7: { height: [], weight: [], blood_pressure: [] },
    8: { height: [], weight: [], blood_pressure: [] },
    9: { height: [], weight: [], blood_pressure: [] },
    10: { height: [], weight: [], blood_pressure: [] },
    11: { height: [], weight: [], blood_pressure: [] },
  };
  triads.forEach(({ created_at, blood_pressure, height, weight }) => {
    const month = new Date(created_at).getMonth();
    data[month].height.push(parseFloat(height));
    data[month].weight.push(parseFloat(weight));
    data[month].blood_pressure.push(parseFloat(blood_pressure));
  });
  return data;
};

const mean = (list = []) => {
  if (list.length === 0) {
    return 0;
  }
  const sum = list.reduce((accumulated, current) => accumulated + current, 0);
  return sum / list.length;
};

export const getMonthlyMeans = (triads) => {
  const data = getMonthlyTriads(triads);
  const monthlyHeights = [];
  const monthlyWeights = [];
  const monthlypressure = [];
  const months = moment.monthsShort();
  const currentMonth = moment().month();
  for (const month in data) {
    monthlyHeights.push(mean(data[month].height));
    monthlyWeights.push(mean(data[month].weight));
    monthlypressure.push(mean(data[month].blood_pressure));
  }
  return {
    monthlyHeights: monthlyHeights.slice(0, currentMonth + 1),
    monthlyWeights: monthlyWeights.slice(0, currentMonth + 1),
    monthlypressure: monthlypressure.slice(0, currentMonth + 1),
    months: months.slice(0, currentMonth + 1),
  };
};
