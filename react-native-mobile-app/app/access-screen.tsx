import React from 'react';
import { SafeAreaView, StyleSheet, View, Pressable } from 'react-native';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import {router} from "expo-router";

const BUTTONS = [
    { key: 'face', icon: (color: string) => <MaterialCommunityIcons name="face-recognition" size={36} color={color} /> },
    { key: 'key', icon: (color: string) => <Feather name="key" size={36} color={color} /> },
    { key: 'fingerprint', icon: (color: string) => <MaterialCommunityIcons name="fingerprint" size={36} color={color} /> },
    { key: 'card', icon: (color: string) => <AntDesign name="idcard" size={36} color={color} /> },
];

// Optional: centralize handlers for each key
const handlers: Record<string, () => void> = {
    key: () => {
        // handle "key" button click
        console.log('Key pressed');
    },
    fingerprint: () => {
        // handle "fingerprint" button click
        console.log('Fingerprint pressed');
    },
    face: () => {
        // handle "face" button click
        router.push('/face-recognize-screen');
    },
    card: () => {
        // handle "card" button click
        console.log('Card pressed');
    },
};

export default function AccessScreen() {
    const onButtonPress = (key: string) => {
        handlers[key]?.();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                {BUTTONS.map((btn) => (
                    <Pressable
                        key={btn.key}
                        onPress={() => onButtonPress(btn.key)}
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.buttonPressed, // pressed-only visual
                        ]}
                    >
                        {({ pressed }) => btn.icon(pressed ? '#2e6e1c' : '#444')}
                    </Pressable>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
    buttonContainer: { flex: 1, justifyContent: 'center', width: '100%', alignItems: 'center' },
    button: {
        width: 120,
        height: 60,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Only applied while pressed
    buttonPressed: {
        backgroundColor: '#c3e9aa',
    },
});
