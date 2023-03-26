import { useState, useEffect } from "react";
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

export default function PostScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [
        ...prev,
        {
          photo: route.params.formData.photo,
          name: route.params.formData.title,
          locationDescr: route.params.formData.locationDescr,
          location: route.params.formData.location,
          id: 117,
          comments: 0,
          likes: 0,
        },
      ]);
    }
  }, [route]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 32,
        paddingBottom: 65,
      }}
    >
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
    marginBottom: 32,
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
