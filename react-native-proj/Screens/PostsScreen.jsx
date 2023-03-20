import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";
import defaultPhoto from "../assets/images/default-photo.jpg";
import defaultPage from "../assets/images/default-img.jpg";

import PostItem from "../components/PostItem";
const posts = [
  {
    photo: defaultPage,
    name: "Forest",
    lacotion: "Ivano-Frankivs'k Region, Ukraine",
    id: "111",
    comments: 0,
    likes: 0,
  },
  {
    photo: defaultPage,
    name: "Forest",
    lacotion: "Ivano-Frankivs'k Region, Ukraine",
    id: "112",
    comments: 0,
    likes: 0,
  },
];
export default function PostScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 32 }}>
      <View style={styles.container}>
        <Image source={defaultPhoto} style={styles.photo} />
        <View>
          <Text style={styles.userName}>Yulia</Text>
          <Text style={styles.userEmail}>yulia@gmail.com</Text>
        </View>
      </View>
      <SafeAreaView>
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostItem item={item} />}
          keyExtractor={(item) => item.id}
          style={{ paddingTop: 32, gap: 34 }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
