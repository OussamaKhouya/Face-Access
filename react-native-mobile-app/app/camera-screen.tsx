import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, {useRef, useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [uri, setUri] = useState<string | null>(null);
    const ref = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    async function toggleCameraFacing() {
        const photo = await ref.current?.takePictureAsync();

        if (!photo?.uri) {
            console.log("No Photo URI available");
            return;
        }

        setUri(photo.uri);
        console.log("Photo URI:", photo.uri);
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={ref}
                style={styles.camera}
                facing={facing}

            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
            </View>
            {uri && (
                <View style={styles.previewContainer}>
                    <Image source={{ uri }} style={styles.previewImage} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 64,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 64,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    previewContainer: {
        position: "absolute",
        bottom: 140,
        right: 20,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 8,
        overflow: "hidden",
        width: 100,
        height: 150,
    },
    previewImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});
