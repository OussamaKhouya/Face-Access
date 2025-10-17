import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View , ImageBackground} from 'react-native';
import * as FileSystem from 'expo-file-system';
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
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }
    async function takePhoto2() {
        const photo = await ref.current?.takePictureAsync();

        if (!photo?.uri) return;

        const newPath = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;
        await FileSystem.moveAsync({
            from: photo.uri,
            to: newPath,
        });

        setUri(newPath);
        console.log("Saved photo at:", newPath);
    }
    async function takePhoto1() {
        const photo = await ref.current?.takePictureAsync({
            base64: true,     // 👈 capture as base64
            quality: 1,     // optional compression
            skipProcessing: true,
        });

        if (!photo?.base64) {
            console.log("No base64 data available");
            return;
        }

        // Create data URI for preview or upload
        const base64Image = `data:image/jpeg;base64,${photo.base64}`;

        setUri(base64Image);

        console.log("Captured photo (base64 length):", photo.base64.length);
    }

    async function takePhoto() {
        const photo = await ref.current?.takePictureAsync({
            base64: true,
            quality: 0.8,
            skipProcessing: true,
        });

        if (!photo?.base64) return;

        const filePath = `${FileSystem.cacheDirectory}temp.jpg`;
        await FileSystem.writeAsStringAsync(filePath, photo.base64, {
            encoding: FileSystem.EncodingType.Base64,
        });

        setUri(filePath); // use file URI instead of base64
        console.log(
            "Photo saved to cache with base64 length:",
        )
        console.log(photo.base64.slice(0, 100));

    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={ref}
                style={styles.camera}
                facing={facing}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.text}>Take Photo</Text>
                </TouchableOpacity>
            </View>

            {uri && (
                <View style={styles.previewContainer}>
                    <ImageBackground source={{ uri }} style={styles.previewImage} />
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
        position: 'absolute',
        bottom: 140,
        right: 20,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        width: 100,
        height: 150,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: '#fff', // just for debugging
    },
});
