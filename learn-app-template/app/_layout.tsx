import GrammanaHeader from "@/components/GrammanaHeader";
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  React.useEffect(()=>{
    NavigationBar.setBackgroundColorAsync("transparent");
  });
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#684bbc',
        },
        headerTintColor: '#fff',
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false
      }}
    > 
      <Stack.Screen name="index" options={{ headerTitle: () => <GrammanaHeader/> }}/>
    </Stack>
  )
}
