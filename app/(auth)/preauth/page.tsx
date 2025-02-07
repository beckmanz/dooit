import colors from '@/constants/colors'
import { router } from 'expo-router'
import React from 'react'
import Star from '../../../components/star/page'
import { ButtonBlack } from '../../../components/button/black'
import { ButtonWhite } from '../../../components/button/white'
import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function PreAuth() {
    const handleSignin = () => {
        router.push('/signin/page')
    }
    const handleSignup = () => {
        router.push('/signup/page')
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Star />
                <View style={styles.containerTexts}>
                    <Text style={{ color: colors.black, fontSize: 31, fontWeight: "bold" }}>Explore the app</Text>
                    <Text style={{ color: colors.black, opacity: 0.7, fontSize: 21, textAlign: "center" }}>Now your tasks are in one place and always under control</Text>
                </View>

            </View>
            <View style={styles.contentButtons}>
                <ButtonBlack name='Sign In' onPress={handleSignin} />
                <ButtonWhite name='Create Account' onPress={handleSignup} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 50
    },
    containerTexts: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    contentButtons: {
        height: 200,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        paddingBottom: 130
    }
})