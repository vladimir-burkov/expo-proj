import { AppHeader, HeaderButton } from "@/components/AppHeader";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
        <Stack>
          <Stack.Screen
              name="index"
              options={{
                headerStyle: {
                  backgroundColor: '#684bbc',
                },
                headerTintColor: '#fff',
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 14,
                  paddingLeft: 15
                },
                headerTitle: AppHeader,
                headerLeft: HeaderButton
              }}
          />
          <Stack.Screen name="buy"/>
          <Stack.Screen name="contact"/>
          {/* <Stack.Screen name="auth"/> */}
        </Stack>
  );
}
