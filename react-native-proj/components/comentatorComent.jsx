import { Image, Text, View, StyleSheet } from "react-native";

export const CommentatorComment = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Image source={comment.user.photo} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <Text style={styles.commentTime}>{comment.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 28,
    height: 28,
    marginRight: 16,
  },
  textWrap: {
    flex: 1,
    backgroundColor: "#00000008",
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontFamily: "RobotoReg",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentTime: {
    fontFamily: "RobotoReg",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "#BDBDBD",
  },
});
