import {Link, RelativePathString} from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// 🔹 Reusable LinkButton component
function LinkButton({ href, label }: { href: RelativePathString; label: string }) {
    return (
        <Link href={href} asChild>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </Link>
    );
}

// 🔹 Home screen
export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <LinkButton href="./home" label="View Home" />
            <LinkButton href="./home-first" label="View Home First" />

            <LinkButton href="./details" label="View Details" />

            <LinkButton href="./input-id" label="View Input id form" />
            <LinkButton href="./access-screen" label="View Access Screen" />
            <LinkButton href="./face-recognition-screen" label="Face Recognition Screen" />

            <LinkButton href="./photo-profile" label="View Photo Profile" />
        </View>
    );
}

// 🔹 Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        width: '80%',
        paddingVertical: 14,
        marginVertical: 8,
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3, // Android shadow
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
