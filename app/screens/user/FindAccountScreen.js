import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchHeader from "../../components/SearchHeader";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { FlatList } from "react-native";
import { Avatar, Button, Card, IconButton, List } from "react-native-paper";
import colors from "../../utils/colors";

const FindAccountScreen = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const { findAccount } = useUser();
  const { token } = useUserContext();
  const handleSearch = async () => {
    const response = await findAccount(token, {}, { search });
    if (response.ok) {
      setSearchResults(response.data.results);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);
  return (
    <View>
      <SearchHeader
        text={search}
        onTextChange={setSearch}
        onSearch={handleSearch}
      />
      <Text style={styles.title}>Search Results</Text>
      <FlatList
        data={searchResults}
        renderItem={({ item, index }) => {
          const { email, phone_number, request_verification_url, first_name } =
            item;
          return (
            <TouchableOpacity key={index} onPress={() => {}}>
              <Card style={styles.listItem} elevation={0}>
                <Card.Title
                  left={(props) => (
                    <Avatar.Icon
                      icon="account"
                      {...props}
                      color={colors.primary}
                      style={styles.icon}
                    />
                  )}
                  title={first_name}
                  right={(props) => <IconButton icon="chevron-right" />}
                />
                <Card.Actions>
                  <Button icon="phone" textColor={colors.primary}>
                    {phone_number}
                  </Button>
                  <Button icon="email" buttonColor={colors.primary}>
                    {email}
                  </Button>
                </Card.Actions>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FindAccountScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginBottom: 5,
    padding: 5,
    borderRadius: 0,
    elevation: 0,
  },
  icon: {
    backgroundColor: colors.light,
  },
  title: {
    fontWeight: "bold",
    padding:10
  }
});
