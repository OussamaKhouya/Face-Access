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

            <Stack.Screen name="home-screen" options={{headerShown: false}}  />
            <Stack.Screen name="home-first-screen" options={{headerShown: false}}  />

            <Stack.Screen name="input-id-screen"  />
            <Stack.Screen name="access-screen" options={{headerShown: false}} />
            <Stack.Screen name="face-recognize-screen" options={{headerShown: false}} />
            <Stack.Screen name="face-enroll-screen" options={{headerShown: false}} />


            <Stack.Screen name="menu-screen" options={{headerShown: false}} />
            <Stack.Screen name="user-management-screen" options={{headerShown: false}} />

            <Stack.Screen name="new-user-screen" options={{headerShown: false}} />
            <Stack.Screen name="list-users-screen" options={{headerShown: false}} />
            <Stack.Screen name="user-actions-screen" options={{headerShown: false}} />
            <Stack.Screen name="user-edit-screen" options={{headerShown: false}} />
            <Stack.Screen name="user-delete-screen" options={{headerShown: false}} />

            <Stack.Screen name="face-profile-screen" options={{headerShown: false}} />




        </Stack>
    );
}


