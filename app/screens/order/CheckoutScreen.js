import { Alert, StyleSheet, View, Button } from "react-native";
import { Text } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import FeedBackForm from "../../components/order/FeedBackForm";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  AppFormSubmitButton,
} from "../../components/forms";

import { BarCodeScanner } from "expo-barcode-scanner";
import { IconButton } from "react-native-paper";
import colors from "../../utils/colors";
const validationSchemer = Yup.object().shape({
  code: Yup.string().label("Delivery Code").required(),
  review: Yup.string().label("Review").required(),
  rating: Yup.number().required().label("Rating"),
});

const CheckoutScreen = () => {
  const { checkoutDelivery } = useUser();
  const [initialFormData, setInitialFormData] = useState({
    code: "",
    rating: 4,
    review: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useUserContext();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState();
  const [backCam, setBackCam] = useState(true);
  const [type, setType] = useState(false);

  const handleBarCodeScanned = ({ type, data: code }) => {
    setScanned(true);
    setInitialFormData({ ...initialFormData, code });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.screen}>
      {!scanned && !type && (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} variant="titleLarge">
              Point the camera QR code
            </Text>
          </View>
          <View style={styles.container}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
              type={backCam ? "back" : "front"}
            />
          </View>
        </>
      )}
      <View style={styles.rescanButton}>
        {!(!scanned && !type) && (
          <IconButton
            icon="data-matrix-scan"
            size={50}
            iconColor={colors.primary}
            mode="outlined"
            onPress={() => {
              setScanned(false);
              setInitialFormData({ ...initialFormData, code: "" });
              setType(false);
            }}
          />
        )}
        {!scanned && !type && (
          <>
            <IconButton
              icon="keyboard"
              size={50}
              mode="outlined"
              onPress={() => setType(true)}
              iconColor={colors.primary}
            />
            <IconButton
              icon={backCam ? "camera-flip" : "camera-flip-outline"}
              size={50}
              mode="outlined"
              onPress={() => setBackCam(!backCam)}
              iconColor={colors.primary}
            />
          </>
        )}
      </View>

      {(Boolean(initialFormData.code) || type) && (
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
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 3,
  },
  rescanButton: {
    justifyContent: "center",
    flexDirection: "row",
  },
  titleContainer: {
    alignContent: "center",
    padding: 10,
  },
  titleText: {
    textAlign: "center",
  },
});
