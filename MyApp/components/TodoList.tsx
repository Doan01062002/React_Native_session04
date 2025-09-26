import React from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

interface Todo {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodo, setNewTodo] = React.useState<string>("");

  const addTodo = () => {
    if (newTodo.trim().length > 0) {
      setTodos([...todos, { id: Math.random(), text: newTodo }]);
      setNewTodo("");
    } else {
      Alert.alert("Lỗi", "Ghi chú không được để trống");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Bài 6 - Todo List</Text>
        
        <View style={styles.navBar}>
          <TextInput
            onChangeText={setNewTodo}
            value={newTodo}
            style={styles.inputText}
            placeholder="Nhập ghi chú mới"
          />
          <Button title="Thêm" onPress={() => { addTodo() }} />
        </View>

        <View>
          {todos.map(todo => (
            <View key={todo.id} style={styles.noteTask}>
              <Text style={styles.todoText}>{todo.text}</Text>
              <Button color={"red"} title="Xóa" onPress={() => { deleteTodo(todo.id) }} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: "#f0e9e9ff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  navBar: {
    flexDirection: "row",
    gap: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  noteTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    marginBottom: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default TodoList;