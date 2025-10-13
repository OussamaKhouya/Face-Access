import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import Header from "@/components/Header";
import {Picker} from '@react-native-picker/picker';
import {router, useLocalSearchParams} from "expo-router";
import {BACKEND_URL} from "@/constants/Api";

export default function EditUserFormScreen() {
    const params = useLocalSearchParams();

    const [userId, setUserId] = useState(String(params['uId']) || '0');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Normal User');
    const [fingerprint, setFingerprint] = useState(false);
    const [face, setFace] = useState(false);
    const [card, setCard] = useState(false);
    const [password, setPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(false);
    const [accessControlRole, setAccessControlRole] = useState('');

    useEffect(() => {
        // Fetch user data for editing
        const fetchUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/users/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch user");
                const data = await response.json();
                setName(data.name || '');
                setRole(data.role || 'Normal User');
                setFingerprint(data.fingerprint || false);
                setFace(data.face || false);
                setCard(data.card || false);
                setPassword(data.password || '');
                setProfilePhoto(data.profilePhoto || false);
                setAccessControlRole(data.accessControlRole || '');
            } catch (error: any) {
                Alert.alert('Error', error.message);
            }
        };
        fetchUser();
    }, [userId]);

    const takeProfilePhoto = () => {
        if (!profilePhoto) {
            router.push({
                pathname: "/face-profile-screen", params: {uId: String(params['uId'])},
            });
        }
    }
    const enrollPhoto = () => {
        if (!face) {
            router.push({
                pathname: "/face-enroll-screen", params: {uId: String(params['uId'])},
            });
        }
    }


    const updateUser = async () => {
        const userData = {
            name, role, fingerprint, face, card, password, profilePhoto, accessControlRole
        };
        try {
            const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
                method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(userData),
            });
            const responseData = await response.json();
            if (!response.ok) {
                Alert.alert('Validation Error', JSON.stringify(responseData));
            } else {
                Alert.alert('Success', responseData.message || 'User updated successfully');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };


    return (<View style={styles.container}>
        <Header title={`Edit: ${userId}`}/>
        {/* User ID */}
        <View style={styles.row}>
            <Text style={styles.cellLabel}>User ID</Text>
            <TextInput
                style={styles.inputValue}
                value={userId}
                onChangeText={setUserId}
            />
        </View>
        <View style={styles.divider}/>

        {/* Name */}
        <View style={styles.row}>
            <Text style={styles.cellLabel}>Name</Text>
            <TextInput
                style={styles.inputValue}
                value={name}
                onChangeText={setName}
            />
        </View>
        <View style={styles.divider}/>

        {/* User Role */}
        <View style={styles.row}>
            <Text style={styles.cellLabel}>User Role</Text>
            <Picker
                style={styles.pickerValue}
                selectedValue={role}
                onValueChange={setRole}
            >
                <Picker.Item label="Normal User" value="Normal User"/>
                <Picker.Item label="Admin" value="Admin"/>
            </Picker>
        </View>
        <View style={styles.divider}/>

        {/* Fingerprint */}
        <View style={styles.row}>
            <Text style={styles.cellLabel}>Fingerprint</Text>
            <Switch
                value={fingerprint}
                onValueChange={setFingerprint}
            />
        </View>
        <View style={styles.divider}/>

        {/* Face */}
        <View style={styles.row}>
            <Text style={styles.cellLabel}>Face</Text>
            <Switch
                value={face}
                onValueChange={setFace}
                onChange={enrollPhoto}
            />
        </View>
        <View style={styles.divider}/>

        {/* Card */}
        <View style={styles.row}>
            <Text style={styles.cellLabel}>Card</Text>
            <Switch
                value={card}
                onValueChange={setCard}
            />
        </View>
        <View style={styles.divider}/>

        {/* Password */}
        <View style={styles.row}>
            <Text style={styles.cellLabel}>Password</Text>
            <TextInput
                style={styles.inputValue}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
        </View>
        <View style={styles.divider}/>

        {/* Profile Photo */}
        <View style={styles.row}>
            <Text style={styles.cellLabel}>Profile Photo</Text>
            <Switch
                value={profilePhoto}
                onValueChange={setProfilePhoto}
                onChange={takeProfilePhoto}
            />
        </View>
        <View style={styles.divider}/>

        {/* Access Control Role */}
        <View style={styles.row}>
            <Text style={styles.cellLabel}>Access Control Role</Text>
            <TextInput
                style={styles.inputValue}
                value={accessControlRole}
                onChangeText={setAccessControlRole}
            />
        </View>
        <View style={styles.divider}/>

        {/* Add User Button */}
        <View style={{margin: 20}}>
            <Button title="Add User" onPress={updateUser}/>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff'}, row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 14
    }, cellLabel: {
        fontSize: 18, color: '#333', width: '50%'
    }, cellValue: {
        fontSize: 21, color: '#333', textAlign: 'right', width: '50%'
    }, inputValue: {
        fontSize: 21, color: '#333', textAlign: 'right', padding: 4, borderBottomWidth: 0.5, borderBottomColor: '#ddd',
    }, pickerValue: {
        width: 155, padding: 0, fontSize: 21, color: '#333', margin: 0,
    }, divider: {
        height: 1, backgroundColor: '#ececec'
    }
});
