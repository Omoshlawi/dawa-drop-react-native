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

  const handleVerify = async () => {
    const response = await postUserInfo({
      url,
      token,
      multipart: false,
      data: { code },
    });
    if (response.ok) {
      Alert.alert(
        "Success",
        "Account verification successfull, you account details has been updated"
      );
      await getUser(true);
      navigation.navigate(routes.TAB_NAVIGATION);
    } else {
      console.log(response.data);
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
