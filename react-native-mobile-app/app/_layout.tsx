import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen name="index" options={{headerShown: false}} />

            <Stack.Screen name="home" options={{headerShown: true}}  />
            <Stack.Screen name="home-first" options={{headerShown: true}}  />

            <Stack.Screen name="input-id"  />
            <Stack.Screen name="access-screen" options={{headerShown: false}} />
            <Stack.Screen name="face-recognition-screen" options={{headerShown: false}} />

            <Stack.Screen name="details" />
            <Stack.Screen name="photo-profile" />
        </Stack>
    );
}


