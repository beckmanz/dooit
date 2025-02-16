import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import { supabase } from '@/lib/supabase';
import { Back } from '@/components/button/back';
import { FontAwesome6 } from '@expo/vector-icons';
import colors from '@/constants/colors';
import { Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TaskList {
    id: number;
    title: string;
    pinned: boolean;
    category_id: number;
}
export default function TaskListScreen() {
    const { id, title } = useLocalSearchParams();
    const router = useRouter();
    const [list, setList] = useState<TaskList | null>(null);
    const [tasks, setTasks] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [isPinned, setIsPinned] = useState(false);
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetchList(),
            fetchTasks(),
            fetchCategorys()
        ])
        setLoading(false)
    }, [id]);

    const fetchList = async () => {
        try {
            const { data, error } = await supabase
                .from('tasks_lists')
                .select('*')
                .eq('id', id)
                .single();;

            if (error) {
                throw error;
            }

            setList(data);
            setCategoryId(data.category_id)
            setIsPinned(data.pinned);
        } catch (error) {
            console.error('Erro ao buscar tarefas:');
        }
    };

    const fetchTasks = async () => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('list_id', id)
                .order("created_at", { ascending: true });

            if (error) {
                throw error;
            }

            setTasks(data || []);
        } catch (error) {
            console.error('Erro ao buscar tarefas:');
        }
    };

    const fetchCategorys = async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*');

            if (error) {
                throw error;
            }

            setCategories(data || []);
        } catch (error) {
            console.error('Erro ao buscar categorias:');
        }
    };

    const addNewTask = async () => {
        if (newTaskDescription.trim() === '') return;
        if (tasks.length >= 30) return Alert.alert('Warn', 'You have reached the maximum number of tasks! Complete or remove some before adding new ones.')

        const newTask = {
            description: newTaskDescription,
            completed: false,
            list_id: id,
        };

        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([newTask])
                .select();

            if (error) {
                throw error;
            }

            setTasks((prevTasks) => [...prevTasks, ...data]);
            setNewTaskDescription('');
        } catch (error) {
            console.error('Erro ao adicionar tarefa:');
        }
    };

    const toggleTaskCompletion = async (taskId: number, completed: boolean) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .update({ completed: !completed })
                .eq('id', taskId);

            if (error) {
                throw error;
            }

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, completed: !completed } : task
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar tarefa:');
        }
    };

    const togglePinnedList = async () => {
        const newPinnedStatus = !isPinned; // Novo status
        setIsPinned(newPinnedStatus);
        try {
            const { error } = await supabase
                .from('tasks_lists')
                .update({ pinned: !isPinned })
                .eq('id', id);

            if (error) {
                throw error;
            }

        } catch (error) {
            setIsPinned(!newPinnedStatus)
            console.error('Erro ao atualizar status de pinned:', error);
        }
    }

    const toggleChangeCategory = async (newCategoryId: number) => {
        setCategoryId(newCategoryId);
        try {
            const { error } = await supabase
                .from('tasks_lists')
                .update({ category_id: newCategoryId })
                .eq('id', id);

            if (error) {
                throw error;
            }
        } catch (error) {
            setCategoryId((prev) => prev);
            console.error('Erro ao atualizar a categoria:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Back onPress={() => router.push('/(panel)/home/page')} />
                    <TouchableOpacity style={[styles.buttonPin, isPinned && { backgroundColor: colors.black }]} onPress={() => togglePinnedList()}>
                        <FontAwesome6 name="map-pin" size={13} color={isPinned ? 'white' : 'black'} />
                        <Text style={{ fontSize: 17, textAlign: "center", color: isPinned ? colors.white : colors.black }}>{isPinned ? 'Pinned' : 'Pin'}</Text>
                    </TouchableOpacity >
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    {tasks.map((item) => (
                        <View key={item.id.toString()} style={styles.taskItem}>
                            <View style={{ marginLeft: -8 }}>
                                <Checkbox
                                    status={item.completed ? 'checked' : 'unchecked'}
                                    color={colors.black}
                                    onPress={() => toggleTaskCompletion(item.id, item.completed)}
                                />
                            </View>
                            <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
                                {item.description}
                            </Text>
                        </View>
                    ))}
                    <View style={styles.addTaskContainer}>
                        <TouchableOpacity onPress={addNewTask}>
                            <Octicons name="diff-added" size={20} color="black" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.taskInput}
                            placeholder="To-Do"
                            value={newTaskDescription}
                            onChangeText={setNewTaskDescription}
                            maxLength={80}
                            multiline
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const isCategoryList = item.id == categoryId;
                        return (
                            <TouchableOpacity style={[styles.categoryButton, isCategoryList && { backgroundColor: colors.black }]} onPress={() => toggleChangeCategory(item.id)}>
                                <Text style={{ fontSize: 16, color: colors.white, fontWeight: 'bold' }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        gap: 7
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonPin: {
        height: 32,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        gap: 5,
        borderRadius: 8
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addTaskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 1
    },
    taskInput: {
        flex: 1,
        padding: 5,
        fontSize: 16,
        marginLeft: 5
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskText: {
        flex: 1,
        fontSize: 16,
    },
    completedTaskText: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    categoryButton: {
        backgroundColor: colors.grey,
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        margin: 5
    }
});