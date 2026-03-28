import { useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TaskDetails from "../components/TaskDetails";

export default function TaskDetailsPage({ route, navigation, onTaskDelete }) {
  const task = route?.params?.task;

  // button on the header deletes current task
  const handleDelete = () => {
    onTaskDelete?.(task.id);
    navigation.goBack();
  };

  // button and text show on the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        task ? (
          <Pressable onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        ) : null,
    });
  }, [navigation, task, onTaskDelete]);

  if (!task) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No task selected.</Text>
      </View>
    );
  }
  return <TaskDetails task={task} />;
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  deleteButton: {
    minWidth: 70,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    color: "#dc2626",
    textAlign: "center",
    includeFontPadding: false,
  },
});
