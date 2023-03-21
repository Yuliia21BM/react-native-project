import { Image, View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PostItem({ item }) {
  const navigations = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={item.photo} style={styles.photo} />
      <View>
        <Text style={{ ...styles.title, marginBottom: 11 }}>{item.name}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather
              name="message-circle"
              size={24}
              color="#BDBDBD"
              style={styles.messageIcon}
              onPress={() => navigations.navigate("Comments")}
            />
            <Text
              style={{
                ...styles.title,
                color: item.comments === 0 ? "#BDBDBD" : "#212121",
                marginLeft: 9,
                fontFamily: "RobotoReg",
              }}
            >
              {item.comments}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather
              name="thumbs-up"
              size={24}
              color={item?.likes === 0 ? "#BDBDBD" : "#FF6C00"}
            />
            <Text
              style={{
                ...styles.title,
                color: item.likes === 0 ? "#BDBDBD" : "#212121",
                marginLeft: 9,
                fontFamily: "RobotoReg",
              }}
            >
              {item.likes}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.location}>{item.lacotion}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 34,
  },
  photo: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontFamily: "RobotoBold",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  messageIcon: {
    transform: [{ rotate: "270deg" }],
  },
  location: {
    fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
