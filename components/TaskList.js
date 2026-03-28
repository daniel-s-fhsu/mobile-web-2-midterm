import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import initialTasks from "../data/tasks.json";
import { Swipeable } from "react-native-gesture-handler";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks = initialTasks, onTaskPress, onTaskDelete }) {
  const renderRightActions = (taskId) => {
    return (
      // Swipable action deletes a task, swipe left to reveal red delete text
      <Pressable style={styles.deleteAction} onPress={() => onTaskDelete?.(taskId)}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* FlatList component
      displays data/tasks.json as a list of clickable/swipable components */}
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => String(item?.id ?? index)}
        renderItem={({ item }) => (
          <Swipeable
            overshootRight={false}
            rightThreshold={40}
            renderRightActions={() => renderRightActions(item.id)}
            onSwipeableOpen={() => onTaskDelete?.(item.id)}
          >
            <TaskCard task={item} onPress={() => onTaskPress?.(item)} />
          </Swipeable>
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
  deleteAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 96,
    backgroundColor: "#dc2626",
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
