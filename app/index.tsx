import colors from "@/constants/colors"
import { View, StyleSheet, ActivityIndicator } from 'react-native'

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={60} color={colors.black} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})