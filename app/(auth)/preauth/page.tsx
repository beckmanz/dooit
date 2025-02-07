import colors from '@/constants/colors'
import { router } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export default function PreAuth() {
    const handleSignin = () => {
        router.replace('/signin/page')
    }
    const handleSignup = () => {
        router.replace('/signup/page')
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Svg width="316" height="274" viewBox="0 0 316 274" fill="none">
                    <Path d="M196.797 69.0142C198.253 63.579 205.965 63.579 207.422 69.0142L208.172 71.8126C218.965 112.089 250.46 143.526 290.756 154.244L293.683 155.022C299.131 156.471 299.131 164.203 293.683 165.652L290.756 166.431C250.46 177.149 218.965 208.586 208.172 248.862L207.422 251.66C205.965 257.095 198.253 257.095 196.797 251.66L196.047 248.862C185.254 208.586 153.759 177.149 113.463 166.431L110.536 165.652C105.088 164.203 105.088 156.471 110.536 155.022L113.463 154.244C153.759 143.526 185.254 112.089 196.047 71.8126L196.797 69.0142Z" fill="#F1F3F4" stroke="black" />
                    <Path d="M128.865 21.7566C130.321 16.3215 138.033 16.3214 139.49 21.7566L140.15 24.2223C150.943 64.4984 182.439 95.9351 222.735 106.653L225.328 107.343C230.776 108.792 230.777 116.524 225.328 117.973L222.735 118.663C182.439 129.381 150.943 160.818 140.15 201.094L139.49 203.559C138.033 208.995 130.321 208.995 128.865 203.559L128.204 201.094C117.411 160.818 85.9155 129.381 45.6194 118.663L43.026 117.973C37.5777 116.524 37.5777 108.792 43.026 107.343L45.6194 106.653C85.9155 95.9351 117.411 64.4984 128.204 24.2224L128.865 21.7566Z" stroke="black" />
                    <Path d="M222.265 18.2087C222.433 16.5698 224.824 16.5698 224.992 18.2087C225.783 25.9325 231.9 32.0471 239.627 32.8197C241.265 32.9835 241.265 35.3708 239.627 35.5346C231.9 36.3072 225.783 42.4218 224.992 50.1456C224.824 51.7845 222.433 51.7844 222.265 50.1456C221.473 42.4218 215.356 36.3072 207.629 35.5346C205.991 35.3708 205.991 32.9835 207.629 32.8197C215.356 32.0471 221.473 25.9325 222.265 18.2087Z" fill="#F1F3F4" stroke="black" />
                    <Path d="M20.4627 67.5467C20.5413 66.786 21.6527 66.786 21.7313 67.5467C22.2249 72.3258 26.0138 76.1123 30.7965 76.5868C31.5552 76.6621 31.5552 77.768 30.7965 77.8433C26.0138 78.3177 22.2249 82.1043 21.7313 86.8834C21.6527 87.644 20.5413 87.644 20.4627 86.8834C19.9691 82.1043 16.1802 78.3177 11.3975 77.8433C10.6388 77.768 10.6388 76.6621 11.3975 76.5868C16.1802 76.1123 19.9691 72.3258 20.4627 67.5467Z" fill="#F1F3F4" stroke="black" />
                </Svg>
                <View style={styles.containerTexts}>
                    <Text style={{ color: colors.black, fontSize: 31, fontWeight: "bold" }}>Explore the app</Text>
                    <Text style={{ color: colors.black, opacity: 0.7, fontSize: 21, textAlign: "center" }}>Now your tasks are in one place and always under control</Text>
                </View>

            </View>
            <View style={styles.contentButtons}>
                <Pressable style={styles.buttonSignin} onPress={handleSignin}>
                    <Text style={{ color: colors.white, fontSize: 20, textAlign: "center", fontWeight: "bold" }}>Sign In</Text>
                </Pressable>
                <Pressable style={styles.buttonSignup} onPress={handleSignup}>
                    <Text style={{ color: colors.black, fontSize: 20, textAlign: "center", fontWeight: "bold" }}>Create Account</Text>
                </Pressable>
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
    },
    buttonSignin: {
        width: 353,
        height: 56,
        justifyContent: "center",
        backgroundColor: colors.black,
        borderRadius: 25
    },
    buttonSignup: {
        width: 353,
        height: 56,
        borderWidth: 1,
        justifyContent: "center",
        backgroundColor: colors.white,
        borderRadius: 25
    }
})