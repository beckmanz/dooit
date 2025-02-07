import colors from '@/constants/colors'
import React from 'react'
import Svg, { Rect, Path } from 'react-native-svg';
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { router } from 'expo-router';

export default function index() {
    const handleNext = () => {
        router.replace('/preauth/page')
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ marginLeft: 5 }}>
                    <Svg width="72" height="56" viewBox="0 0 72 56" fill="none">
                        <Rect x="0.887" y="1.887" width="55" height="53.226" rx="8.575" fill="black" stroke="white" strokeWidth="1.774" />
                        <Path d="M28 14.4248L40.1622 28.3245L67.9616 4" stroke="white" strokeWidth="6.94984" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </View>
                <View style={styles.containerTexts}>
                    <Text style={{ color: colors.white, fontSize: 41 }}>Dooit</Text>
                    <Text style={{ color: colors.grey, fontSize: 21, textAlign: "center" }}>Write what you need to do. Everyday.</Text>
                </View>
            </View>
            <View style={styles.contentButton}>
                <Pressable style={styles.button} onPress={handleNext}>
                    <Text style={{ color: colors.black, fontSize: 20, textAlign: "center" }}>Continue</Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        marginTop: 100
    },
    containerTexts: {
        width: '55%',
        alignItems: "center",
        justifyContent: "center"
    },
    contentButton: {
        height: 150,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        width: 199,
        height: 53,
        justifyContent: "center",
        backgroundColor: colors.white,
        borderRadius: 25
    }
})