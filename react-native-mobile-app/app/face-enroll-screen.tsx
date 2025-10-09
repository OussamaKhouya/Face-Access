import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {useCameraPermissions} from "expo-camera";
import {Camera, useCameraDevice} from "react-native-vision-camera";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Header from "@/components/Header";

const EnrollFaceScreen = () => {
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

    return (<View style={styles.container}>


        <Header title="Enroll Face" onBack={() => console.log("Back pressed")}/>

        {/* Camera with face frame overlay */}
        <View style={styles.cameraBox}>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
            />

        </View>

        {/* Bottom overlay for info */}
        <View style={styles.infoBox}>
            <Text style={styles.imgQuality}>Image Quality: 79</Text>
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
        </View>
    </View>);
};


const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff'},

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
    infoBox: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 230,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 10,
        zIndex: 3,
        display: "flex",

        justifyContent: "flex-start"
    },
    imgQuality: {
        color: "#fff", fontSize: 24, fontWeight: '400', marginBottom: 2
    },
    notesRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 6},
    infoText: {color: '#fff', fontSize: 24, fontWeight: '400', flex: 1},
    noteWarnRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 6, marginTop: 2},
    goodText: {color: '#ece700', fontWeight: '600', fontSize: 24},
    statusBarContainer: {width: '100%', height: 16, marginTop: 2, marginBottom: 10},
    statusBar: {
        width: '80%', height: 8, borderRadius: 3, backgroundColor: '#bcbccc', // gray bg
        overflow: 'hidden', alignSelf: 'flex-start', // Good quality bar color fill
        borderWidth: 1, borderColor: '#ccc'
    }
});

export default EnrollFaceScreen;
