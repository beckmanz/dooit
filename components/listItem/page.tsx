import moment from 'moment';
import colors from '@/constants/colors';
import { supabase } from '@/lib/supabase';
import { Checkbox } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import Loading from '@/app';

interface Props {
    title: string;
    date: string;
    pinned: boolean;
    id: number;
    categoryName: string;
    categoryColor: string;
}
export function ListItem({ title, date, pinned, id, categoryName, categoryColor }: Props) {
    const formattedDate = moment(date).format('DD-MM-YYYY')
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const listData = {
        id: id,
        title: title,
    };

    useEffect(() => {
        setLoading(true)
        fetchTasks();
        setLoading(false)
    }, []);

    const fetchTasks = async () => {
        let query = supabase
            .from("tasks")
            .select("*")
            .eq("list_id", id)
            .eq("completed", false)
            .limit(4);

        const { data, error } = await query;

        if (error) {
            console.error("Erro ao buscar listas:", error.message);
        } else {
            setTasks(data || []);
        }
    };
    if (loading) {
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={60} color={colors.black} />
        </View>
    }
    return (
        <Pressable style={[styles.container, pinned && styles.pinnedContainer, { backgroundColor: categoryColor }]}
            onPress={() => router.push({ pathname: '/(panel)/list/page', params: listData })}>
            <Text style={styles.titleText}>{title}</Text>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.tasksItem}>
                            <View style={styles.checkboxContainer}>
                                <Checkbox status={item.completed ? 'checked' : 'unchecked'} color={colors.black} />
                            </View>
                            <Text style={[styles.taskText, item.completed && styles.completedTaskText]}
                                numberOfLines={1}
                                ellipsizeMode="tail">{item.description}</Text>
                        </View>
                    )
                }} />

            <View style={styles.footer}>
                <Text style={styles.textCategory}>{categoryName}</Text>
                <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                    <Feather name="calendar" size={24} color="black" />
                    <Text>{formattedDate}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 17,
        paddingHorizontal: 22,
        borderRadius: 10,
        gap: 10
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

    //Tasks Styles

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