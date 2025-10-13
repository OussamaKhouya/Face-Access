import {Link, RelativePathString} from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// 🔹 Reusable LinkButton component
function LinkButton({ href, label,dirty=false }: { href: RelativePathString; label: string, dirty?:boolean }) {
    return (
        <Link href={href} asChild>
            <TouchableOpacity style={dirty?styles.buttonDirty:styles.button}>
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </Link>
    );
}

// 🔹 Home screen
export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <LinkButton href="./home-screen" label="Home" />
            <LinkButton href="./home-first-screen" label="Home First" dirty={true} />

            <LinkButton href="./menu-screen" label="Menu" dirty={true}/>
            <LinkButton href="./camera-screen" label="Camera" dirty={false}/>

            <LinkButton href="./input-id-screen" label="Input id form" />
            <LinkButton href="./access-screen" label="Access " />
            <LinkButton href="./face-recognize-screen" label="Face Recognition" />
            <LinkButton href="./face-enroll-screen" label="Face Enroll (🔥)" dirty={true} />

            <LinkButton href="./face-profile-screen" label="Face Profile" dirty={true} />
            <LinkButton href="./user-management-screen" label="User Management" dirty={true}/>
            <LinkButton href="./new-user-screen" label="New User"  dirty={true}/>
            <LinkButton href="./user-actions-screen" label="Edit_delete User"  dirty={true}/>
            <LinkButton href="./user-edit-screen" label="Edit User"  dirty={true}/>
            <LinkButton href="./user-delete-screen" label="Delete User"  />

            <LinkButton href="./list-users-screen" label="List Users"  dirty={true}/>
        </View>
    );
}

// 🔹 Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    button: {
        width: '45%',
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
    buttonDirty: {
        width: '45%',
        paddingVertical: 14,
        marginVertical: 8,
        backgroundColor: '#af4c4c',
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
        fontSize: 16,
        fontWeight: '400',
    },
});
