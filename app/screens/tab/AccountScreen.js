import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import ListItem from "../../components/ListItem";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import routes from "../../navigation/routes";
import { Avatar, Card, IconButton } from "react-native-paper";
import colors from "../../utils/colors";

const AccountScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const { getUser, logout } = useUser();
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
      <TouchableOpacity
        disabled
        onPress={() =>
          navigation.navigate(routes.USER_NAVIGATION, {
            screen: routes.PAYMENTS_SCREEN,
          })
        }
      >
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
});
