import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import colors from "../../utils/colors";
import moment from "moment";
import { Text } from "react-native-paper";
import IconText from "../../components/display/IconText";
import routes from "../../navigation/routes";

const UserTransferRequestsScreen = ({ navigation }) => {
  const { token } = useUserContext();
  const { getTransferRequest } = useUser();
  const [transferRequest, setTransferRequest] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Requests History</Text>
        <IconText
          icon="plus"
          size={20}
          onPress={() =>
            navigation.navigate(routes.FORMS_NAVIGATION, {
              screen: routes.FORMS_REQUEST_TRANFER_FORM,
            })
          }
        />
      </View>
      <FlatList
        data={transferRequest}
        refreshing={loading}
        onRefresh={handleFetch}
        keyExtractor={({ url }) => url}
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
              style={styles.listIte}
              title={name}
              description={reason}
              descriptionStyle={styles.text}
              right={(props) => (
                <Text style={styles.text}>
                  {moment(created_at).format("ddd Do MMMM YYYY")}
                </Text>
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
    </View>
  );
};

export default UserTransferRequestsScreen;

const styles = StyleSheet.create({
  listIte: {
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
