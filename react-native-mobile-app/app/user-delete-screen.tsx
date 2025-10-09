import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import Header from "@/components/Header";

const deleteActions = [
    { label: "Delete User" },
    { label: "Delete Fingerprint Only" },
    { label: "Delete Face Only" },
    { label: "Delete Password Only" },
    { label: "Delete Card Number Only" },
    { label: "Delete Profile Photo Only" }
];

export default function DeleteUserScreen({ route }: { route?: any }) {
    const userId = route?.params?.userId || 1;

    const handleDelete = (action: { label: any; }) => {
        Alert.alert(
            "Confirm Deletion",
            `Are you sure you want to ${action.label}?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => {/* Actual deletion logic here */} }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header title={`Delete : ${userId}`} />
            {deleteActions.map((action, idx) => (
                <View key={idx}>
                    <Pressable
                        style={({ pressed }) => [styles.item, { backgroundColor: pressed ? "#f3f3f3" : "#fff" }]}
                        onPress={() => handleDelete(action)}
                    >
                        <Text style={styles.itemText}>{action.label}</Text>
                    </Pressable>
                    <View style={styles.divider} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    item: {
        paddingVertical: 18,
        paddingHorizontal: 18,
        backgroundColor: '#fff',
    },
    itemText: {
        fontSize: 21,
        color: '#222',
    },
    divider: {
        height: 1,
        backgroundColor: '#ececec',
    }
});
