import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import useLocation from "../../hooks/useLocation";
import MapView, { Marker, Polyline } from "react-native-maps";
import colors from "../../utils/colors";

/**
 * Client tract delivery
 * @param {*} param0
 * @returns
 */

const TrackDeliveryScreen = ({ navigation, route }) => {
  const order = route.params;
  const webSocket = useRef(
    new WebSocket("ws://192.168.100.5:8000/ws/trip/1/")
  ).current;
  const {
    delivery: { trip },
  } = order;

  if (!trip) {
    return <Text>Not started</Text>;
  }
  const { current_location, destination } = trip;
  useEffect(() => {
    // initials
    webSocket.onopen = () => {
      webSocket.send(JSON.stringify({ name: "Omosh here" }));
    };
    webSocket.onmessage = (e) => {
      // a message was received
      console.log(e.data);
    };
    webSocket.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };
    webSocket.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }, []);

  const handleAgentWebSocket = async () => {
    while (true) webSocket.send(JSON.stringify(trip));
  };

  return (
    <View style={styles.screen}>
      <IconButton icon="refresh" onPress={handleAgentWebSocket} />
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
              source={require("../../assets/deliverycycle.png")}
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
          <Polyline
            coordinates={[current_location, destination]}
            strokeColor={colors.primary} // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              "#7F0000",
              "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
              "#B24112",
              "#E5845C",
              "#238C23",
              "#7F0000",
            ]}
            strokeWidth={6}
          />
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
