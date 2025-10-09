import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Input} from "postcss";

const KeypadScreen = () => {

    const [input, setInput] = useState('');
    const [currentTime] = useState('10:49');

    const handleNumberPress = (number: string) => {
        setInput(prev => prev + number);
    };

    const handleBackspace = () => {
        setInput(prev => prev.slice(0, -1));
    };

    const handleClear = () => {
        setInput('');
    };

    const handleOK = () => {
        console.log('OK pressed with input:', input);
        // Handle OK action here
    };

    const handleESC = () => {
        console.log('ESC pressed');
        // Handle escape/back action here
    };

    const handle123 = () => {
        console.log('123 pressed');
        // Handle 123 action here
    };

    const KeypadButton = ({ children, onPress, style, textStyle }: any) => (
        <TouchableOpacity
            style={[styles.keypadButton, style]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.keypadButtonText, textStyle]}>{children}</Text>
        </TouchableOpacity>
    );

    const IconButton = ({ iconName, onPress, style }: any) => (
        <TouchableOpacity
            style={[styles.keypadButton, styles.iconButton, style]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Ionicons name={iconName} size={24} color="#333" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />

            {/* Input Display */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    onChangeText={setInput}
                    value={input}
                    placeholder="Enter votre id"
                    keyboardType="numeric"
                />
            </View>

            {/* Keypad */}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#ffffff',
    },
    backButton: {
        padding: 4,
    },
    timeText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    spacer: {
        width: 32, // Same width as back button for centering
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        minHeight: 80,
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '400',
    },
    keypadContainer: {
        flex: 1,
        backgroundColor: '#d0d0d0',
        padding: 16,
        justifyContent: 'center',
    },
    keypadRow: {
        flexDirection: 'row',
        marginBottom: 12,
        justifyContent: 'space-between',
    },
    keypadButton: {
        flex: 1,
        height: 60,
        backgroundColor: '#ffffff',
        marginHorizontal: 4,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
    },
    keypadButtonText: {
        fontSize: 24,
        fontWeight: '400',
        color: '#333',
    },
    grayButton: {
        backgroundColor: '#a0a0a0',
    },
    grayButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    iconButton: {
        // Inherits from grayButton when applied together
    },
    okButton: {
        backgroundColor: '#7CB342',
    },
    okButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default KeypadScreen;