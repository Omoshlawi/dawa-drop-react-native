import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, IconButton } from "react-native-paper";
import useLocation from "../../hooks/useLocation";
import MapView, { Marker } from "react-native-maps";
import colors from "../../utils/colors";

const LocationChoice = ({ setVisible, onLocationChosen }) => {
  const location = useLocation();
  return (
    <View style={styles.screen}>
      <IconButton
        icon="close"
        mode="outlined"
        style={styles.close}
        onPress={() => setVisible(false)}
      />
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
            <Marker
              coordinate={location}
              title="You current location"
              // description="You current location"
            />
          </MapView>
        </View>
      )}
    </View>
  );
};

export default LocationChoice;

const styles = StyleSheet.create({
  close: {
    alignSelf: "flex-end",
    margin: 10,
  },
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
