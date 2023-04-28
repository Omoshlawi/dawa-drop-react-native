import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const TypeCode = ({ setFormState }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type Delivery Code here"
        onChangeText={(code) =>
          setFormState((initial) => ({ ...initial, code }))
        }
      />
    </View>
  );
};

export default TypeCode;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    fontSize: 40,
    marginTop: 20,
  },
});
