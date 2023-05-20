import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polyline, Geojson } from "react-native-maps";
import useLocation from "../../hooks/useLocation";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import colors from "../../utils/colors";
import {
  LocationAccuracy,
  watchHeadingAsync,
  watchPositionAsync,
} from "expo-location";

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

  if (status !== "in_progress") {
    return <Text>Please start the trip to show route</Text>;
  }

  return (
    <View style={styles.screen}>
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
