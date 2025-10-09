import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
interface HeaderProps {
    title: string;
    onBack?: () => void;
}

export default function Header({ title, onBack }: HeaderProps) {
    if(!onBack) {
        onBack = () => router.back()
    }
    return (
        <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={22} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={{ width: 22 }} />
            {/*TODO : to remove */}
            <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
                <Ionicons name="home" size={22} color="#000" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: .5,
        borderColor: "#ddd",
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 10,
        zIndex: 4,
        paddingTop: 20,
    },
    backButton: {
        width: 22,
    },
    title: {
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        flex: 1,
    },
});
