// components/LinkButton.tsx
import {Link, RelativePathString} from 'expo-router';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type LinkButtonProps = {
    href: RelativePathString;
    label: string;
    color?: string;
};

export default function LinkButton({ href, label, color = '#4CAF50' }: LinkButtonProps) {
    return (
        <Link href={href} asChild>
            <TouchableOpacity style={[styles.button, { backgroundColor: color }]}>
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        paddingVertical: 14,
        marginVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3, // Android shadow
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
