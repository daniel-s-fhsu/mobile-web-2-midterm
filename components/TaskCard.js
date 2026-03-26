import { Image, StyleSheet, Text, View } from "react-native";

export default function TaskCard({ task }) {
  const isComplete = Boolean(task?.isCompleted ?? task?.completed);
  const taskType = task?.category ?? task?.priority ?? "General";

  return (
    <View style={styles.card}>
      {!!task?.image && (
        <Image source={{ uri: task.image }} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{task?.title ?? "Untitled Task"}</Text>
        {!!task?.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
        <Text style={styles.tag}>
          {taskType}    ||    {isComplete ? "Done" : "To Do"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 6,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  tag: {
    fontSize: 12,
    color: "#777",
  },
});
