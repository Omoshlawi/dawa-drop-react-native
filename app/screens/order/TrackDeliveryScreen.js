import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import useLocation from "../../hooks/useLocation";
import MapView, { Marker, Polyline, Geojson } from "react-native-maps";
import colors from "../../utils/colors";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { date, string } from "yup";
import {
  LocationAccuracy,
  watchHeadingAsync,
  watchPositionAsync,
} from "expo-location";

/**
 * Client tract delivery
 * https://openrouteservice.org/dev/#/home
 * @param {*} param0
 * @returns
 */

const TrackDeliveryScreen = ({ navigation, route }) => {
  const order = route.params;
  const [geoJson, setGeoJson] = useState(null);
  const [realTimeLocation, setRealTimeLocation] = useState(null);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const { token } = useUserContext();
  const { getUserInfo } = useUser();
  const subscriptionRef = useRef(null);
  const webSocketRef = useRef(null);
  const {
    delivery: {
      destination,
      start_location: current_location,
      route_url,
      status,
      location_stream_url,
    },
  } = order;

  if (status !== "in_progress") {
    return <Text>Either trip cancelled or not started</Text>;
  }
  useEffect(() => {
    const webSocket = new WebSocket(`${location_stream_url}?token=${token}`);
    webSocketRef.current = webSocket;
    handleGetDirection();
    // initials
    webSocket.onopen = () => {
      // webSocket.send(JSON.stringify({ name: "Omosh here" }));
    };
    webSocket.onmessage = (e) => {
      // a message was received
      // listen for location and update in reall time
      let data = e.data;
      const { info } = JSON.parse(data);
      const { latitude, longitude } = JSON.parse(info);
      // console.log(latitude, longitude);
      setRealTimeLocation({
        latitude,
        longitude,
      });
    };
    webSocket.onerror = (e) => {
      // an error occurred
      // console.log(e.message);
    };
    webSocket.onclose = (e) => {
      // connection closed
      // console.log(e.code, e.reason);
    };
    return () => {
      webSocketRef.current.close();
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (
      realTimeLocation &&
      realTimeLocation.latitude !== destination.latitude &&
      realTimeLocation.longitude !== destination.longitude
    )
      setPolylineCoords([...polylineCoords, realTimeLocation]);
  }, [realTimeLocation]);
  const handleGetDirection = async () => {
    const response = await getUserInfo({ url: route_url, token, params: {} });
    if (response.ok) {
      setGeoJson(response.data);
    }
  };


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
          <Polyline
            coordinates={polylineCoords}
            strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
            zIndex={1}
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
