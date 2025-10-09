import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons , FontAwesome5 , MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "@/components/Header";
import {RelativePathString, router} from 'expo-router';




interface MenuItem {
    title: string;
    icon: string;
    color: string;
    family: string;
    route: string;
}
const menuItems = [
    { title: 'User Mgt.', icon: 'person', family: 'Ionicons', color: '#4FC3F7', route: 'user-management-screen' },
    { title: 'User Role', icon: 'shield-checkmark', family: 'Ionicons', color: '#7986CB', route: 'UserRole' },
    { title: 'COMM.', icon: 'wifi', family: 'Ionicons', color: '#F06292', route: 'Comm' },
    { title: 'System', icon: 'settings', family: 'Ionicons', color: '#81C784', route: 'System' },
    { title: 'Personalize', icon: 'color-palette', family: 'Ionicons', color: '#F48FB1', route: 'Personalize' },
    { title: 'Data Mgt.', icon: 'database', family: 'MaterialCommunityIcons', color: '#4DD0E1', route: 'DataManagement' },
    { title: 'Intercom', icon: 'call', family: 'Ionicons', color: '#AED581', route: 'Intercom' },
    { title: 'Access Control', icon: 'door-open', family: 'FontAwesome5', color: '#FF8A65', route: 'AccessControl' },
    { title: 'USB Manager', icon: 'usb', family: 'FontAwesome5', color: '#64B5F6', route: 'UsbManager' },
    { title: 'Attendance Search', icon: 'search', family: 'Ionicons', color: '#FFB74D', route: 'AttendanceSearch' },
    { title: 'Autotest', icon: 'code-slash', family: 'Ionicons', color: '#7986CB', route: 'Autotest' },
    { title: 'System Info', icon: 'desktop-mac', family: 'MaterialCommunityIcons', color: '#4DD0E1', route: 'SystemInfo' },
];


export default function MainMenu() {

    const handleRoute = (route: string) => {
        router.push(route as RelativePathString); // or router.replace(), router.back(), etc.
    };

    const renderItem = ({ item }: {item: MenuItem}) => (
        <TouchableOpacity style={styles.card} onPress={() => handleRoute(item.route)}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                {(item.family === 'Ionicons') ?  <Ionicons name={item.icon as any} size={28} color="#fff" />:null}
                { (item.family === 'FontAwesome5') ? <FontAwesome5 name={item.icon as any} size={28} color="#fff" />:null}
                { (item.family === 'MaterialCommunityIcons') ? <MaterialCommunityIcons name={item.icon as any} size={28} color="#fff" />:null}
            </View>
            <Text style={styles.label}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="Main Menu" />
            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
                numColumns={4}
                contentContainerStyle={styles.grid}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 20,
    },
    grid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        alignItems: 'center',
        margin: 12,
        width: 70,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    label: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333',
    },
});
