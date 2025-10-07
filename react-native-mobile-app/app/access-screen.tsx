import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

const BUTTONS = [
    { key: 'key', icon: <Feather name="key" size={36} color="#444" /> },
    { key: 'fingerprint', icon: <MaterialCommunityIcons name="fingerprint" size={36} color="#444" /> },
    { key: 'face', icon: <MaterialCommunityIcons name="face-recognition" size={36} color="#444" /> },
    { key: 'card', icon: <AntDesign name="idcard" size={36} color="#444" /> },
];

export default function AccessScreen() {
    const activeButton = 2; // 0-based index, 2 is the third button (face)

    return (
        <SafeAreaView style={styles.container}>


            {/* User ID */}
            <Text style={styles.userId}>User ID : 1</Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                {BUTTONS.map((btn, idx) => (
                    <TouchableOpacity
                        key={btn.key}
                        style={[
                            styles.button,
                            idx === activeButton && styles.activeButton,
                        ]}
                    >
                        {React.cloneElement(btn.icon, {
                            color: idx === activeButton ? '#2e6e1c' : '#444',
                        })}
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
    },
    headerTime: {
        fontSize: 18,
        color: '#222',
    },
    userId: {
        marginTop: 18,
        marginBottom: 32,
        fontSize: 18,
        color: '#666',
        alignSelf: 'flex-start',
        marginLeft: 16,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: 120,
        height: 60,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#c3e9aa',
    },
});
