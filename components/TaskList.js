import { FlatList, StyleSheet, Text, View } from "react-native";
import initialTasks from "../data/tasks.json";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks = initialTasks, onTaskPress }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => String(item?.id ?? index)}
        renderItem={({ item }) => (
          <TaskCard task={item} onPress={() => onTaskPress?.(item)} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks found.</Text>}
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
