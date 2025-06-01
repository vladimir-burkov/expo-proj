import { LessonProvider } from "@/context/LessonsContext";
import { StorageProvider } from "@/context/StorageContext";
import { Slot } from "expo-router";
import React from "react";
import { Platform, SafeAreaView } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

export default function RootLayout() {
  
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setStyle('dark');
    }
  }, []);

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
