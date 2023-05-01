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
