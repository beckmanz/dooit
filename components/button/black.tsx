import colors from '@/constants/colors'
import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'

interface Props {
    name: string
    onPress: () => void;
}
export function ButtonBlack({ name, onPress }: Props) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={{ color: colors.white, fontSize: 20, textAlign: "center", fontWeight: "bold" }}>{name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 353,
        height: 56,
        justifyContent: "center",
        backgroundColor: colors.black,
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 20
    },
})