import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import Header from "@/components/Header";
import {BACKEND_URL} from "@/constants/Api";
import {useLocalSearchParams} from "expo-router";

const deleteActions = [
    { label: "Delete User" },
    { label: "Delete Face Only" },
    { label: "Delete Profile Photo Only" },
    { label: "Delete Fingerprint Only" },
    { label: "Delete Password Only" },
    { label: "Delete Card Number Only" },
];

export default function DeleteUserScreen({ route }: { route?: any }) {
    const params = useLocalSearchParams();
    const uId = Number(params['uId']);

    const handleDelete = (action: { label: any; }) => {
        Alert.alert(
            "Confirm Deletion",
            `Are you sure you want to ${action.label}?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive",  onPress: () => deleteUser(uId), }
            ]
        );
    };

    const deleteUser = async (userId: number) => {
        try {
            const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
                method: "DELETE",
            });

            // 204 No Content means deletion succeeded and no body is returned
            if (res.status === 204) {
                // Update UI (remove the user locally)
                // setUsers(prev => prev.filter(u => u.userId !== userId));
                Alert.alert("Deleted", `User ${userId} was deleted.`);
                return;
            }

            // Read error payload if provided, otherwise show status
            let detail = `HTTP ${res.status}`;
            try {
                const data = await res.json();
                if (data?.detail) detail = data.detail;
            } catch {
                // no JSON body
            }
            Alert.alert("Delete failed", detail);
        } catch (err) {
            Alert.alert("Network error", String(err));
        }
    };

    return (
        <View style={styles.container}>
            <Header title={`Delete : ${uId}`} />
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
