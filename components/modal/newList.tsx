import React, { useEffect, useState } from 'react';
import { Modal, View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import colors from '@/constants/colors';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export function NewListModal({ visible, onClose }: Props) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);

    const [titleError, setTitleError] = useState('')
    const [categoryError, setCategoryError] = useState('')

    useEffect(() => {
        fetchCategorys();
    }, []);

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
            console.error('Erro ao buscar categorias:', error);
        }
    };

    const handleSubmit = async () => {
        setTitleError('')
        setCategoryError('')
        if (!title || title.trim() === '') {
            setTitleError('Title is required')
            return;
        }
        if (categoryId === null || categoryId === undefined) {
            setCategoryError('Select a category before proceeding')
            return;
        }

        const newList = {
            name: title,
            pinned: isPinned,
            category_id: categoryId,
            user_id: user?.id
        };

        try {
            const { data, error } = await supabase
                .from('tasks_lists')
                .insert([newList])
                .select();

            if (error) {
                throw error;
            }

            onClose
        } catch (error) {
            console.error('Erro ao adicionar lista:', error);
        }
        setTitle('');
        setCategoryId(null);
        setIsPinned(false);
        setTitleError('')
        setCategoryError('')
        window.location.reload();
        onClose();
    };

    const handleClose = () => {
        setTitle('');
        setCategoryId(null);
        setIsPinned(false);
        setTitleError('')
        setCategoryError('')
        onClose();
    }
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: 'space-between' }}>
                        <Text style={{ color: colors.black, fontSize: 22, fontWeight: "bold" }}>
                            Create new list
                        </Text>
                        <TouchableOpacity style={[styles.buttonPin, isPinned && { backgroundColor: colors.black }]} onPress={() => setIsPinned(!isPinned)}>
                            <FontAwesome6 name="map-pin" size={13} color={isPinned ? 'white' : 'black'} />
                            <Text style={{ fontSize: 17, textAlign: "center", fontWeight: "bold", color: isPinned ? colors.white : colors.black }}>{isPinned ? 'Pinned' : 'Pin'}</Text>
                        </TouchableOpacity >
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="New List Title"
                            value={title}
                            onChangeText={setTitle}
                            maxLength={30}
                            multiline
                        />
                        {titleError && <Text style={{ color: 'red' }}>{titleError}</Text>}
                    </View>

                    <View>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                const isCategorySelected = item.id === categoryId;
                                return (
                                    <TouchableOpacity
                                        style={[styles.categoryButton, isCategorySelected && { backgroundColor: colors.black }]}
                                        onPress={() => setCategoryId(item.id)}
                                    >
                                        <Text style={{ fontSize: 16, color: colors.white, fontWeight: 'bold' }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                        {categoryError && <Text style={{ color: 'red' }}>{categoryError}</Text>}
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                            <Text style={{ color: colors.white, fontSize: 16, fontWeight: "bold" }}>
                                Save
                            </Text>
                        </Button>
                        <Button mode="outlined" onPress={handleClose} style={styles.cancelButton}>
                            <Text style={{ color: colors.black, fontSize: 16, fontWeight: "bold" }}>
                                Cancel
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    buttonPin: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        gap: 5,
        borderRadius: 8,
    },
    submitButton: {
        borderWidth: 1.5,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: colors.black,
    },
    cancelButton: {
        borderWidth: 1.5,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: colors.black,
    },
    categoryButton: {
        backgroundColor: colors.grey,
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        margin: 5,
    },
});