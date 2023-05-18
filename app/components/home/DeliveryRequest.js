import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, IconButton, List } from "react-native-paper";
import useLocation from "../../hooks/useLocation";
import MapView, { Marker, Callout } from "react-native-maps";
import colors from "../../utils/colors";
import { screenWidth } from "../../utils/contants";
import DeliveryRequestCallout from "./DeliveryRequestCallout";

const DeliveryRequest = ({ request }) => {
  const location = useLocation();
  return (
    <View style={styles.screen}>
      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={location} title="Your current Location" />
            {request.map((request_, index) => {
              const { name, destination, address, delivery_mode, time_slot } =
                request_;
              return (
                <Marker coordinate={destination} title={name} key={index}>
                  <Image
                    source={require("../../assets/hospitalmarker.png")}
                    style={{ width: 60, height: 60 }}
                  />
                  <Callout
                    style={styles.callOut}
                    onPress={() => {
                      console.log(request_);
                    }}
                  >
                    <DeliveryRequestCallout request={request_} />
                  </Callout>
                </Marker>
              );
            })}
          </MapView>
        </View>
      )}
    </View>
  );
};

export default DeliveryRequest;

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
  closeBtn: {
    position: "absolute",
    zIndex: 1,
    top: 20,
    right: 20,
  },
  callOut: {
    borderRadius: 10,
  },
});
