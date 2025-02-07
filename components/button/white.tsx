import colors from '@/constants/colors'
import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'

interface Props {
    name: string
    onPress: () => void;
}
export function ButtonWhite({ name, onPress }: Props) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={{ color: colors.black, fontSize: 20, textAlign: "center", fontWeight: "bold" }}>{name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 353,
        height: 56,
        borderWidth: 1,
        justifyContent: "center",
        backgroundColor: colors.white,
        borderRadius: 25
    }
})