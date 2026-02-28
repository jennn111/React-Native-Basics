import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const data = [
    { id: "1", name: "Item One" },
    { id: "2", name: "Item Two" },
    { id: "3", name: "Item Three" },
  ];

  const closeModal = () => {
    setModalVisible(false);
    Alert.alert("Modal Closed");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        }}
        style={styles.image}
      />

      <SearchBar value={search} onChangeText={setSearch} />

      {/* FlatList */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.name}</Text>
        )}
      />

      {/* Form Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.form}
      >
        <TextInput
          placeholder="Enter something..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
        />

        <Button
          title="Submit"
          onPress={() => Alert.alert("Input Submitted", inputText)}
        />

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => Alert.alert("Touchable Pressed")}
        >
          <Text style={{ color: "white" }}>Press Me</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Navigate Button */}
      <Button title="Go to Orders" onPress={() => router.push("/orders")} />

      {/* Modal Button */}
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>This is a modal</Text>

            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  listItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  form: {
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  touchable: {
    backgroundColor: "blue",
    padding: 12,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
});