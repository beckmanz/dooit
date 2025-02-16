import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput, FlatList, ActivityIndicator } from 'react-native'
import colors from '@/constants/colors'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { ListItem } from '@/components/listItem/page';

export default function page() {
    const { user } = useAuth()
    const [searchText, setSearchText] = useState('');
    const [tasksSearchList, settasksSearchList] = useState<any[]>([]);
    const [categories, setCategories] = useState<{ [key: number]: any }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchText.trim() !== '') {
                SearchTaskLists(searchText);
            } else {
                settasksSearchList([])
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    async function SearchTaskLists(searchText: string) {
        setLoading(true);

        let query = supabase
            .from("tasks_lists")
            .select("*")
            .eq("user_id", user?.id)
            .ilike('name', `%${searchText}%`);

        const { data, error } = await query;

        if (error) {
            console.error("Erro ao buscar listas:", error.message);
        } else {
            settasksSearchList(data || [])
            fetchCategories(data)
        }

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
        } else {
            const categoriesMap = categories.reduce((acc, category) => {
                acc[category.id] = category;
                return acc;
            }, {});
            setCategories(categoriesMap);
        }
    };

    function rederSearch() {
        if (tasksSearchList.length === 0) {
            return (
                <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 17, textAlign: "center" }}>
                        No lists found...
                    </Text>
                </View>
            )
        }
        if (loading) {
            return (
                <View style={styles.containerLoading}>
                    <ActivityIndicator size={50} color={colors.black} />
                </View>
            )
        }
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tasksSearchList}
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
        )
    }

    const handleCancel = () => {
        setSearchText('');
        settasksSearchList([])
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.containerInput}>
                    <Feather name="search" size={25} color={colors.black} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search your list"
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {searchText.length > 0 && (
                        <Pressable onPress={() => setSearchText('')}>
                            <MaterialIcons name="cancel" size={24} color="grey" />
                        </Pressable>
                    )}
                </View>
                <Pressable style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
            </View>
            <View style={styles.content}>
                {rederSearch()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        gap: 20
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 15
    },
    containerInput: {
        flex: 1,
        height: 43,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        gap: 4
    },
    searchInput: {
        flex: 1,
        height: "100%",
        fontSize: 17,
        color: '#333',
    },
    cancelButton: {
        alignItems: "center",
        justifyContent: "center"
    },
    cancelText: {
        fontSize: 21,
        color: colors.black,
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

})