import { AppHeader, HeaderButton } from "@/components/AppHeader";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function AppLayout() {
  return (
        <Stack 
          screenOptions={{
            headerStyle: {
              backgroundColor: '#684bbc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 400,
            },

        }}
        >
          <Stack.Screen
              name="index"
              options={{
                headerStyle: {
                  backgroundColor: '#684bbc',
                },
                headerTintColor: '#fff',
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 16,
                  paddingLeft: 15
                },
                navigationBarColor: '#25292e',
                headerTitle: AppHeader,
                headerLeft: HeaderButton,
                headerRight: UserButton
              }}
          />
          <Stack.Screen name="buy"/>
          <Stack.Screen name="contact"/>
          <Stack.Screen name="auth"/>
        </Stack>
  );
}


function UserButton() {
  return (
    <View>
      <SimpleLineIcons name="user" size={24} color="white" style={{paddingRight: 16}}/>    
    </View>
  )
}