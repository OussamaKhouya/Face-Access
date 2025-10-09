import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from "../components/Header";
import {RelativePathString, router} from "expo-router";

export default function UserManagementScreen() {
    const insets = useSafeAreaInsets();

    const menuItems = [
        { title: 'New User', icon: 'person-add', color: '#64B5F6', route: 'new-user-screen' },
        { title: 'All Users', icon: 'list', color: '#FFB74D', route: 'list-users-screen' },
        { title: 'Display Style', icon: 'color-palette', color: '#81C784', route: 'user-style-screen' },
    ];


    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Header title="User Mgt." />

            {menuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem} onPress={() => router.push(item.route as RelativePathString)}>
                    <Ionicons
                        name={item.icon as any}
                        size={22}
                        color="#fff"
                        style={[styles.icon, { backgroundColor: item.color }]}
                    />
                    <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    icon: {
        padding: 8,
        borderRadius: 6,
        marginRight: 14,
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
});