import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Header from "@/components/Header";
import {router, useLocalSearchParams} from "expo-router";

export default function UserActionsScreen({ route}: {route?: any}) {
    // Example: pass userId as route parameter or prop; fallback to 1 for demo
    const {uId} = useLocalSearchParams();

    const handleEdit = () => {

        router.push({
            pathname: '/user-edit-screen',
            params: { uId: uId },
        });
    };

    const handleDelete = () => {
        router.push({
            pathname: '/user-delete-screen',
            params: { uId: uId },
        });
    };

    return (
        <View style={styles.container}>
            <Header title={`User : ${uId}`} />

            <Pressable style={styles.item} onPress={handleEdit}>
                <Text style={styles.itemText}>Edit</Text>
            </Pressable>
            <View style={styles.divider} />

            <Pressable style={styles.item} onPress={handleDelete}>
                <Text style={styles.itemText}>Delete</Text>
            </Pressable>
            <View style={styles.divider} />
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
        fontSize: 22,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#d1d1d1',
    }
});
