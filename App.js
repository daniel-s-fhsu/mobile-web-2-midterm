import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import initialTasks from './data/tasks.json';
import AddTaskPage from './pages/AddTaskPage';
import HomePage from './pages/HomePage';
import TaskDetailsPage from './pages/TaskDetailsPage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  // React native cannot modify JSON files that are bundled as part of the app
  // There is no permanance to the changes made to the tasks, but it will work for testing purposes
  // Presumably the tasks would be stored in a database, and this would be fixed in a final version

  const handleAddTask = (taskInput) => {
    setTasks((prevTasks) => {
      // Get the last task (if exists) and increment its ID for the new task
      const lastTask = prevTasks[prevTasks.length - 1];
      const nextId = lastTask ? lastTask.id + 1 : 1;  // if no tasks, start with ID 1

      const newTask = {
        id: nextId,
        title: taskInput.title.trim(),
        description: taskInput.description.trim(),
        category: taskInput.category.trim(),
        image: taskInput.image.trim(),
        dueDate: taskInput.dueDate.trim(),
      };

      return [...prevTasks, newTask];
    });
  };

  // delete a task by task id
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {(props) => (
              <HomePage
                {...props}
                tasks={tasks}
                onTaskDelete={handleDeleteTask}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Task Details">
            {(props) => <TaskDetailsPage {...props} onTaskDelete={handleDeleteTask} />}
          </Stack.Screen>
          <Stack.Screen name="Add Task">
            {(props) => <AddTaskPage {...props} onAddTask={handleAddTask} />}
          </Stack.Screen>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
