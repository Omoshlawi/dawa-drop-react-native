import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import useLocation from "../../hooks/useLocation";
import MapView, { Marker } from "react-native-maps";
import colors from "../../utils/colors";

/**
 * Client tract delivery
 * @param {*} param0
 * @returns
 */

const TrackDeliveryScreen = ({ navigation, route }) => {
  const order = route.params;
  const {
    delivery: {
      trip: { current_location, destination },
    },
  } = order;

  return (
    <View style={styles.screen}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: destination.latitude,
            longitude: destination.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={current_location}
            title="Long press and drag to your desired location"
          >
            <Image
              source={require("../../assets/hospitalmarker.png")}
              style={{ width: 60, height: 60 }}
            />
          </Marker>
          <Marker
            coordinate={destination}
            title="Long press and drag to your desired location"
          >
            <Image
              source={require("../../assets/hospitalmarker.png")}
              style={{ width: 60, height: 60 }}
            />
          </Marker>
        </MapView>
      </View>
    </View>
  );
};

export default TrackDeliveryScreen;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  screen: {
    flex: 1,
  },
});
