import {Stack, useLocalSearchParams, router} from "expo-router";
import React, {useRef, useState} from 'react';
import {Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {CameraType, CameraView, useCameraPermissions} from "expo-camera";
import {BACKEND_URL} from "@/constants/Api";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const FaceProfileScreen = () => {
    const params = useLocalSearchParams();
    const [uri, setUri] = useState<string | null>(null);
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);


    if (!permission) {
        // Camera permissions are still loading.
        return <View/>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (<View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission"/>
            </View>);
    }

    function toggleFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
       // const photo = await ref.current?.takePictureAsync();

        const photo = await ref.current?.takePictureAsync({
            quality: 1,
            base64: false,
        });
        if (!photo?.uri) {
            console.log("No Photo URI available");
            return;
        }

        setUri(photo.uri);
        console.log("Photo URI:", photo.uri);

        const formData = new FormData();
        // Append the photo file directly with uri, type, and name
        formData.append('file', {
            uri: photo.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        } as any);
        formData.append('user_id', String(params['uId'] || '1'));
        formData.append('profile_photo', String(true));

        console.log("Taking picture and uploading...");

        try {
            const response = await fetch(`${BACKEND_URL}/face/profile`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Upload failed:", errorText);
                return;
            }

            // Get response as Blob
            const blob = await response.blob();

            // Convert blob to local URI for Image display
            const reader = new FileReader();
            reader.onloadend = () => {
                setUri(reader.result as string);  // base64 URI string
            };
            reader.readAsDataURL(blob);

            console.log("Received cropped image and displayed.");
            router.back()
        } catch (err) {
            console.error("Upload photo error:", err);
        }
    };



    return (<View style={styles.container}>
            <Stack.Screen name="Photo Profile" options={{headerShown: false}}/>

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
        {uri && (
            <View style={styles.previewContainer}>

                <Image source={{ uri }} style={styles.previewImage} />

            </View>
        )}
        </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center',
    }, message: {
        textAlign: 'center', paddingBottom: 10,
    }, camera: {
        flex: 1,
    }, buttonContainer: {
        flex: 1, flexDirection: 'row', backgroundColor: 'transparent', margin: 64,
    }, button: {
        flex: 1, alignSelf: 'flex-end', alignItems: 'center',
    }, text: {
        fontSize: 24, fontWeight: 'bold', color: 'white',
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

export default FaceProfileScreen;