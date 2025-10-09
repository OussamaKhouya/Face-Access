import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import Header from "@/components/Header";
import {Picker} from '@react-native-picker/picker';
import {router} from "expo-router";
import {API_URL} from "@/constants/Api";

export default function EditUserFormScreen() {
    const [userId, setUserId] = useState('1');
    const [name, setName] = useState('XXX');
    const [role, setRole] = useState('Normal User');
    const [fingerprint, setFingerprint] = useState(false);
    const [face, setFace] = useState(false);
    const [card, setCard] = useState(false);
    const [password, setPassword] = useState('XXX');
    const [profilePhoto, setProfilePhoto] = useState(false);
    const [accessControlRole, setAccessControlRole] = useState('XX');

    const takeProfilePhoto = () => {
        if (!profilePhoto) router.push("face-profile-screen" as any);
    }

    const testApi = async () => {

        try {
            const response = await fetch(API_URL);
            const result = await response.json();
            console.log('API response:', result);
        } catch (error) {
            console.error('Error testing API:', error);
        }
    };

    const addUser2 = async () => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('role', role);
        formData.append('fingerprint', fingerprint ? 'true' : 'false');
        formData.append('face', face ? 'true' : 'false');
        formData.append('card', card ? 'true' : 'false');
        formData.append('password', password);
        formData.append('profilePhoto', profilePhoto ? 'true' : 'false');
        formData.append('accessControlRole', accessControlRole);


        try {

            const response = await fetch(API_URL + "/addUser", {
                method: 'POST',
                body: formData,
            });
            console.log(response);

            if (response.ok) {
                Alert.alert('Success', 'User added successfully');
                // Optionally navigate away or reset form
            } else {
                const errorData = await response.json();
                Alert.alert('Error1', errorData.message || 'Failed to add user');
            }
        } catch (error: any) {
            console.log(error);
            Alert.alert('Error2', error.message);
        }
    };

    const addUser = async () => {
        const userData = {
            userId, name, role, fingerprint, face, card, password, profilePhoto, accessControlRole
        };
        console.log(userData)

        try {
            const response = await fetch(API_URL + "/addUser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const responseData = await response.json();
            if (!response.ok) {
                console.log("Validation errors:", responseData);
                Alert.alert('Validation Error', JSON.stringify(responseData));
            } else {
                Alert.alert('Success', responseData.message);
                // Alert.alert('Success', 'User added successfully');
            }
        } catch (error: any) {
            Alert.alert('Error2', error.message);
        }
    };

    const addUser1 = async () => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('role', role);
        formData.append('fingerprint', fingerprint ? 'true' : 'false');
        formData.append('face', face ? 'true' : 'false');
        formData.append('card', card ? 'true' : 'false');
        formData.append('password', password);
        formData.append('profilePhoto', profilePhoto ? 'true' : 'false');
        formData.append('accessControlRole', accessControlRole);

        try {
            const response = await fetch(API_URL + "/addUser", {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Validation errors:", errorData);
                Alert.alert('Validation Error', JSON.stringify(errorData));
            } else {
                Alert.alert('Success', 'User added successfully');
            }
        } catch (error : any) {
            Alert.alert('Error', error.message);
        }
    };


    return (<View style={styles.container}>
            <Header title="New User"/>
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
                <Button title="Add User" onPress={addUser}/>
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
