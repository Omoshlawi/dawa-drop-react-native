import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IconText = ({
  icon,
  text,
  color = colors.primary,
  size,
  fontWeight,
  left = true,
  onPress,
  disabled = false,
  disabledColor = colors.medium,
}) => {
  const disableBtn = !(onPress instanceof Function) || Boolean(disabled); //| Boolean(disabled);
  return (
    <TouchableOpacity
      style={{
        flexDirection: left ? "row" : "row-reverse",
        alignItems: "center",
      }}
      onPress={onPress}
      disabled={disableBtn}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={size}
          color={disableBtn ? disabledColor : color}
        />
      )}
      {text && (
        <Text
          numberOfLines={1}
          style={[styles.text, { fontSize: size, color, fontWeight }]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IconText;

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 2,
  },
});
