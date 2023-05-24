import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import colors from "../../../utils/colors";
import { screenWidth } from "../../../utils/contants";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { useSettinsContext } from "../../../context/hooks";
import PinForm from "./PinForm";

const digits = [1, 2, 3, 4];
const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const PinAuthForm = () => {
  const { authenticate } = useSettinsContext();
  const [error, setError] = useState(null);

  return (
    <>
      <PinForm
        onPinComplete={(pin) => {
          const valid = authenticate(parseInt(pin));
          if (!valid) {
            setError("Invalid Pin");
          }
        }}
        error={error}
        onValueChanged={() => setError(null)}
      />
    </>
  );
};

export default PinAuthForm;

const styles = StyleSheet.create({});
