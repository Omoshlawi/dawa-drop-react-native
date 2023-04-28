import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TabBar from "../../components/tab/TabBar";
import colors from "../../utils/colors";
import { chechoutTabs } from "../../utils/contants";
import ScanQrCode from "../../components/order/ScanQrCode";
import TypeCode from "../../components/order/TypeCode";
import { Snackbar, Text, IconButton, TextInput } from "react-native-paper";
import RatingBar from "../../components/ratingbar/RatingBar";
import TextInputField from "../../components/input/TextInputField";
import { useUserContext } from "../../context/hooks";

const CheckoutScreen = () => {
  const tabs = [<ScanQrCode />, <TypeCode />];
  const [currentTab, setCurrenTab] = useState(0);
  const [formState, setFormState] = useState({ review: "", rating: 3 });
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useUserContext();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setVisible(false);
    const response = await addReview(token, {
      ...formState,
      product: route.params.url,
    });
    if (!response.ok) {
      setMessage("Please provide both rating and review");
      setVisible(true);
      return console.log("ReviewScreen: ", response.problem, response.data);
    }
    setMessage("Review added successfully.Thank you!");
    setVisible(true);
    await handleFetch();
    setFormState({ review: "", rating: 3 });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.feedBackRegion}>
        <TabBar
          tabItems={chechoutTabs}
          activeIndex={currentTab}
          activeBackgroundColor={colors.secondary}
          onTabItemClicked={(item, index) => {
            setCurrenTab(index);
          }}
        />
        {tabs[currentTab]}
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Rating:</Text>
        <RatingBar
          align="flex-start"
          defaultRating={formState.rating}
          onRatingChange={(rating) => setFormState({ ...formState, rating })}
        />
        <Text style={styles.label}>Review:</Text>
        <View style={styles.input}>
          <TextInputField
            placeholder="Leave your review here ..."
            width="85%"
            onChangeText={(review) => setFormState({ ...formState, review })}
            value={formState.review}
            backgroundColor={colors.light}
          />
          <IconButton icon="send" mode="outlined" onPress={handleSubmit} />
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Dismiss",
          onPress: () => {
            // setVisible(false);
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  reviewRatingRow: {
    flexDirection: "row",
  },
  reviewsContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  form: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
  },
  review: {
    marginBottom: 5,
  },
  feedBackRegion: {
    flex: 1,
  },
});
