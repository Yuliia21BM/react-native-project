import { Image, View, Text, StyleSheet } from "react-native";

export default function PostItem({ item }) {
  return (
    <View style={styles.container}>
      <Image source={item.photo} style={styles.photo} />
      <View>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginHorizontal: 16,
  },
  photo: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    fontFamily: "RobotoBold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "RobotoReg",
    fontSize: 11,
    lineHeight: 13,
  },
});
