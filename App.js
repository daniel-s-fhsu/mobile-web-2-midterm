import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import initialTasks from './data/tasks.json';
import AddTaskPage from './pages/AddTaskPage';
import HomePage from './pages/HomePage';
import TaskDetailsPage from './pages/TaskDetailsPage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomePage {...props} tasks={tasks} />}
        </Stack.Screen>
        <Stack.Screen name="Task Details" component={TaskDetailsPage} />
        <Stack.Screen name="Add Task">
          {(props) => <AddTaskPage {...props} onAddTask={handleAddTask} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
