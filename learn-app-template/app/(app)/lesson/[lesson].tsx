import Loader from "@/components/core/Loader";
import { useLessons } from "@/context/LessonsContext";
import { loadEncryptedMarkdown } from "@/lib/decrypt";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";

type LessonTheoryProps = {
  lessonId: string
}

export default function Lesson() {
  const { lesson } = useLocalSearchParams();
  const navigation = useNavigation();
  const { lessonsById } = useLessons();

  useEffect(() => {
    const { title } = lessonsById[lesson as string];

    navigation.setOptions({
      title,
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        whiteSpace: 'initial'
      },
    });
  }, [lesson]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.main}>
          <LessonTheory lessonId={lesson as string}/>
        </View>
      </View>
    </>
  );
}

function LessonTheory({ lessonId }: LessonTheoryProps) {
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    loadEncryptedMarkdown("https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc")
      .then(setMarkdownContent)
      .catch(() => {
        setMarkdownContent("Loading error")
      })
      .finally(() => { 
          setLoading(false);
      });
  }, []);

  return (
    <>
      {!loading && 
        <ScrollView contentContainerStyle={styles.container}>
          <Markdown style={styles.markdownStyle}>{markdownContent}</Markdown>
        </ScrollView>
      }
      <Loader loading={loading}/>
    </>
  )
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
  markdownStyle: {
    
  }
});