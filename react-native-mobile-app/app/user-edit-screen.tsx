import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';
import Header from "@/components/Header";
import { Picker } from '@react-native-picker/picker';

export default function EditUserFormScreen() {
    const [name, setName] = useState('Mick');
    const [role, setRole] = useState('Normal User');
    const [fingerprint, setFingerprint] = useState(true);
    const [face, setFace] = useState(true);
    const [card, setCard] = useState(true);
    const [password, setPassword] = useState('password123');
    const [profilePhoto, setProfilePhoto] = useState(true);
    const [accessControlRole, setAccessControlRole] = useState('');

    return (
        <View style={styles.container}>
            <Header title="Edit : 1" />
            {/* User ID */}
            <View style={styles.row}>
                <Text style={styles.cellLabel}>User ID</Text>
                <Text style={styles.cellValue}>1</Text>
            </View>
            <View style={styles.divider} />

            {/* Name */}
            <View style={styles.row}>
                <Text style={styles.cellLabel}>Name</Text>
                <TextInput
                    style={styles.inputValue}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                />
            </View>
            <View style={styles.divider} />

            {/* User Role */}
            <View style={styles.row}>
                <Text style={styles.cellLabel}>User Role</Text>
                <Picker
                    style={styles.pickerValue}
                    selectedValue={role}
                    onValueChange={setRole}
                >
                    <Picker.Item label="Normal User" value="Normal User" />
                    <Picker.Item label="Admin" value="Admin" />
                </Picker>
            </View>
            <View style={styles.divider} />

            {/* Fingerprint */}
            <View style={styles.row}>
                <Text style={styles.cellLabel}>Fingerprint</Text>
                <Switch
                    value={fingerprint}
                    onValueChange={setFingerprint}
                />
            </View>
            <View style={styles.divider} />

            {/* Face */}
            <View style={styles.row}>
                <Text style={styles.cellLabel}>Face</Text>
                <Switch
                    value={face}
                    onValueChange={setFace}
                />
            </View>
            <View style={styles.divider} />

            {/* Card */}
            <View style={styles.row}>
                <Text style={styles.cellLabel}>Card</Text>
                <Switch
                    value={card}
                    onValueChange={setCard}
                />
            </View>
            <View style={styles.divider} />

            {/* Password */}
            <View style={styles.row}>
                <Text style={styles.cellLabel}>Password</Text>
                <TextInput
                    style={styles.inputValue}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Enter password"
                />
            </View>
            <View style={styles.divider} />

            {/* Profile Photo */}
            <View style={styles.row}>
                <Text style={styles.cellLabel}>Profile Photo</Text>
                <Switch
                    value={profilePhoto}
                    onValueChange={setProfilePhoto}
                />
            </View>
            <View style={styles.divider} />

            {/* Access Control Role */}
            <View style={styles.row}>
                <Text style={styles.cellLabel}>Access Control Role</Text>
                <TextInput
                    style={styles.inputValue}
                    value={accessControlRole}
                    onChangeText={setAccessControlRole}
                    placeholder="Role"
                />
            </View>
            <View style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 14
    },
    cellLabel: {
        fontSize: 21,
        color: '#333',
        width: '50%'
    },
    cellValue: {
        fontSize: 21,
        color: '#333',
        textAlign: 'right',
        width: '50%'
    },
    inputValue: {
        fontSize: 21,
        color: '#333',
        textAlign: 'right',
        padding: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        minWidth: 120
    },
    pickerValue: {
        width: 160,
        fontSize: 21,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#ececec'
    }
});
