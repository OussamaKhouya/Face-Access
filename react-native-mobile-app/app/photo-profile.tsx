import {Stack} from "expo-router";
import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from "react-native";
import {useCameraPermissions} from "expo-camera";
import {Camera, useCameraDevice} from "react-native-vision-camera";

const PhotoProfile = () => {

    const [hasPermission, requestPermission] = useCameraPermissions();
    const device = useCameraDevice('back', {physicalDevices: ['ultra-wide-angle-camera', 'wide-angle-camera', 'telephoto-camera']});
    const camera = useRef<Camera>(null)
    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);

    if (!hasPermission) {
        return <ActivityIndicator/>;
    }

    if (!device) {
        return <Text>Camera Device Not Found</Text>
    }

    const takePicture = async () => {
        const photo = await camera.current?.takePhoto()
        console.log(photo)
    }

    return (
        <View style={styles.container}>
            <Stack.Screen name="Photo Profile" options={{headerShown: false}}/>

            <Camera
                ref={camera}
                style={styles.camera}
                device={device}
                isActive={true}
                photo={true}
            />

            <Pressable
                onPress={takePicture}
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 50,
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: 'white',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});

export default PhotoProfile;