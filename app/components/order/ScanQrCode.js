import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import colors from "../../utils/colors";
import { IconButton } from "react-native-paper";

const ScanQrCode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedCode, setScannedCode] = useState();

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedCode(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
    <View style={styles.container}>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && (
        <View style={styles.rescanButton}>
          <IconButton
            icon="refresh"
            size={50}
            mode="outlined"
            onPress={() => setScanned(false)}
          />
        </View>
      )}
    </View>
  );
};

export default ScanQrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rescanButton: {
    alignItems: "center",
  },
});
