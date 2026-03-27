import { StyleSheet, View } from "react-native";
import TaskList from "../components/TaskList";

export default function HomePage({ navigation }) {
  const handleTaskPress = (task) => {
    navigation.navigate("Task Details", { task });
  };

  return (
    <View style={styles.container}>
      <TaskList onTaskPress={handleTaskPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
