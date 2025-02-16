import colors from '@/constants/colors'
import { FontAwesome6 } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { NewListModal } from '../modal/newList'

export function PinnedNone() {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/pinnednone.png')} style={{ height: 202, width: 384 }} />
            <Text style={{ fontSize: 23, color: colors.black, fontWeight: "bold" }}>Ooops! No pinned list yet...</Text>
            <TouchableOpacity style={styles.buttonNewList} onPress={() => setModalVisible(true)}>
                <FontAwesome6 name="add" size={24} color={colors.white} />
                <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.white }}>
                    New List
                </Text>
            </TouchableOpacity>
            <NewListModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 65
    },
    buttonNewList: {
        backgroundColor: colors.black,
        padding: 10,
        flexDirection: "row",
        gap: 8,
        borderRadius: 10
    }
})