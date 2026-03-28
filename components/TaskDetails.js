import { Image, StyleSheet, Text, View } from "react-native";

export default function TaskDetails({ task }) {
  if (!task) return null;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {!!task?.image && (
          <Image source={{ uri: task.image }} style={styles.image} resizeMode="cover" />
        )}

        <View style={styles.infoBlock}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.detailText}>Type: {task.category}</Text>
          <Text style={styles.detailText}>Due by: {task.dueDate}</Text>
        </View>
      </View>


      {!!task?.description && (
        <Text style={styles.description}>{task.description}</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
    marginRight: 12,
  },
  infoBlock: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
});
