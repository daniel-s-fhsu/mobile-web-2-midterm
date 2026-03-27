import { StyleSheet, Text, View } from "react-native";
import TaskDetails from "../components/TaskDetails";

export default function TaskDetailsPage({ route }) {
  const task = route?.params?.task;

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
});
