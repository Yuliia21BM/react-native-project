import { Image, Text, View, StyleSheet } from "react-native";

export const UserComment = ({ comment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <Text style={styles.commentTime}>{comment.commentTime}</Text>
      </View>
      <Image source={{ uri: comment.photo }} style={styles.image} />
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
    marginLeft: 16,
  },
  textWrap: {
    flex: 1,
    backgroundColor: "#00000008",
    padding: 16,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
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
