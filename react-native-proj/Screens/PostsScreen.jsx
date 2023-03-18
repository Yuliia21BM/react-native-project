import { SafeAreaView, FlatList } from "react-native";
import defaultPhoto from "../assets/images/default-photo.jpg";

import PostItem from "../components/PostItem";
const posts = [
  {
    photo: defaultPhoto,
    name: "Yulia",
    email: "yulia@gmail.com",
    id: "111",
  },
];
export default function PostScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem item={item} />}
        keyExtractor={(item) => item.id}
        style={{ paddingTop: 32 }}
      />
    </SafeAreaView>
  );
}
