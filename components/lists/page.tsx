import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Checkbox } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';
import colors from '@/constants/colors';
import { ListNone } from '../listsnone/page';
import { PinnedNone } from '../pinnednone/page';
import { router } from 'expo-router';
import { NewListModal } from '../modal/newList';

interface TaskListProps {
    activeTab: string | null;
}

export function TaskList({ activeTab }: TaskListProps) {
    const { user } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [taskLists, setTaskLists] = useState<any[]>([]);
    const [categories, setCategories] = useState<{ [key: number]: any }>({});
    const [tasks, setTasks] = useState<{ [key: number]: any[] }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTaskLists();
    }, [activeTab]);

    const fetchTaskLists = async () => {
        setLoading(true);

        let query = supabase
            .from("tasks_lists")
            .select("*")
            .eq("user_id", user?.id)
            .order("created_at", { ascending: false });

        if (activeTab === "Pinned") {
            query = query.eq("pinned", true);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Erro ao buscar listas:", error.message);
            setLoading(false);
            return;
        }

        setTaskLists(data || []);
        fetchCategories(data);
        fetchTasksForLists(data);

        setLoading(false);
    };

    const fetchCategories = async (taskLists: any[]) => {
        const categoryIds = taskLists.map((task) => task.category_id).filter(Boolean);
        if (categoryIds.length === 0) return;

        const { data: categories, error } = await supabase
            .from("categories")
            .select("*")
            .in("id", categoryIds);

        if (error) {
            console.error("Erro ao buscar categorias:", error.message);
            return;
        }

        const categoriesMap = categories.reduce((acc, category) => {
            acc[category.id] = category;
            return acc;
        }, {});

        setCategories(categoriesMap);
    };

    const fetchTasksForLists = async (taskLists: any[]) => {
        const listIds = taskLists.map((list) => list.id);
        if (listIds.length === 0) return;

        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .in("list_id", listIds)
            .eq("completed", false)
            .limit(4);

        if (error) {
            console.error("Erro ao buscar tasks:", error.message);
            return;
        }

        const tasksMap = listIds.reduce((acc, listId) => {
            acc[listId] = data.filter((task) => task.list_id === listId);
            return acc;
        }, {});

        setTasks(tasksMap);
    };

    const handleSubmit = async () => {
        setLoading(true)
        await fetchTaskLists();
        setLoading(false)
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={60} color={colors.black} />
            </View>
        )
    }

    if (taskLists.length === 0) {
        return activeTab === "Pinned" ? <PinnedNone /> : <ListNone />;
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={taskLists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const category = categories[item.category_id];
                    const listTasks = tasks[item.id] || [];

                    return (
                        <Pressable
                            style={[styles.container, item.pinned && styles.pinnedContainer, { backgroundColor: category?.color }]}
                            onPress={() => router.push({ pathname: '/(panel)/list/page', params: { id: item.id, title: item.name } })}
                        >
                            <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={listTasks}
                                keyExtractor={(task) => task.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.tasksItem}>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox status={item.completed ? 'checked' : 'unchecked'} color={colors.black} />
                                        </View>
                                        <Text
                                            style={[styles.taskText, item.completed && styles.completedTaskText]}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.description}
                                        </Text>
                                    </View>
                                )}
                            />

                            <View style={styles.footer}>
                                <Text style={styles.textCategory}>{category?.name}</Text>
                                <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                                    <Feather name="calendar" size={24} color="black" />
                                    <Text>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
                                </View>
                            </View>
                        </Pressable>
                    );
                }}
            />
            <View style={styles.buttonAdd}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-circle" size={75} color="black" />
                </TouchableOpacity>
            </View>
            <NewListModal visible={modalVisible} onClose={() => setModalVisible(false)} atualizar={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 17,
        paddingHorizontal: 22,
        borderRadius: 10,
        gap: 10,
        marginBottom: 10
    },
    pinnedContainer: {
        borderWidth: 2,
        borderColor: colors.black,
    },
    titleText: {
        fontSize: 22,
        color: colors.black,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    textCategory: {
        color: colors.white,
        fontSize: 13,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.black,
        borderRadius: 5
    },
    buttonAdd: {
        position: 'absolute',
        bottom: '5%',
        right: 0,

    },

    // Tasks Styles
    tasksItem: {
        alignItems: "center",
        flexDirection: "row",
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        color: colors.black,
    },
    completedTaskText: {
        textDecorationLine: 'line-through',
    },
    checkboxContainer: {
        marginLeft: -8,
    }
});
