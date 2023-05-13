import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { FlatList } from "react-native";
import { FAB, IconButton, List } from "react-native-paper";
import colors from "../../utils/colors";
import moment from "moment";
import { Text } from "react-native-paper";
import IconText from "../../components/display/IconText";
import routes from "../../navigation/routes";
import { SectionList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const UserTransferRequestsScreen = ({ navigation }) => {
  const { token } = useUserContext();
  const { getTransferRequest } = useUser();
  const [transferRequest, setTransferRequest] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferRequestDataToSectionData = (request) => {
    const aprrovedList = request.filter(
      ({ is_approved }) => is_approved === true
    );
    const pendingList = request.filter(
      ({ is_approved }) => is_approved === false
    );
    return [
      { title: "Aprooved Requests", data: aprrovedList },
      { title: "Pending Requests", data: pendingList },
    ];
  };
 
  const handleFetch = async () => {
    setLoading(true);
    const response = await getTransferRequest(token);
    setLoading(false);
    if (!response.ok) {
      return console.log("Request SCREEN", response.problem, response.data);
    } else {
      setTransferRequest(response.data.results);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleFetch();
    }, [])
  );

  return (
    <View style={styles.screen}>
      <SectionList
        sections={transferRequestDataToSectionData(transferRequest)}
        refreshing={loading}
        onRefresh={handleFetch}
        keyExtractor={({ url }) => url}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? <Text style={styles.title}>{title}</Text> : null
        }
        renderItem={({ item }) => {
          const {
            patient,
            hospital: { name, address },
            reason,
            is_approved,
            approved_by,
            created_at,
            updated_at,
          } = item;
          return (
            <List.Item
              style={styles.listItem}
              title={name}
              description={reason}
              onPress={() =>
                navigation.navigate(routes.TRANSFER_DETAIL_SCREEN, item)
              }
              //   description={moment(created_at).format("ddd Do MMMM YYYY")}
              descriptionStyle={styles.text}
              right={(props) => (
                <IconButton icon="chevron-right" iconColor={colors.primary} />
              )}
              left={(props) => (
                <List.Image
                  {...props}
                  source={require("../../assets/migration.png")}
                />
              )}
            />
          );
        }}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate(routes.FORMS_NAVIGATION, {
            screen: routes.FORMS_REQUEST_TRANFER_FORM,
          })
        }
      />
    </View>
  );
};

export default UserTransferRequestsScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.medium,
  },
  listItem: {
    backgroundColor: colors.white,
    marginTop: 5,
  },
  text: {
    color: colors.medium,
  },
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
  screen: {
    flex: 1,
  },
});
