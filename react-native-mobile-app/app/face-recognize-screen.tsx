import React, {useRef, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {CameraType, CameraView} from "expo-camera";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {BACKEND_URL} from "@/constants/Api";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {router} from "expo-router";

const RecognizeFaceScreen = () => {
    const ref = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>('front');
    const [uri, setUri] = useState<string | null>(null);
    const [similarity, setSimilarity] = useState<string | null>("_");
    const [recognized, setRecognized] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [verifying, setVerifying] = useState<boolean|null>(null); // NEW

    function toggleFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        setRecognized(false);
        const photo = await ref.current?.takePictureAsync({ quality: 1, base64: false });
        if (!photo?.uri) {
            console.log("No Photo URI available");
            return;
        }

        setUri(photo.uri);

        const formData = new FormData();
        formData.append("file", { uri: photo.uri, type: "image/jpeg", name: "photo.jpg" } as any);

        console.log("Taking picture and uploading...");
        setVerifying(true); // start verifying

        try {
            const response = await fetch(`${BACKEND_URL}/face/recognize`, { method: "POST", body: formData });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Upload failed:", errorText);
                setRecognized(false);
                return;
            }

            const result = await response.json();
            console.log("Recognize result:", result);

            if (result.recognized) {
                alert(`Recognize Status: ${result.recognized ? "similarity" : "Failed"}\nSimilarity: ${result.similarity}%\nUserID: ${result.userId}\nUser Name: ${result.name}`);
                setUserName(result.name);
                setUserId(result.userId);
                setRecognized(true);
                setSimilarity(result.similarity + "%");
            } else {
                alert(`Enroll Failed:\nScore: ${result.similarity}%\nMessage: ${result.message}`);
                setRecognized(false);
            }

            if (result.enrolled) {
                // router.back();
            }
        } catch (err) {
            console.error("Upload photo error:", err);
        } finally {
            setVerifying(false); // always stop verifying
        }
    };

    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <CameraView style={styles.camera} facing={facing} ref={ref} />

            {/* Bottom overlay for info */}
            <View style={[styles.infoBox, { paddingBottom: Math.max(insets.bottom, 12) }]}>
                <View style={styles.overlay}>
                    <View style={styles.avatarCircle}>
                        <MaterialCommunityIcons name="account" size={52} color="#b0b0b0" />
                    </View>

                    <View style={{ flex: 1, paddingLeft: 20, justifyContent: 'center' }}>
                        {verifying == null ? (
                            <Text style={styles.infoText}>Press button to verify face.</Text>
                        ) : verifying  ? (
                            <Text style={styles.goodText}>Verifing...</Text>
                        ) : recognized ? (
                            <>
                                <Text style={styles.successText}>Successfully verified.</Text>
                                <Text style={styles.userId}>User ID : {userId}</Text>
                                <Text style={styles.userId}>User Name : {userName}</Text>
                            </>
                        ) : (
                            <Text style={styles.failedText}>Failed to Verify.</Text>
                        )}
                    </View>
                </View>

                <View style={styles.shutterContainer}>
                    {uri ? (
                        <View style={styles.previewContainer}>
                            <Image source={{ uri }} style={styles.previewImage} />
                        </View>
                    ) : (
                        <Pressable />
                    )}

                    <Pressable onPress={takePicture} disabled={verifying}>
                        {({ pressed }) => (
                            <View
                                style={[
                                    styles.shutterBtn,
                                    { opacity: verifying ? 0.5 : pressed ? 0.5 : 1 },
                                ]}
                            >
                                <View style={[styles.shutterBtnInner, { backgroundColor: "white" }]} />
                            </View>
                        )}
                    </Pressable>
                    {recognized ? (
                        <Pressable onPress={() => router.push("/menu-screen")} disabled={verifying}>
                            <FontAwesome6 name="right-to-bracket" size={32} color="#7fe336" />
                        </Pressable>
                    ) : (
                        <Pressable onPress={toggleFacing} disabled={verifying}>
                            <FontAwesome6
                                name="rotate-left"
                                size={32}
                                color={verifying ? "#bbb" : "white"}
                            />
                        </Pressable>
                    )

                    }

                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    message: { textAlign: 'center', paddingBottom: 10 },
    camera: { flex: 1 },
    headerText: { fontSize: 20, fontWeight: '600', color: '#222', textAlign: 'center', flex: 1, marginLeft: -24 },
    cameraBox: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', marginBottom: 0 },
    faceFrame: { position: 'absolute', width: 230, height: 260, left: '50%', top: '50%', transform: [{ translateX: -115 }, { translateY: -130 }] },
    shutterContainer: { width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 30 },
    shutterBtn: { backgroundColor: "transparent", borderWidth: 5, borderColor: "white", width: 70, height: 70, borderRadius: 45, alignItems: "center", justifyContent: "center" },
    shutterBtnInner: { width: 55, height: 55, borderRadius: 50 },
    infoBox: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', padding: 10, zIndex: 3, display: "flex", justifyContent: "flex-start" },
    imgQuality: { color: "#fff", fontSize: 18, fontWeight: '400', marginBottom: 2 },
    notesRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    infoText: { color: '#fff', fontSize: 18, fontWeight: '400', flex: 1 },
    noteWarnRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, marginTop: 2 },
    goodText: { color: '#ece700', fontWeight: '600', fontSize: 18 },
    statusBarContainer: { width: '100%', height: 16, marginTop: 2, marginBottom: 10 },
    statusBar: { width: '80%', height: 8, borderRadius: 3, backgroundColor: '#bcbccc', overflow: 'hidden', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#ccc' },
    previewContainer: { borderWidth: 2, borderColor: "white", borderRadius: 8, overflow: "hidden", width: 70, height: 100 },
    previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
    overlay: { flexDirection: 'row', alignItems: 'flex-start', padding: 15, zIndex: 3 },
    avatarCircle: { width: 90, height: 90, borderRadius: 45, borderWidth: 4, borderColor: '#7fe336', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2221' },
    successText: { color: '#7fe336', fontSize: 20, fontWeight: '200', marginBottom: 2 },
    failedText: { color: '#ff4d4d', fontSize: 20, fontWeight: '200', marginBottom: 2 },
    userId: { color: '#fff', fontSize: 16, marginTop: 6 },
});

export default RecognizeFaceScreen;
