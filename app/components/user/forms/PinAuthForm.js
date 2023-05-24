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

const digits = [1, 2, 3, 4];
const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const PinAuthForm = () => {
  const [pin, setPin] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authenticate } = useSettinsContext();
  const [error, setError] = useState(false);

  const handleKeyPress = (key) => {
    setError(false);
    setPin([...pin, key]);
  };

  const handleBackSpace = () => {
    const pin1 = [...pin];
    pin1.pop();
    setPin(pin1);
  };

  useEffect(() => {
    if (pin.length >= 4) {
      setLoading(true);
      setTimeout(() => {
        setError(authenticate(parseInt(pin.join(""))) === false);
        setLoading(false);
        setPin([]);
      }, 1000);
    }
  }, [pin]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator color={colors.primary} size={100} />
      ) : (
        <>
          <View style={styles.digits}>
            {digits.map((item) => (
              <View
                style={[
                  styles.digitCard,

                  {
                    backgroundColor:
                      pin.length >= item ? colors.primary : colors.light1,
                  },
                  error && {
                    backgroundColor: colors.danger,
                  },
                ]}
                key={item}
              />
            ))}
          </View>
          {error && <Text style={styles.error}>Wrong pin</Text>}
        </>
      )}
      <View style={styles.actions}>
        <IconButton
          icon="backspace"
          onPress={handleBackSpace}
          disabled={loading}
        />
      </View>
      <View style={styles.keyBoard}>
        {keys.map((key) => (
          <TouchableOpacity
            key={key}
            disabled={pin.length >= 4 || loading}
            style={styles.keyBoardKey}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PinAuthForm;

const styles = StyleSheet.create({
  digitCard: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
  },
  digits: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  input: {
    textAlign: "center",
  },
  keyBoard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  keyBoardKey: {
    width: screenWidth * 0.25,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: colors.light,
    textAlign: "center",
  },
  keyText: {
    textAlign: "center",
  },
  actions: {
    flexDirection: "row-reverse",
  },
  error: {
    textAlign: "center",
    color: colors.danger,
    padding: 10,
  },
});