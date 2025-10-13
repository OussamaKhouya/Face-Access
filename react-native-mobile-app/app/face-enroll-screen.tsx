import React, {useRef, useState} from 'react';
import {Button, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {CameraType, CameraView, useCameraPermissions} from "expo-camera";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {router, useLocalSearchParams} from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {BACKEND_URL} from "@/constants/Api";

const EnrollFaceScreen = () => {
    const params = useLocalSearchParams();

    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>('front');
    const [uri, setUri] = useState<string | null>(null);

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

    const takePicture1 = async () => {
        // const photo = await ref.current?.takePictureAsync();

        const photo = await ref.current?.takePictureAsync({
            quality: 1, base64: false,
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
            uri: photo.uri, type: 'image/jpeg', name: 'photo.jpg',
        } as any);
        formData.append('user_id', String(params['uId'] || '1'));
        formData.append('profile_photo', String(true));

        console.log("Taking picture and uploading...");

        try {
            const response = await fetch(`${BACKEND_URL}/face/enroll`, {
                method: 'POST', body: formData,
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

    const takePicture = async () => {
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
        formData.append("file", {
            uri: photo.uri,
            type: "image/jpeg",
            name: "photo.jpg",
        } as any);
        formData.append("user_id", String(params["uId"] || "1"));
        // 'profile_photo' not needed for enroll endpoint, remove or adjust accordingly

        console.log("Taking picture and uploading...");

        try {
            const response = await fetch(`${BACKEND_URL}/face/enroll`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Upload failed:", errorText);
                return;
            }

            // Parse JSON response from FastAPI enroll endpoint
            const result = await response.json();
            console.log("Enroll result:", result);

            // Example: show clarity and message
            alert(`Enroll Status: ${result.enrolled ? "Success" : "Failed"}\nClarity: ${result.clarity.toFixed(2)}%\nMessage: ${result.message}`);

            // Optional: navigate back or update UI based on enrollment
            if (result.enrolled) {
                router.back();
            }

        } catch (err) {
            console.error("Upload photo error:", err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

        <CameraView
            style={styles.camera}
            facing={facing}
            ref={ref}
        />


        {/* Bottom overlay for info */}
        <View style={styles.infoBox}>

            <Text style={styles.imgQuality}>Image Quality: _</Text>
            <Text style={styles.imgQuality}>Note:</Text>
            <View style={{marginTop: 6}}>
                <View style={styles.notesRow}>
                    <MaterialCommunityIcons name="glasses" size={24} color="white" style={{marginRight: 8}}/>
                    <Text style={styles.infoText}>
                        Please remove any masks, sunglasses or facial obstructions
                    </Text>
                </View>
                <View style={styles.noteWarnRow}>
                    <MaterialCommunityIcons name="alert" size={24} color="#ECE700" style={{marginRight: 8}}/>
                    <Text style={styles.goodText}>
                        The template quality is good.
                    </Text>
                </View>
            </View>
            {/* Quality status bar */}
            <View style={styles.statusBarContainer}>
                <View style={styles.statusBar}/>
            </View>
            <View style={styles.shutterContainer}>
                {uri ? (<View style={styles.previewContainer}>

                        <Image source={{uri}} style={styles.previewImage}/>

                    </View>) : <Pressable></Pressable>}
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


    </SafeAreaView>);
};


const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center'
    },
    message: {
        textAlign: 'center', paddingBottom: 10,
    },
    camera: {
        flex: 1
    },
    headerText: {
        fontSize: 20, fontWeight: '600', color: '#222', textAlign: 'center', flex: 1, marginLeft: -24 // center align with icon present
    },
    cameraBox: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', marginBottom: 0,
    },
    faceFrame: {
        position: 'absolute',
        width: 230,
        height: 260,
        left: '50%',
        top: '50%',
        transform: [{translateX: -115}, {translateY: -130}],
    },
    shutterContainer: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
    shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "white",
        width: 70,
        height: 70,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    shutterBtnInner: {
        width: 55, height: 55, borderRadius: 50,
    },
    infoBox: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 10,
        zIndex: 3,
        display: "flex",

        justifyContent: "flex-start"
    },
    imgQuality: {
        color: "#fff", fontSize: 18, fontWeight: '400', marginBottom: 2
    },
    notesRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 6},
    infoText: {color: '#fff', fontSize: 18, fontWeight: '400', flex: 1},
    noteWarnRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 6, marginTop: 2},
    goodText: {color: '#ece700', fontWeight: '600', fontSize: 18},
    statusBarContainer: {width: '100%', height: 16, marginTop: 2, marginBottom: 10},
    statusBar: {
        width: '80%', height: 8, borderRadius: 3, backgroundColor: '#bcbccc', // gray bg
        overflow: 'hidden', alignSelf: 'flex-start', // Good quality bar color fill
        borderWidth: 1, borderColor: '#ccc'
    },
    previewContainer: {
        borderWidth: 2, borderColor: "white", borderRadius: 8, overflow: "hidden", width: 70, height: 100,
    },
    previewImage: {
        width: "100%", height: "100%", resizeMode: "cover",
    },
});

export default EnrollFaceScreen;
