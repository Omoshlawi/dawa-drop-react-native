import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useUserContext } from "../../../context/hooks";
import { useUser } from "../../../api/hooks";
import TextInputField from "../../input/TextInputField";
import { Button } from "react-native-paper";
import colors from "../../../utils/colors";
import routes from "../../../navigation/routes";

const AccountVerificationForm = ({ navigation, route }) => {
  const { message, verify_url: url } = route.params;
  const { token } = useUserContext();
  const { postUserInfo, getUser } = useUser();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    const response = await postUserInfo({
      url,
      token,
      multipart: false,
      data: { code },
    });
    setLoading(false);
    if (response.ok) {
      Alert.alert(
        "Success",
        "Account verification successfull, you account details has been updated"
      );
      await getUser(true);
      navigation.navigate(routes.TAB_NAVIGATION);
    } else {
      console.log(response.data, response.status);

      if (response.status == 403) {
        Alert.alert("Failure", response.data.detail);
      } else if (response.status == 400) {
        if (response.data instanceof Object) {
          const errors = [];
          for (key in response.data) {
            errors.push(response.data[key].join(";"));
          }
          Alert.alert("Failure", errors.join("\n"));
        }
      }
    }
  };

  return (
    <View>
      <View style={styles.form}>
        <Text style={styles.instruction}>{message}</Text>
        <TextInputField
          placeholder="Enter verification code here"
          value={code}
          onChangeText={setCode}
        />
        <Button
          onPress={handleVerify}
          style={styles.btn}
          mode="outlined"
          loading={loading}
          textColor={colors.primary}
        >
          Verify
        </Button>
      </View>
    </View>
  );
};

export default AccountVerificationForm;

const styles = StyleSheet.create({
  instruction: {
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    padding: 20,
  },
  btn: {
    margin: 5,
    borderColor: colors.primary,
  },
});
