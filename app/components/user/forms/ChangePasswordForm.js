import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useUserContext } from "../../../context/hooks";
import { useUser } from "../../../api/hooks";
import Logo from "../../Logo";
import { AppForm, AppFormField, AppFormSubmitButton } from "../../forms";
import AlertDialog from "../../dialog/AlertDialog";
import colors from "../../../utils/colors";
const validationSchemer = Yup.object().shape({
  current_password: Yup.string().label("Current").required(),
  password: Yup.string().label("New Password").required(),
  password_confirm: Yup.string().label("Confirm Password").required(),
});

const ChangePasswordForm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { token } = useUserContext();
  const { changePassword } = useUser();

  const handleChagePassword = async (values, { setFieldError, resetForm }) => {
    setLoading(true);
    const response = await changePassword(values, token);
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
        return console.log(
          "Change password screen: ",
          response.problem,
          response.data
        );
      }
    } else {
      resetForm();
      setShowDialog(true);
    }
  };
  return (
    <View style={styles.container}>
      <Logo size={150} />
      <View style={styles.form}>
        <AppForm
          initialValues={{
            password: "",
            password_confirm: "",
            current_password: "",
          }}
          validationSchema={validationSchemer}
          onSubmit={handleChagePassword}
        >
          <AppFormField
            password
            name="current_password"
            icon="lock"
            placeholder="Enter current Password"
          />
          <AppFormField
            password
            name="password"
            icon="lock"
            placeholder="Enter new Password"
          />
          <AppFormField
            password
            name="password_confirm"
            icon="lock"
            placeholder="Confirm Password"
          />
          <AppFormSubmitButton title="Change password" loading={loading} />
        </AppForm>
      </View>
      {showDialog && (
        <AlertDialog
          success
          visible={showDialog}
          message="Password Changed successfully"
          onDismiss={() => {
            console.log("Yes going back");
            navigation.goBack();
          }}
        />
      )}
    </View>
  );
};

export default ChangePasswordForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    paddingTop: 50,
    flex: 1,
  },
  form: {
    width: "90%",
    paddingTop: 20,
  },
});
