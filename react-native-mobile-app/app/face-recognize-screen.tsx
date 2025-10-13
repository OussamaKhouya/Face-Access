import { Stack } from "expo-router";
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
// import { Camera, useCameraDevice } from "react-native-vision-camera";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const VerificationScreen = () => {
    const [hasPermission, requestPermission] = useCameraPermissions();
  /*  const device = useCameraDevice('back', {
        physicalDevices: ['ultra-wide-angle-camera', 'wide-angle-camera', 'telephoto-camera']
    });*/
    const camera = useRef(null);

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);

    if (!hasPermission) {
        return <ActivityIndicator />;
    }

   /* if (!device) {
        return <Text>Camera Device Not Found</Text>;
    }*/

    return (
        <View style={styles.container}>
            <Stack.Screen name="Verification" options={{ headerShown: false }} />



            {/* Camera Preview */}
          {/*  <Camera
                ref={camera}
                style={styles.camera}
                device={device}
                isActive={true}
                photo={true}
            />*/}

            {/* Verification Overlay */}
            <View style={styles.overlay}>
                <View style={styles.avatarCircle}>
                    <MaterialCommunityIcons name="account" size={52} color="#b0b0b0" />
                </View>
                <View style={{ flex: 1, paddingLeft: 20, justifyContent: 'center' }}>
                    <Text style={styles.successText}>Successfully verified.</Text>
                    <Text style={styles.userId}>User ID : 1</Text>
                </View>
            </View>

            {/* (Optional) Take picture button if needed */}

             {/* <Pressable
                onPress={() => {}}
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  bottom: 50,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: 'white',
                }}
              />*/}

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        width: '100%', height: 60, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingHorizontal: 14,
        borderBottomWidth: 1, borderBottomColor: '#ececec', backgroundColor: '#fff', zIndex: 2
    },
    headerTime: { fontSize: 18, color: '#222' },
    camera: {
        position: 'absolute', left: 0, right: 0, top: 30, bottom: 0, zIndex: 1
    },
    overlay: {
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 200,
        backgroundColor: 'rgba(0,0,0,0.25)', flexDirection: 'row', alignItems: 'center', padding: 20, zIndex: 3
    },
    avatarCircle: {
        width: 90, height: 90, borderRadius: 45, borderWidth: 4, borderColor: '#7fe336',
        justifyContent: 'center', alignItems: 'center', backgroundColor: '#2221'
    },
    successText: {
        color: '#7fe336', fontSize: 22, fontWeight: 'bold', marginBottom: 2,
    },
    userId: { color: '#fff', fontSize: 16, marginTop: 6 },
});

export default VerificationScreen;
