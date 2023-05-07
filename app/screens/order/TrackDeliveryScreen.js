import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import useLocation from "../../hooks/useLocation";
import MapView, { Marker, Polyline, Geojson } from "react-native-maps";
import colors from "../../utils/colors";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { date } from "yup";

/**
 * Client tract delivery
 * @param {*} param0
 * @returns
 */

const TrackDeliveryScreen = ({ navigation, route }) => {
  const order = route.params;
  const [geoJson, setGeoJson] = useState(null);
  const [realTimeLocation, setRealTimeLocation] = useState(null);
  const { token } = useUserContext();
  const { getUserInfo } = useUser();
  const webSocket = useRef(
    new WebSocket(`ws://192.168.100.5:8000/ws/trip/1/?token=${token}`)
  ).current;
  const {
    delivery: { trip },
  } = order;

  if (!trip) {
    return <Text>Not started</Text>;
  }
  const { current_location, destination, route_url } = trip;
  useEffect(() => {
    handleGetDirection();
    // initials
    webSocket.onopen = () => {
      // webSocket.send(JSON.stringify({ name: "Omosh here" }));
    };
    webSocket.onmessage = (e) => {
      // a message was received
      let data = e.data;
      const { info } = JSON.parse(data);
      console.log(info);
      // setRealTimeLocation({
      //   latitude: info.latitude + 5,
      //   longitude: info.longitude + 5,
      // });
    };
    webSocket.onerror = (e) => {
      // an error occurred
      // console.log(e.message);
    };
    webSocket.onclose = (e) => {
      // connection closed
      // console.log(e.code, e.reason);
    };
  }, []);

  const handleAgentWebSocket = async () => {
    webSocket.send(JSON.stringify(current_location));
  };
  const handleGetDirection = async () => {
    const response = await getUserInfo({ url: route_url, token, params: {} });
    if (response.ok) {
      setGeoJson(response.data);
    }
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
          <Marker coordinate={current_location}>
            <Image
              source={require("../../assets/hospitalmarker.png")}
              style={{ width: 60, height: 60 }}
            />
          </Marker>
          {realTimeLocation && (
            <Marker coordinate={realTimeLocation}>
              <Image
                source={require("../../assets/hospitalmarker.png")}
                style={{ width: 60, height: 60 }}
              />
            </Marker>
          )}
          <Marker coordinate={destination}>
            <Image
              source={require("../../assets/hospitalmarker.png")}
              style={{ width: 60, height: 60 }}
            />
          </Marker>
          {geoJson && (
            <Geojson
              geojson={geoJson}
              strokeColor={colors.danger}
              fillColor="red"
              strokeWidth={4}
            />
          )}
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
