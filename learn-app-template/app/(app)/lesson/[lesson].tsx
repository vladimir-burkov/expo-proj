import Loader from "@/components/core/Loader";
import { useLessons } from "@/context/LessonsContext";
import { loadEncryptedMarkdown } from "@/lib/decrypt";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";

type LessonTheoryProps = {
  lessonId: string
}

const Tab = createBottomTabNavigator();

export default function Lesson() {
  const { lesson } = useLocalSearchParams();
  const navigation = useNavigation();
  const { lessonsById } = useLessons();

  useEffect(() => {
    const { title } = lessonsById[lesson as string];

    navigation.setOptions({
      title,
      headerTitleStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        whiteSpace: 'initial'
      },
    });
  }, [lesson]);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#999",
          // tabBarLabelPosition: "beside-icon",
          headerShown: false,
          tabBarIconStyle: {
            height: 22
          }
        }}
      >
        <Tab.Screen
          name="theory"
          children={() => <LessonTheory lessonId={lesson as string} />}
          options={{
            title: "Теория",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="form" size={16} color={focused ? "black" : 'gray'} />
            ),
          }}
        />

        <Tab.Screen
          name="vocabulary"
          component={LessonVocabulary}
          options={{
            title: "Словарь",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="swap" size={16} style={{height: 16}} color={focused ? "black" : 'gray'} />
            ),
          }}
        />

        <Tab.Screen
          name="practice"
          component={LessonPractice}
          options={{
            title: "Практика",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="form" size={16} color={focused ? "black" : 'gray'} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}


function LessonPractice () {
  return (
    <View>
      Practice
      {/* here supposed to be a list of links to practice exercises  */}
    </View>
  )
}

function LessonVocabulary () {
  return (
    <View>
      Vocabulary
      {/* here supposed to be a list of links to practice exercises  */}
    </View>
  )
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
        <ScrollView contentContainerStyle={styles.container} contentInsetAdjustmentBehavior="automatic">
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
    padding: 16,
    backgroundColor: 'white'
  },
  main: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  markdownStyle: {
    
  }
});