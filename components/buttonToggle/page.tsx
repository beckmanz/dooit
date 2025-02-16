import colors from "@/constants/colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function ToggleButton({ activeTab, onTabChange }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.toggleOption, activeTab === "All List" && styles.activeTab]}
                onPress={() => onTabChange("All List")}
            >
                <Text style={[styles.text, activeTab === "All List" && styles.activeText]}>
                    All List
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.toggleOption, activeTab === "Pinned" && styles.activeTab]}
                onPress={() => onTabChange("Pinned")}
            >
                <Text style={[styles.text, activeTab === "Pinned" && styles.activeText]}>
                    Pinned
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 47,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 2,
        overflow: "hidden",
    },
    toggleOption: {
        flex: 1,
        height: 47,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginHorizontal: 1,
    },
    activeTab: {
        backgroundColor: colors.black,
        flex: 1.3,
        borderRadius: 10,
        zIndex: 2,
    },
    text: {
        color: "#555",
        fontWeight: "bold",
        textAlign: "center",
    },
    activeText: {
        color: "white",
    },
});
