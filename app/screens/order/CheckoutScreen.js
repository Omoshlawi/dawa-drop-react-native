import { Alert, StyleSheet, View } from "react-native";
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
import FeedBackForm from "../../components/order/FeedBackForm";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  AppFormSubmitButton,
} from "../../components/forms";
const validationSchemer = Yup.object().shape({
  code: Yup.string().label("Delivery Code").required(),
  review: Yup.string().label("Review").required(),
  rating: Yup.number().required().label("Rating"),
});

const CheckoutScreen = () => {
  const { checkoutDelivery } = useUser();
  const [currentTab, setCurrenTab] = useState(0);
  const [initialFormData, setInitialFormData] = useState({
    code: "",
    rating: 4,
    review: "",
  });

  const [loading, setLoading] = useState(false);
  const { token } = useUserContext();
  const tabs = [
    <ScanQrCode
      scannedCode={initialFormData.code}
      onScanned={(code) => {
        setInitialFormData({ ...initialFormData, code });
      }}
    />,
    <TypeCode />,
  ];

  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    const response = await checkoutDelivery(token, values);
    setLoading(false);
    if (!response.ok) {
      if (response.problem === "CLIENT_ERROR") {
        for (const key in response.data) {
          const element = response.data[key];
          if (element instanceof Array) {
            setFieldError(key, element.join(";"));
          } else if (element instanceof Object) {
            for (const key1 in element) {
              const element1 = element[key1];
              setFieldError(key1, element1.join(";"));
            }
          }
        }
        return console.log("Checkout: ", response.problem, response.data);
      }
      return console.log("ReviewScreen: ", response.problem, response.data);
    }
    Alert.alert("Sucess", "Delivery feedback was a sucess!Thank you");
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
        {Boolean(initialFormData.code) && (
          <AppForm
            validationSchema={validationSchemer}
            initialValues={initialFormData}
            onSubmit={handleSubmit}
          >
            <FeedBackForm />
            <AppFormSubmitButton title="Submitt" loading={loading} />
          </AppForm>
        )}

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
