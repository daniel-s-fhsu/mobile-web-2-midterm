import { useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TaskList from "../components/TaskList";

export default function HomePage({ navigation, tasks, onTaskDelete }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Add Task")} style={styles.addButton}>
          <Text style={styles.addButtonText}>New</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleTaskPress = (task) => {
    navigation.navigate("Task Details", { task });
  };

  return (
    <View style={styles.container}>
      <TaskList
        tasks={tasks}
        onTaskPress={handleTaskPress}
        onTaskDelete={onTaskDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addButton: {
    minWidth: 52,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  addButtonText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    includeFontPadding: false,
  },
});
