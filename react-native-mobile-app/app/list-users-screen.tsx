import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Feather, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import Header from "@/components/Header";
import {API_URL} from "@/constants/Api";

interface User {
    userId: number;
    name: string;
    fingerprint: boolean;
    card: boolean;
    key: boolean;
    face: boolean;
}

const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(API_URL + "/users");
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const UserRow = ({user, onPress}: { user: User, onPress: any }) => (
    <Pressable onPress={() => onPress(user)} style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
        <View>
            <View style={styles.userRow}>
                <Text style={styles.userId}>{user.userId}</Text>
                <Text style={styles.userName}>{user.name}</Text>
            </View>
            <View style={styles.iconRow}>
                {user.fingerprint && <MaterialIcons name="fingerprint" size={18} color="#555" style={styles.icon}/>}
                {user.card && <MaterialIcons name="credit-card" size={18} color="#555" style={styles.icon}/>}
                {user.key && <Feather name="key" size={18} color="#555" style={styles.icon}/>}
                {user.face &&
                    <MaterialCommunityIcons name="face-recognition" size={18} color="#555" style={styles.icon}/>}
            </View>
            <View style={styles.divider}/>
        </View>
    </Pressable>);

export default function UserListScreen() {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    const handleUserPress = (user: User) => {
        Alert.alert('User Clicked', `You selected ${user.name}`);
        // Navigation logic or other action can go here
    };

    return (<View style={styles.container}>
            {/* Header */}
            <Header title="All Users"/>
            <FlatList
                data={users}
                renderItem={({item}) => <UserRow user={item} onPress={handleUserPress}/>}
                keyExtractor={item => `${item.userId}`}
                style={{flex: 1}}
            />
            {/* Search */}
            <View style={styles.searchBar}>
                <TextInput style={styles.searchInput} editable={false}/>
                <Feather name="search" size={22} color="#888" style={styles.searchIcon}/>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff'}, header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    }, headerTitle: {
        fontSize: 24, fontWeight: '500', color: '#111',
    }, userRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
    }, userId: {fontSize: 21, color: '#222'}, userName: {fontSize: 21, color: '#333'}, iconRow: {
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginVertical: 5, gap: 10
    }, icon: {marginRight: 8}, divider: {
        height: 1, backgroundColor: '#ececec', marginTop: 2, marginLeft: 0
    }, searchBar: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: 8,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#e3e4e7',
        flexDirection: 'row',
        alignItems: 'center',
    }, searchInput: {
        flex: 1, height: 36, paddingHorizontal: 12, fontSize: 18, backgroundColor: 'transparent', color: '#333'
    }, searchIcon: {
        position: 'absolute', right: 10, top: 7
    }
});
