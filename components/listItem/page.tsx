import moment from 'moment';
import colors from '@/constants/colors';
import { supabase } from '@/lib/supabase';
import { Checkbox } from 'react-native-paper';
import { useAuth } from '@/contexts/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { Tasks } from '../tasks/page';

interface Props {
    title: string;
    date: string;
    pinned: boolean;
    id: number;
    categoryName: number;
    categoryColor: string;
}
export function ListItem({ title, date, pinned, id, categoryName, categoryColor }: Props) {
    const formattedDate = moment(date).format('DD-MM-YYYY')

    return (
        <Pressable style={[styles.container, pinned && styles.pinnedContainer, { backgroundColor: categoryColor }]}>
            <Text style={styles.titleText}>{title}</Text>

            <Tasks list_id={id} />

            <View style={styles.footer}>
                <Text style={styles.textCategory}>{categoryName}</Text>
                <View style={{ flexDirection: "row", gap: 6 }}>
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
        gap: 15
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
    }
});