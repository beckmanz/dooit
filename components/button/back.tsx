import React from 'react'
import colors from '@/constants/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router';

export function Back() {
    return (
        <Pressable style={styles.button} onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={40} color="black" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
    },
})