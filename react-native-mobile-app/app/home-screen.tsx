import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {router} from "expo-router"; // Using Expo vector icons

const { width, height } = Dimensions.get('window');

const WelcomeLockScreen = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleAccess = () => {
        router.push('/access-screen');
    }

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        return {
            dateString: `${year}-${month}-${day}`,
            dayName: dayName
        };
    };

    const handleOKPress = () => {
        // Handle OK button press - navigate to admin creation or next screen
        console.log('OK button pressed');
    };

    const handlePhonePress = () => {
        // Handle phone icon press
        console.log('Phone icon pressed');
    };

    const { dateString, dayName } = formatDate(currentTime);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="#f0f0f0"
                barStyle="dark-content"
                translucent={false}
            />

            {/* Main Content */}
            <View style={styles.mainContent}>
                {/* Background Pattern */}
                <View style={styles.backgroundPattern}>
                    {[...Array(20)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                {
                                    left: Math.random() * width,
                                    top: Math.random() * height * 0.6,
                                    opacity: Math.random() * 0.3 + 0.1
                                }
                            ]}
                        />
                    ))}
                </View>

                {/* Time Display */}
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                </View>

                {/* Date Display */}
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{dateString}    {dayName}</Text>
                </View>

                {/* Welcome Text */}
                <Text style={styles.welcomeText}>Welcome</Text>

                {/* Phone Icon */}
                <TouchableOpacity style={styles.phoneButton} onPress={handlePhonePress}>
                    <Ionicons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => console.log('Keyboard pressed')}>
                    <Ionicons name="keypad" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={handleAccess}>
                    <Ionicons name="menu" size={24} color="#666" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 20,
    },
    backgroundPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    dot: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#999',
    },
    timeContainer: {
        marginBottom: 20,
    },
    timeText: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        letterSpacing: 2,
    },
    dateContainer: {
        marginBottom: 30,
    },
    dateText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        fontWeight: '400',
    },
    welcomeText: {
        fontSize: 28,
        color: '#333',
        textAlign: 'center',
        marginBottom: 60,
        fontWeight: '400',
    },
    phoneButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#7CB342',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 60,
        paddingBottom: 40,
        alignItems: 'center',
    },
    bottomButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
});

export default WelcomeLockScreen;