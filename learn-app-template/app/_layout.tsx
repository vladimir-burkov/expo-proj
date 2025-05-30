import { LessonProvider } from "@/context/LessonsContext";
import { StorageProvider } from "@/context/StorageContext";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LessonProvider>
        <StorageProvider>
          <Slot />
        </StorageProvider>
      </LessonProvider>
    </SafeAreaView>
  )
}
