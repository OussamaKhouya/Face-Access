import React, {useCallback, useEffect, useState} from 'react';
import {
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import Header from "@/components/Header";
import {Picker} from '@react-native-picker/picker';
import {BACKEND_URL} from "@/constants/Api";

export default function NewUserFormScreen() {

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Normal User');
    const [fingerprint, setFingerprint] = useState(false);
    const [face, setFace] = useState(false);
    const [card, setCard] = useState(false);
    const [password, setPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(false);
    const [accessControlRole, setAccessControlRole] = useState('');

    const fetchLatestUserId = useCallback(async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/users/latest-id`, {
                headers: {Accept: 'application/json'},
            });
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            const data = await res.json(); // expect { latestUserId: number }
            if (data?.latestUserId != null) {
                setUserId(String(parseInt(data.latestUserId) + 1 )); // update your state here
            } else {
                throw new Error('Malformed response');
            }
        } catch (e: any) {
            console.log(e.message ?? 'Request failed');
        }
    }, []);

    useEffect(() => {
        fetchLatestUserId(); // fetch on mount
    }, [fetchLatestUserId]);


    const addUser = async () => {
        const userData = {
            userId, name, role, fingerprint, face, card, password, profilePhoto, accessControlRole
        };
        console.log(userData)

        try {
            const response = await fetch(BACKEND_URL + "/addUser", {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(userData),
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


    return (<KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // adjust if you have a fixed header
    >
        <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{padding: 16, paddingBottom: 32}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
        >
            <View style={styles.container}>
                <Header title="New User"/>

                {/* User ID */}
                <View style={styles.row}>
                    <Text style={styles.cellLabel}>User ID</Text>
                    <TextInput
                        style={styles.inputValue}
                        value={userId}
                        onChangeText={setUserId}
                        returnKeyType="next"
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
                        returnKeyType="next"
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
                    <Switch value={fingerprint} onValueChange={setFingerprint}/>
                </View>
                <View style={styles.divider}/>

                {/* Face */}
                <View style={styles.row}>
                    <Text style={styles.cellLabel}>Face</Text>
                    <Switch value={face} onValueChange={setFace}/>
                </View>
                <View style={styles.divider}/>

                {/* Card */}
                <View style={styles.row}>
                    <Text style={styles.cellLabel}>Card</Text>
                    <Switch value={card} onValueChange={setCard}/>
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
                        returnKeyType="done"
                    />
                </View>
                <View style={styles.divider}/>

                {/* Profile Photo */}
                <View style={styles.row}>
                    <Text style={styles.cellLabel}>Profile Photo</Text>
                    <Switch
                        value={profilePhoto}
                        onValueChange={setProfilePhoto}
                        // onChange={takeProfilePhoto} // prefer onValueChange for Switch
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
            </View>
        </ScrollView>
    </KeyboardAvoidingView>);
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
