import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { List, Switch } from "react-native-paper";
import colors from "../../utils/colors";
import { useSettinsContext } from "../../context/hooks";
import PinForm from "../../components/user/forms/PinForm";

const SettingsScreen = () => {
  const { enablePin, disablePin, privacyEnabled } = useSettinsContext();
  const handleToggleEnablePrivacy = () => {
    if (privacyEnabled) {
      disablePin(1234);
    } else {
      enablePin(1234);
    }
  };
  return (
    <View>
      <List.Section title="Privacy Settings">
        <List.Accordion
          title="Enable pin"
          left={(props) => <List.Icon {...props} icon="shield-key-outline" />}
          right={(props) => (
            <Switch
              value={privacyEnabled}
              //   onValueChange={handleToggleEnablePrivacy}
              color={colors.primary}
            />
          )}
          expanded={privacyEnabled}
          onPress={handleToggleEnablePrivacy}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
      <PinForm
        onValueChanged={(value) => console.log(value)}
        onPinComplete={(value) => console.log(value)}
        length={10}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginTop: 5,
    elevation: 0,
    borderRadius: 0,
  },
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
});
