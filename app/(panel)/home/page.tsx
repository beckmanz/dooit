import React, { useState } from 'react'
import { Header } from '../../../components/header/home'
import { TaskList } from '../../../components/lists/page'
import { ToggleButton } from '../../../components/buttonToggle/page'
import { View, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'

export default function page() {
    const [activeTab, setActiveTab] = useState("All List");

    return (
        <View style={styles.container}>
            <View style={{ gap: 30 }}>
                <Header onPress={() => router.push('/(panel)/search/page')} />
                <ToggleButton activeTab={activeTab} onTabChange={setActiveTab} />
            </View>
            <View style={styles.content}>
                <TaskList activeTab={activeTab} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        gap: 15
    },
    content: {
        flex: 1
    }

})