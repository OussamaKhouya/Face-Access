import {CameraType, CameraView, useCameraPermissions} from 'expo-camera';
import React, {useRef, useState} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function CameraApp({setUri}:{setUri:  React.Dispatch<React.SetStateAction<string | null>>}) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View/>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission"/>
            </View>
        );
    }

    function toggleFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        const photo = await ref.current?.takePictureAsync();
        if (photo?.uri) setUri(photo?.uri);
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={ref}
            />
            <View style={styles.shutterContainer}>
                <Pressable></Pressable>
                <Pressable onPress={takePicture}>
                    {({pressed}) => (<View
                        style={[styles.shutterBtn, {
                            opacity: pressed ? 0.5 : 1,
                        },]}
                    >
                        <View
                            style={[styles.shutterBtnInner, {
                                backgroundColor: "white",
                            },]}
                        />
                    </View>)}
                </Pressable>
                <Pressable onPress={toggleFacing}>
                    <FontAwesome6 name="rotate-left" size={32} color="white"/>
                </Pressable>
            </View>
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
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    }, shutterContainer: {
        position: "absolute",
        bottom: 44,
        left: 0,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    }, shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "white",
        width: 85,
        height: 85,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
    }, shutterBtnInner: {
        width: 70, height: 70, borderRadius: 50,
    },

});
