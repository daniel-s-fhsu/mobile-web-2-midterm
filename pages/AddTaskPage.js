import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import categoryItemsJson from "../data/categories.json";

const webDateInputStyle = {
  width: "100%",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 14,
  backgroundColor: "#fff",
  color: "#222",
};

export default function AddTaskPage({ navigation, onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState(categoryItemsJson);
  const [dueDate, setDueDate] = useState("");
  const [image, setImage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date) => {
    const year = date.getFullYear();
    //Format month and day with leading zeros if needed
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseDate = (value) => {
    if (!value) return new Date();
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      setDueDate(formatDate(selectedDate));
    }
  };

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedCategory = category ? category.trim() : "";
    const trimmedDueDate = dueDate.trim();
    const trimmedImage = image.trim();

    if (
      !trimmedTitle ||
      !trimmedDescription ||
      !trimmedCategory ||
      !trimmedDueDate ||
      !trimmedImage
    ) {
      Alert.alert("All fields required", "Please complete every field.");
      return;
    }

    onAddTask({
      title: trimmedTitle,
      description: trimmedDescription,
      category: trimmedCategory,
      dueDate: trimmedDueDate,
      image: trimmedImage,
    });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Task title"
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Task description"
          style={[styles.input, styles.multilineInput]}
          multiline
          textAlignVertical="top"
        />
      </View>

      <View style={[styles.field, styles.categoryField]}>
        <Text style={styles.label}>Category</Text>
        <DropDownPicker
          open={categoryOpen}
          value={category}
          items={categoryItems}
          setOpen={setCategoryOpen}
          setValue={setCategory}
          setItems={setCategoryItems}
          placeholder="Select category"
          listMode="MODAL"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          modalTitle="Select Category"
          modalContentContainerStyle={styles.dropdownModalContent}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Due Date</Text>
        {/* Testing on web client, needed to use different date picker
        to make it work.  Mobile date picker would not open on click */}
        {Platform.OS === "web" ? (
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            style={webDateInputStyle}
          />
        ) : (
          <>
            <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text style={dueDate ? styles.dateValue : styles.datePlaceholder}>
                {dueDate || "Select due date"}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={parseDate(dueDate)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
              />
            )}
            {/* Testing on iPhone, needed done button */}
            {Platform.OS === "ios" && showDatePicker && (
              <Pressable
                onPress={() => setShowDatePicker(false)}
                style={styles.doneButton}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          value={image}
          onChangeText={setImage}
          placeholder="https://..."
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          style={styles.input}
        />
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Add Task</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  field: {
    marginBottom: 12,
  },
  categoryField: {
    zIndex: 1000,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 8,
    minHeight: 44,
  },
  dropdownContainer: {
    borderColor: "#ddd",
  },
  dropdownModalContent: {
    paddingTop: 12,
  },
  multilineInput: {
    minHeight: 90,
  },
  datePlaceholder: {
    fontSize: 14,
    color: "#999",
  },
  dateValue: {
    fontSize: 14,
    color: "#222",
  },
  doneButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  doneButtonText: {
    fontSize: 13,
    color: "#333",
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
