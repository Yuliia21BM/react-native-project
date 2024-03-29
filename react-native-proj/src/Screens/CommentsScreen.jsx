import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UserComment } from "../components/userComent";
import { CommentatorComment } from "../components/comentatorComent";
import { addCommentToPost } from "../redux/posts/postsOperations";
import { selectAvatar, selectUserId } from "../redux/auth/authSelectors";
import { getCommentsByPostId } from "../redux/posts/postsOperations";
import { selectComments } from "../redux/posts/postsSelectors";

function CommentsScreen({ route }) {
  const currentUserId = useSelector(selectUserId);
  const avatar = useSelector(selectAvatar);
  const postId = route.params.postId;
  const photo = route.params.photo;
  const comments = useSelector(selectComments);
  const [comment, setComment] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsByPostId(postId));
  }, [postId]);

  const updateTime = () => {
    const currentDate = new Date();
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    const formattedDate = currentDate.toLocaleDateString("uk-UA", options);
    return formattedDate;
  };

  const onSubmitComment = () => {
    const commentTime = updateTime();
    const commentInfo = {
      comment,
      commentTime,
      photo: avatar,
    };
    dispatch(addCommentToPost(postId, commentInfo));
    Keyboard.dismiss();
    setComment("");
    dispatch(getCommentsByPostId(postId));
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.photo} />
        <FlatList
          data={comments}
          renderItem={({ item }) =>
            item.userId === currentUserId ? (
              <UserComment comment={item} />
            ) : (
              <CommentatorComment comment={item} />
            )
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
        />
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={comment}
            placeholder="Write comment..."
            placeholderColor=" #BDBDBD"
            onBlur={() => Keyboard.dismiss()}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.inputBtn}
            onPress={() => comment && onSubmitComment()}
          >
            <Feather name="arrow-up" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 65,
  },
  photo: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    marginBottom: 32,
  },
  inputWrap: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    padding: 13,
    fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputBtn: {
    position: "absolute",
    top: 11,
    right: 8,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
