import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { List, Switch } from "react-native-paper";
import colors from "../../utils/colors";
import { useSettinsContext } from "../../context/hooks";

const SettingsScreen = () => {
  const [expanded, setExpanded] = React.useState(true);
  const {
    enablePin,
    disablePin,
    privacyEnabled,
    appConfiguration,
    clearAppConfiguration,
  } = useSettinsContext();
  const handleToggleEnablePrivacy = () => {
    if (privacyEnabled) {
      disablePin(1234);
    } else {
      enablePin(1234);
    }
  };
  console.log(appConfiguration);
  return (
    <View>
      <List.Section title="Privacy Settings">
        <List.Accordion
          title="Enable pin"
          left={(props) => <List.Icon {...props} icon="folder" />}
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
