import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import useLocation from "../../hooks/useLocation";
import { useDelivery } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { agentMenItems } from "../../utils/contants";
import colors from "../../utils/colors";
import AppSafeArea from "../../components/AppSafeArea";

const itemWidth = Dimensions.get("window").width / 2 - 5;
const AgentHome = () => {
  const location = useLocation();
  const { getDeliveryRequests } = useDelivery();
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const { token } = useUserContext();

  const handleFetch = async () => {
    const response = await getDeliveryRequests(token, {});
    if (response.ok) {
      setDeliveryRequests(response.data.results);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <AppSafeArea>
      <FlatList
        data={agentMenItems}
        keyExtractor={({ id }) => id}
        numColumns={2}
        renderItem={({ item }) => {
          const { title, image, destination } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  item.destination.parentRoute,
                  item.destination.nestedRoute
                )
              }
            >
              <View style={styles.item}>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={image}
                />
                <Text variant="titleMedium" style={styles.title}>
                  {title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </AppSafeArea>
  );
};

export default AgentHome;

const styles = StyleSheet.create({
  itemsContainer: {
    padding: 10,
    alignItems: "center",
  },
  item: {
    width: itemWidth - 5,
    backgroundColor: colors.background,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: itemWidth,
    height: 60,
  },
  title: {
    color: colors.medium,
  },
  screen: {
    // backgroundColor: colors.white,
    flex: 1,
  },
});
