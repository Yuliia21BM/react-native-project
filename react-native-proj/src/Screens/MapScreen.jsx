import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const [locationDescr, setlocationDescr] = useState("");
  const [location, setLocation] = useState({});
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    if (route.params) {
      setlocationDescr(route.params.locationDescr);
      setLocation(route.params.location);
      setPhoto(route.params.photo);
    }
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            title={locationDescr}
            coordinate={location}
            description="Hello"
            pinColor="#ff6600"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
