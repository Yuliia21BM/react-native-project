import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import defaultPage from "../assets/images/default-img.jpg";
import comentator from "../assets/images/commentator.png";
import comentUser from "../assets/images/coment-user.png";
import { UserComment } from "../components/userComent";
import { CommentatorComment } from "../components/comentatorComent";

const comments = [
  {
    user: {
      name: "User",
      email: "yulia@gmail.com",
      photo: comentator,
      id: 111,
    },
    comment:
      "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    time: "09 июня, 2020 | 08:40",
    id: 111,
  },
  {
    user: {
      name: "Yulia",
      email: "yulia@gmail.com",
      photo: comentUser,
      id: 112,
    },
    comment:
      "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    time: "09 июня, 2020 | 09:14",
    id: 112,
  },
  {
    user: {
      name: "User",
      email: "yulia@gmail.com",
      photo: comentator,
      id: 111,
    },
    comment: "Great!",
    time: "09 июня, 2020 | 08:40",
    id: 113,
  },
];

export default function CommentsScreen() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <Image source={defaultPage} style={styles.photo} />
        <SafeAreaView>
          <FlatList
            data={comments}
            renderItem={({ item }) =>
              item.id === 112 ? (
                <UserComment comment={item} />
              ) : (
                <CommentatorComment comment={item} />
              )
            }
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
          />
        </SafeAreaView>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Write comment..."
            placeholderColor=" #BDBDBD"
          />
          <View style={styles.inputBtn}>
            <Feather name="arrow-up" size={24} color="#fff" />
          </View>
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
