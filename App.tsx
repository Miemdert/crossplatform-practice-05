import React, { useState } from 'react';
import {
  Button, FlatList, Pressable, StyleSheet,
  Text, TextInput, View,
} from 'react-native';
import {
  SafeAreaProvider, SafeAreaView,
} from 'react-native-safe-area-context';
 
type Task = {
  id: string;
  title: string;
  done: boolean;
};

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Изучить компоненты',
    done: false,
  },
  {
    id: '2',
    title: 'Настроить проект',
    done: true,
  },
];


export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const doneCount = tasks.filter((task) => task.done).length;


  function addTask() {
  const normalized = title.trim();
 
  if (!normalized) {
    setError('Введите название задачи');
    return;
  }


  const newTask: Task = {
    id: Date.now().toString(),
    title: normalized,
    done: false,
  };
 
  setTasks((previous) => [newTask, ...previous]);
  setTitle('');
  setError('');
}

function toggleTask(id: string) {
  setTasks((previous) =>
    previous.map((task) =>
      task.id === id
        ? { ...task, done: !task.done }
        : task,
    ),
  );
}


  return (
    <SafeAreaProvider>
<SafeAreaView style={styles.container}>
  <Text style={styles.heading}>Учебные задачи</Text>
 <Text style={styles.progress}>
  Выполнено: {doneCount} из {tasks.length}
</Text>

  <View style={styles.form}>
    <TextInput
      accessibilityLabel="Название новой задачи"
      value={title}
      onSubmitEditing={addTask}
      returnKeyType='done'
      onChangeText={(value) => {
  setTitle(value);
  if (error) setError('');
}}

      placeholder="Например, подготовить отчёт"
      style={styles.input}
    />
    {error ? (
  <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>
    {error}
  </Text>
) : null}
    <Button title="Добавить задачу" onPress={addTask} />
  </View>
  <FlatList
  data={tasks}
  keyExtractor={(item) => item.id}
  contentContainerStyle={
  tasks.length === 0 ? styles.emptyContainer : styles.list
}

  ListEmptyComponent={
    <Text style={styles.empty}>
      Список пуст. Добавьте задачу.
    </Text>
  }
  renderItem={({ item }) => (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={item.title}
      accessibilityState={{ checked: item.done }}
      onPress={() => toggleTask(item.id)}
      style={({ pressed }) => [
  styles.card,
  item.done && styles.cardDone,
  pressed && styles.pressed,
]}

    >
      <View style={styles.cardText}>
        <Text style={[
  styles.taskTitle,
  item.done && styles.taskTitleDone,
]}
>{item.title}</Text>
        <Text style={styles.status}>
          {item.done ? 'Выполнено' : 'В работе'}
        </Text>
      </View>
      <Text style={styles.mark}>
        {item.done ? '✓' : '○'}
      </Text>
    </Pressable>
  )}
/>
</SafeAreaView>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  heading: {
    fontSize: 26, fontWeight: '700',
    marginHorizontal: 16, marginTop: 12,
  },
  progress: { margin: 16, color: '#4B6268' },
  form: { gap: 10, paddingHorizontal: 16, paddingBottom: 16 },
  input: {
    borderWidth: 1, borderColor: '#5D6D72',
    borderRadius: 8, padding: 12, fontSize: 16,
  },
  error: { color: '#A33A32' },
  list: { gap: 10, padding: 16 },
  emptyContainer: {
    flexGrow: 1, justifyContent: 'center', padding: 16,
  },
  empty: { textAlign: 'center', color: '#5D6D72' },
  card: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, borderRadius: 12,
    backgroundColor: '#EDF3F4',
  },
  cardDone: { backgroundColor: '#E2EEE5' },
  pressed: { opacity: 0.7 },
  cardText: { flex: 1, marginRight: 12 },
  taskTitle: { fontSize: 17, fontWeight: '600' },
  taskTitleDone: { textDecorationLine: 'line-through' },
  status: { marginTop: 6, color: '#4B6268' },
  mark: { fontSize: 24, color: '#37616B' },
});


