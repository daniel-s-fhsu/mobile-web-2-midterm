import { FlatList, StyleSheet, Text, View } from "react-native";
import Tasks from "../data/tasks.json";
import TaskCard from "./TaskCard";

export default function TaskList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Tasks}
        keyExtractor={(item, index) => String(item?.id ?? index)}
        renderItem={({ item }) => <TaskCard task={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 24,
    fontSize: 15,
  },
});
