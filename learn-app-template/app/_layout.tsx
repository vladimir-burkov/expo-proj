import { LessonProvider } from "@/context/LessonsContext";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LessonProvider>        
        <Slot />
      </LessonProvider>
    </SafeAreaView>
  )
}
