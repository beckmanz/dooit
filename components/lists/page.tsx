import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { supabase } from '@/lib/supabase';
import Loading from "../../app/index"
import { ListNone } from '../listsnone/page';
import { ListItem } from '../listItem/page';
import { PinnedNone } from '../pinnednone/page';
import { useAuth } from '@/contexts/AuthContext';

interface TaskListProps {
    activeTab: string | null;
}

export function TaskList({ activeTab }: TaskListProps) {
    const { user } = useAuth()
    const [taskLists, setTaskLists] = useState<any[]>([]);
    const [categories, setCategories] = useState<{ [key: number]: any }>({});
    const [loading, setLoading] = useState(true);

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
        } else {
            setTaskLists(data || []);
            fetchCategories(data)
        }

        setLoading(false);
    };


    const fetchCategories = async (taskLists: any[]) => {
        const categoryIds = taskLists.map((task) => task.category_id).filter(Boolean);
        if (categoryIds.length === 0) return;

        const { data: categories, error } = await supabase
            .from("category")
            .select("*")
            .in("id", categoryIds);

        if (error) {
            console.error("Erro ao buscar categorias:", error.message);
        } else {
            const categoriesMap = categories.reduce((acc, category) => {
                acc[category.id] = category;
                return acc;
            }, {});
            setCategories(categoriesMap);
        }
    };


    if (loading) {
        return <Loading />;
    }

    if (taskLists.length === 0 && activeTab === "Pinned") {
        return (
            <PinnedNone />
        );
    }
    if (taskLists.length === 0) {
        return (
            <ListNone />
        );
    }

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={taskLists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                const category = categories[item.category_id];
                return (
                    <View style={{ marginBottom: 10 }}>
                        <ListItem
                            title={item.name}
                            date={item.created_at}
                            pinned={item.pinned}
                            id={item.id}
                            categoryName={category?.name}
                            categoryColor={category?.color}
                        />
                    </View>
                );
            }}
        />
    );
}
