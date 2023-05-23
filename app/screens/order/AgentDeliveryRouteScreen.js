import { StyleSheet, View, Image, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline, Geojson, Callout } from "react-native-maps";
import useLocation from "../../hooks/useLocation";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import colors from "../../utils/colors";
import {
  LocationAccuracy,
  watchHeadingAsync,
  watchPositionAsync,
} from "expo-location";
import { Button, Text } from "react-native-paper";
import Dialog from "../../components/dialog/Dialog";
import AlertDialog from "../../components/dialog/AlertDialog";

const AgentDeliveryRouteScreen = ({ navigation, route }) => {
  const delivery = route.params;
  const {
    address,
    agent,
    cancel_url,
    created_at,
    delivery_id,
    destination,
    doctor,
    location_stream_url,
    phone_number,
    prescription,
    route_url,
    start_location,
    start_url,
    status,
    time_started,
    url,
  } = delivery;
  const location = useLocation();
  const [geoJson, setGeoJson] = useState(null);
  const [realTimeLocation, setRealTimeLocation] = useState(null);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [showError, setShowError] = useState(false);
  const { token } = useUserContext();
  const { getUserInfo } = useUser();
  const subscriptionRef = useRef(null);
  const webSocketRef = useRef(null);

  const handleAgentWebSocket = async () => {
    const subscription = await watchPositionAsync(
      {
        accuracy: LocationAccuracy.Balanced,
        distanceInterval: 1,
      },
      ({ coords }) => {
        const { latitude, longitude } = coords;
        if (webSocketRef.current.readyState !== WebSocket.CONNECTING) {
          // webSocketRef.current.send(JSON.stringify({ latitude, longitude }));
        }
      }
    );
    subscriptionRef.current = subscription;
  };

  const handleGetDirection = async () => {
    const response = await getUserInfo({ url: route_url, token, params: {} });
    if (response.ok) {
      setGeoJson(response.data);
    }
  };

  const simulateAgentMovemant = async () => {
    if (geoJson) {
      let _routes = geoJson["features"][0]["geometry"]["coordinates"];
      for (const _route of _routes) {
        if (webSocketRef.current.readyState !== WebSocket.CONNECTING) {
          webSocketRef.current.send(
            JSON.stringify({ latitude: _route[1], longitude: _route[0] })
          );
          // await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }
    }
  };

  useEffect(() => {
    const webSocket = new WebSocket(`${location_stream_url}?token=${token}`);
    webSocketRef.current = webSocket;
    handleGetDirection();
    handleAgentWebSocket();
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
    if (!realTimeLocation && location) {
      setRealTimeLocation(location);
    }
  }, [location]);

  useEffect(() => {
    if (
      realTimeLocation &&
      realTimeLocation.latitude !== destination.latitude &&
      realTimeLocation.longitude !== destination.longitude
    )
      setPolylineCoords([...polylineCoords, realTimeLocation]);
  }, [realTimeLocation]);

  if (status !== "in_progress") {
    return <Text>Please start the trip to show route</Text>;
  }

  return (
    <View style={styles.screen}>
      <Button
        onPress={simulateAgentMovemant}
        disabled={!(geoJson && !geoJson["error"])}
      >
        Simulate agent movement
      </Button>
      {realTimeLocation && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: realTimeLocation.latitude,
              longitude: realTimeLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={start_location}>
              <Image
                source={require("../../assets/hospital.png")}
                style={{ width: 60, height: 60 }}
              />
              <Callout>
                <Text>Your start Location</Text>
              </Callout>
            </Marker>
            {realTimeLocation && (
              <Marker coordinate={realTimeLocation}>
                <Image
                  source={require("../../assets/rec.png")}
                  style={{ width: 60, height: 60 }}
                />
                <Callout>
                  <Text>Your current Location</Text>
                </Callout>
              </Marker>
            )}
            <Marker coordinate={destination}>
              <Image
                source={require("../../assets/hospitalmarker.png")}
                style={{ width: 60, height: 60 }}
              />
              <Callout>
                <Text>Your destination Location</Text>
              </Callout>
            </Marker>
            {geoJson && !geoJson["error"] ? (
              <Geojson
                geojson={geoJson}
                strokeColor={colors.danger}
                fillColor="red"
                strokeWidth={4}
              />
            ) : null}
            <Polyline
              coordinates={polylineCoords}
              strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={6}
              zIndex={1}
            />
          </MapView>
          {geoJson && (
            <AlertDialog
              visible={geoJson["error"]}
              message="Could not find apropriate route or path"
            />
          )}
        </View>
      )}
    </View>
  );
};

export default AgentDeliveryRouteScreen;

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
