import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TabBar from "../../components/tab/TabBar";
import colors from "../../utils/colors";
import { chechoutTabs } from "../../utils/contants";
import ScanQrCode from "../../components/order/ScanQrCode";
import TypeCode from "../../components/order/TypeCode";
import { Snackbar, Text, IconButton, TextInput } from "react-native-paper";
import RatingBar from "../../components/ratingbar/RatingBar";
import TextInputField from "../../components/input/TextInputField";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import * as Yup from "yup";
const validationSchemer = Yup.object().shape({
  code: Yup.string().label("Delivery Code").required(),
  review: Yup.string().label("Date of depletion").required(),
});

const initialValues = {
  code: "",
  review: "",
  rating: 4,
};

const CheckoutScreen = () => {
  const { checkoutDelivery } = useUser();
  const [currentTab, setCurrenTab] = useState(0);
  const [formState, setFormState] = useState({
    review: "",
    rating: 3,
    code: undefined,
  });
  const tabs = [
    <ScanQrCode setFormState={setFormState} />,
    <TypeCode setFormState={setFormState} />,
  ];
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useUserContext();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setVisible(false);
    const response = await checkoutDelivery(token, formState);
    if (!response.ok) {
      setMessage("Please provide both rating and review and scan/type code");
      setVisible(true);
      return console.log("ReviewScreen: ", response.problem, response.data);
    }
    setMessage("Review added successfully.Thank you!");
    setVisible(true);
    await handleFetch();
    setFormState({ review: "", rating: 3 });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.feedBackRegion}>
        <TabBar
          tabItems={chechoutTabs}
          activeIndex={currentTab}
          activeBackgroundColor={colors.secondary}
          onTabItemClicked={(item, index) => {
            setCurrenTab(index);
          }}
        />
        {tabs[currentTab]}
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  feedBackRegion: {
    flex: 1,
  },
});
