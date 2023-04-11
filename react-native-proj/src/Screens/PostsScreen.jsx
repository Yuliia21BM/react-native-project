import { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAvatar,
  selectUserName,
  selectUserEmail,
} from "../redux/auth/authSelectors";
import {
  selectAllPosts,
  selectisLoadingPosts,
} from "../redux/posts/postsSelectors";
import LoaderScreen from "./LoaderSrceen";

import { getAllPosts } from "../redux/posts/postsOperations";

import PostItem from "../components/PostItem";

export default function PostScreen() {
  const avatar = useSelector(selectAvatar);
  const userName = useSelector(selectUserName);
  const userEmaill = useSelector(selectUserEmail);
  const posts = useSelector(selectAllPosts);
  const isLoadingPosts = useSelector(selectisLoadingPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

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
        <Image
          source={avatar ? { uri: avatar } : defaultPhoto}
          style={styles.photo}
        />
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmaill}</Text>
        </View>
      </View>
      {isLoadingPosts ? (
        <LoaderScreen iconSize={60} />
      ) : (
        <SafeAreaView>
          <FlatList
            data={posts}
            renderItem={({ item }) => <PostItem item={item} />}
            keyExtractor={(item) => item.idPost}
          />
        </SafeAreaView>
      )}
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
