import { StyleSheet, Text, View, SectionList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useDelivery } from "../../api/hooks";
import SearchHeader from "../../components/SearchHeader";
import colors from "../../utils/colors";
import { Avatar, Button, Card, IconButton, List } from "react-native-paper";
import moment from "moment";
import IconText from "../../components/display/IconText";
import { callNumber } from "../../utils/helpers";

const DeliveriesScreen = ({ navigation }) => {
  const { token } = useUserContext();
  const { getDeliveries } = useDelivery();
  const [deliveries, setDeliveries] = useState([]);

  const handleFetch = async () => {
    let response = await getDeliveries(token, {});
    if (response.ok) {
      setDeliveries(response.data.results);
    }
  };

  const deliveryToSectionListData = (deliveries = []) => {
    const pending = deliveries.filter(({ status }) => status === null);
    const inProgress = deliveries.filter(
      ({ status }) => status === "in_progress"
    );
    const cancelled = deliveries.filter(({ status }) => status === "canceled");
    const delivered = deliveries.filter(({ status }) => status === "delivered");
    return [
      {
        title: "Pending Deliveries",
        data: pending,
      },
      {
        title: "In progress Deliveries",
        data: inProgress,
      },
      {
        title: "Cancelled Deliveries",
        data: cancelled,
      },
      {
        title: "Delivered Deliveries",
        data: delivered,
      },
    ];
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <View>
      <SearchHeader />
      <SectionList
        sections={deliveryToSectionListData(deliveries)}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? <Text style={styles.title}>{title}</Text> : null
        }
        renderItem={({ item }) => {
          const { delivery_id, created_at, status, phone_number } = item;
          return (
            <Card style={styles.listItem}>
              <Card.Title
                title={delivery_id}
                subtitle={moment(created_at).format("ddd Do MMMM YYYY")}
                subtitleStyle={styles.text}
                right={(props) =>
                  status === "in_progress" ? (
                    <IconText
                      {...props}
                      icon="chevron-right"
                      text="route"
                      left={false}
                    />
                  ) : null
                }
                left={(props) => (
                  <Avatar.Image
                    style={[
                      status === "in_progress" && {
                        backgroundColor: colors.warning,
                      },
                      status === "canceled" && {
                        backgroundColor: colors.danger,
                      },
                      status === "delivered" && {
                        backgroundColor: colors.success,
                      },
                      status === null && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    {...props}
                    source={require("../../assets/delivery-truck.png")}
                  />
                )}
              />
              <Card.Actions>
                {status === "in_progress" && (
                  <>
                    <Button
                      icon="cancel"
                      textColor={colors.danger}
                      mode="outlined"
                      style={{ borderColor: colors.danger }}
                    >
                      Cancel trip
                    </Button>
                    <Button
                      icon="phone"
                      mode="outlined"
                      buttonColor={colors.primary}
                      textColor={colors.white}
                      style={{ borderColor: colors.primary }}
                      onPress={() => callNumber(phone_number)}
                    >
                      Call {phone_number}
                    </Button>
                  </>
                )}
                {status === "canceled" && <Button>Hellow</Button>}
                {status === null && (
                  <Button icon="truck" buttonColor={colors.primary}>
                    Start Trip
                  </Button>
                )}
              </Card.Actions>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default DeliveriesScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginTop: 5,
    borderRadius: 0,
    elevation: 0,
  },
  text: {
    color: colors.medium,
  },
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
  img: {
    backgroundColor: colors.danger,
  },
});
