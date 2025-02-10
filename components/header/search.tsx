import colors from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export function SearchBar() {
    const [searchText, setSearchText] = useState('');

    return (
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
            <Pressable style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerInput: {
        height: 43,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        gap: 6
    },
    searchInput: {
        flex: 1,
        height: "100%",
        backgroundColor: colors.grey,
        fontSize: 16,
        color: '#333',
    },
    cancelButton: {
        backgroundColor: colors.black,
        alignItems: "center",
        justifyContent: "center"
    },
    cancelText: {
        fontSize: 21,
        color: colors.black,
    },
});