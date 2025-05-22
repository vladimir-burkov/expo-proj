import LinkButton from "@/components/core/LinkButton";
import Loader from "@/components/core/Loader";
import { Practice, useLessons, Vocabulary } from "@/context/LessonsContext";
import { loadEncryptedMarkdown } from "@/lib/decrypt";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View, Text } from "react-native";
import Markdown from "react-native-markdown-display";

type LessonTheoryProps = {
  lessonId: string
}

type PracticeItemProps = {
  id: string,
  title: string  
};

const Tab = createBottomTabNavigator();

export default function Lesson() {
  const { lesson } = useLocalSearchParams();
  const navigation = useNavigation();
  const { lessonsById, practiciesById, vocabulariesById} = useLessons();
  const [ practicies, setPracticies ] = useState<Practice[]>([]);
  const [ vocabulary, setVocabulary ] = useState<{[key: string] : string}>({});

  useEffect(() => {
    const { title, vocabularyId, practiceIds } = lessonsById[lesson as string];

    navigation.setOptions({
      title,
      headerTitleStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        whiteSpace: 'initial'
      },
    });

    setPracticies(practiceIds.map((id) => practiciesById[id]) || []);
    setVocabulary(vocabulariesById[vocabularyId] || {})
    
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
          },
          tabBarStyle: {
            backgroundColor: "#f6f6f6",
            borderColor: "lightgray",
            // borderTopWidth: 
          }
        }}
      >
        <Tab.Screen
          name="theory"
          children={() => <LessonTheory lessonId={lesson as string} />}
          options={{
            title: "Теория",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="form" size={16} color={focused ? "black" : 'darkgray'} />
            ),
          }}
        />

        <Tab.Screen
          name="vocabulary"
          children={() => <LessonVocabulary vocabulary={vocabulary} />}
          options={{
            title: "Словарь",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="swap" size={16} style={{height: 16}} color={focused ? "black" : 'darkgray'} />
            ),
          }}
        />

        <Tab.Screen
          name="practice"
          children={() => <LessonPractice practicies={practicies} />}
          options={{
            title: "Практика",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="form" size={16} color={focused ? "black" : 'darkgray'} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

type LessonPracticeProps = {
  practicies: Practice[],
};

function LessonPractice ({ practicies }: LessonPracticeProps) {

  return (
      <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[styles.scrollView]}
      >
        <FlatList
          data={practicies}
          renderItem={({ item }) => (
            <PracticeItem
              id={item.id} 
              title={item.title} 
            />)
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
  );
}

function PracticeItem(props: PracticeItemProps) {
  
  const {id, title} = props;

  const buttonStyle = StyleSheet.create({
    plainButton: {
      flex: 1,
      transitionDuration: "200ms",
      flexDirection: "row",
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 16
    },
    plainButtonHovered: {
      backgroundColor: "rgba(0,0,0,0.1)"
    },
    plainButtonPressed: {
      backgroundColor: "rgba(0,0,0,0.1)"
    },
  });

  const chevronStyle = {
    size: 16,
    color: "#919497"
  };

  return <>
    <LinkButton
      href={{
        pathname: "/(app)/lesson/practice/[practice]",
        params: {
          practice: id
        },
      }}
      buttonStyle={buttonStyle}
      chevronStyle={chevronStyle}
    >
      <View style={styles.practiceButtonContent}>
        <AntDesign name="loading1" size={24} color="green" />        
        <Text style={styles.practiceButtonText}>{title}</Text>
      </View>
    </LinkButton>
  </>
}

function LessonVocabulary ({vocabulary}: {vocabulary: {[key: string] : string}}) {
  const data = Object.entries(vocabulary).map(([word, translation]) => ({
    key: word,
    word,
    translation: translation
  }));

  const renderItem = ({ item }: { item: { key: string; word: string; translation: string } }) => (
    <View style={vocabularyStyles.row}>
      <Text style={vocabularyStyles.cell}>{item.word}</Text>
      <Text style={vocabularyStyles.cell}>{item. translation}</Text>
    </View>
  );

  return (
    
    <ScrollView contentContainerStyle={vocabularyStyles.container}>
      <View style={[vocabularyStyles.row, vocabularyStyles.headerRow]}>
        <Text style={vocabularyStyles.headerCell}>Слово</Text>
        <Text style={vocabularyStyles.headerCell}>Перевод</Text>
      </View>
      <FlatList data={data} renderItem={renderItem} />
    </ScrollView>
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
          <Markdown>{markdownContent}</Markdown>
          {/* //style={styles.markdownStyle} */}
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
  scrollView: {
    maxWidth: 960,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: "auto",
    backgroundColor: "white"
  },
  separator: {
    borderTopColor: '#eee',
    borderTopWidth: 1
  },
  practiceButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
    minHeight: 65,
  },
  practiceButtonText: {
    textAlign: "left",
    fontWeight: 400,
    fontSize: 16,
  },
});

const vocabularyStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dedbdb",
    paddingVertical: 8
  },
  cell: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 4
  },
  headerRow: {
    borderBottomWidth: 2,
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold"
  }
});