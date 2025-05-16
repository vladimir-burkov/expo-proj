import { useLessons } from "@/context/LessonsContext";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Lesson() {
  const { lessonsById } = useLessons();
  const { lesson } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    const {title} = lessonsById[lesson as string];

    if (title) {
      navigation.setOptions({
        title: `${title}`, 
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#4A90E2',
        },
      });
    }
  }, [lesson]);

  return (
    <>
      {/* <Stack.Screen options={{ title: "Lesson" }} /> */}
      <View style={styles.container}>
        <View style={styles.main}>
          <LessonTheory />
        </View>
      </View>
    </>
  );
}

function LessonTheory() {
  return (
    <View style={{ paddingVertical: 12 }}>
      <Text style={styles.title}>title</Text>
      <Text style={{ fontSize: 16 }}>children</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});