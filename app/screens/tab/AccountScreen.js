import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import ListItem from "../../components/ListItem";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import routes from "../../navigation/routes";
import { Avatar, Button, Card, IconButton, List } from "react-native-paper";
import colors from "../../utils/colors";
import Dialog from "../../components/dialog/Dialog";

const AccountScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const { getUser, logout } = useUser();
  const [showAbout, setShowAbout] = useState(false);
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  return (
    <AppSafeArea>
      {user && (
        <ListItem
          image={
            user.profile_information.image
              ? { uri: user.profile_information.image }
              : null
          }
          title={user.account_information.name}
          subTitle={user.account_information.email}
          icon="account"
          onPress={() =>
            navigation.navigate(routes.USER_NAVIGATION, {
              screen: routes.PROFILE_VIEW_SCREEN,
              params: user,
            })
          }
        />
      )}
      <TouchableOpacity
        disabled
        onPress={() =>
          navigation.navigate(routes.USER_NAVIGATION, {
            screen: routes.ORDERS_SCREEN,
          })
        }
      >
        <Card.Title
          style={styles.listItem}
          subtitle="Notifications"
          subtitleVariant="bodyLarge"
          left={(props) => (
            <Avatar.Icon
              color={colors.primary}
              style={styles.icon}
              {...props}
              icon="bell"
            />
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" disabled />
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.FORMS_NAVIGATION, {
            screen: routes.FORMS_CHANGE_PASSWORD_FORM,
          })
        }
      >
        <Card.Title
          style={styles.listItem}
          subtitle="Change Password"
          subtitleVariant="bodyLarge"
          left={(props) => (
            <Avatar.Icon
              style={styles.icon}
              {...props}
              icon="key"
              color={colors.primary}
            />
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" disabled />
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled
        onPress={() =>
          navigation.navigate(routes.USER_NAVIGATION, {
            screen: routes.ORDERS_SCREEN,
          })
        }
      >
        <Card.Title
          style={styles.listItem}
          subtitle="Settings"
          subtitleVariant="bodyLarge"
          left={(props) => (
            <Avatar.Icon
              style={styles.icon}
              {...props}
              icon="cogs"
              color={colors.primary}
            />
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" disabled />
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowAbout(true)}>
        <Card.Title
          style={styles.listItem}
          subtitle="About"
          subtitleVariant="bodyLarge"
          left={(props) => (
            <Avatar.Icon
              color={colors.primary}
              style={styles.icon}
              {...props}
              icon="information-variant"
            />
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" disabled />
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Logout", "Are you sure you want to sign out", [
            { text: "Logout", onPress: logout },
            { text: "Cancel" },
          ]);
        }}
      >
        <Card.Title
          style={styles.listItem}
          subtitle="Logout"
          subtitleVariant="bodyLarge"
          left={(props) => (
            <Avatar.Icon
              style={styles.icon}
              {...props}
              icon="logout"
              color={colors.primary}
            />
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" disabled />
          )}
        />
      </TouchableOpacity>
      <Dialog
        visible={showAbout}
        title="About DawaDrop"
        onRequestClose={() => setShowAbout(false)}
      >
        <View style={styles.dialog}>
          <List.Item
            title="Version"
            description="2.0"
            left={(props) => <List.Icon {...props} icon="information" />}
            style={{ backgroundColor: colors.light1 }}
          />
          <Text style={{ padding: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Button mode="outlined" onPress={() => setShowAbout(false)}>
            Ok
          </Button>
        </View>
      </Dialog>
    </AppSafeArea>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginTop: 10,
  },
  icon: {
    backgroundColor: colors.light,
  },
  dialog: {
    width: 300,
  },
});
