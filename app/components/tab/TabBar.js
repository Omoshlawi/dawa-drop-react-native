import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../../utils/colors";

const TabBar = ({
  tabItems = [],
  tabItemStyle,
  containerStyle,
  onTabItemClicked,
  activeIndex,
  activeBackgroundColor = colors.background,
  activeTintColor = colors.white,
}) => {
  const [active, setActive] = useState(activeIndex);
  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        {tabItems.map((item, index) => (
          <View
            style={[
              styles.tabItem,
              tabItemStyle,
              active === index
                ? { backgroundColor: activeBackgroundColor }
                : {},
            ]}
            key={index}
          >
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (onTabItemClicked instanceof Function)
                  onTabItemClicked(item, index);
                setActive(index);
              }}
            >
              {item.icon}
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 5,
    backgroundColor: colors.white,
    borderRadius: 25,
  },
  tabItem: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 5,
    borderRadius: 20,
    padding: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    // flex: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
