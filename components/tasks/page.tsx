import colors from '@/constants/colors'
import { supabase } from '@/lib/supabase';
import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { Checkbox } from 'react-native-paper'
interface Props {
    list_id: number;
}
export function Tasks({ list_id }: Props) {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true)

        let query = supabase
            .from("tasks")
            .select("*")
            .eq("list_id", list_id)
            .limit(4);

        const { data, error } = await query;

        if (error) {
            console.error("Erro ao buscar listas:", error.message);
        } else {
            setTasks(data || []);
        }
        setLoading(false)
    };

    return (
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
                        <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>{item.description}</Text>
                    </View>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
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