import { AppHeader, HeaderButton } from "@/components/AppHeader";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function AppLayout() {
  return (
        <Stack 
          screenOptions={{
            headerStyle: {
              backgroundColor: '#623EC9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 400,
            },
            navigationBarColor: '#25292e',
        }}
        >
          <Stack.Screen
              name="index"
              options={{
                headerStyle: {
                  backgroundColor: '#623EC9',
                },
                headerTintColor: '#fff',
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 16,
                  paddingLeft: 15
                },
                navigationBarColor: '#25292e',
                headerTitle: AppHeader,
                // headerLeft: HeaderButton,
                // headerRight: UserButton
              }}
          />
          <Stack.Screen name="buy"/>
          <Stack.Screen name="contact"/>
          <Stack.Screen name="auth"/>
        </Stack>
  );
}
