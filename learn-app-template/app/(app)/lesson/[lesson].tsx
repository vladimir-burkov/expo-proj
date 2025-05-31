import LinkButton from "@/components/core/LinkButton";
import Loader from "@/components/core/Loader";
import { IPracticeConfig, useLessons } from "@/context/LessonsContext";
import { getProgressColor, lsKeys, PracticeStat, useStorage } from "@/context/StorageContext";
import { loadEncryptedContent } from "@/lib/decrypt";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import { Circle } from "react-native-progress";

type LessonTheoryProps = {
  lessonId: string
}

type PracticeLink = {
  practiceId: string,
  title: string,
  progress: number, 
  href: any
}

type LinkParams = {
  id: string,
  title: string, 
  isVocabulary: boolean
}

const Tab = createBottomTabNavigator();

export default function LessonPage() {
  const { lesson } = useLocalSearchParams();
  const { getLSItem} = useStorage();
  const { LS_PRACTICE_KEY } = lsKeys;
  const { lessonsById, practiciesById, vocabulariesById} = useLessons();
  const navigation = useNavigation();
  const [ practiceLinks, setPracticeLinks ] = useState<PracticeLink[]>([]);
  const [ vocabulary, setVocabulary ] = useState<{[key: string] : string}>({});

  useEffect(() => {
    const { title, vocabularyId, practiceConfig } = lessonsById[lesson as string];
    setupHeader(title);
    setupPractice(practiceConfig);
    setVocabulary(vocabulariesById[vocabularyId] || {})
  }, [lesson]);

  const makeLink = (id: string, title: string, type: string, progress: number) => {
    return {
        practiceId: id,
        title,
        href: {
          pathname: '/(app)/lesson/practice/[practice]',
          params: {
            practice: id,
            type: type,
          },
        },
        progress
      }
  }

  const setupHeader = (title: string) => {
    navigation.setOptions({
      title,
      headerTitleStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        whiteSpace: 'initial',
      },
    });
  }

  const setupPractice = async (practiceConfig: IPracticeConfig) => {
    const links: PracticeLink[] = [];
    const currentStat = await getLSItem<PracticeStat>(LS_PRACTICE_KEY) || {};

    if (practiceConfig.vocabularId) {
      const stat = currentStat[practiceConfig.vocabularId + 'vocabular'] || 0;
      links.push(makeLink(practiceConfig.vocabularId, "Словарь", 'vocabular', stat));
    }
    
    const otherTaskIds = new Set([...practiceConfig.testIds, ...practiceConfig.orderIds, ...practiceConfig.inputIds])
    
    if (otherTaskIds.size) {
      otherTaskIds.forEach(practiceId => {
        const practice = practiciesById[practiceId];

        if (practiceConfig.testIds.includes(practiceId)) {
          const stat = currentStat[practiceId + 'test'] || 0;
          links.push(makeLink(practiceId, `${practiceConfig.orderIds.length && practiceConfig.inputIds.length ? "Уровень 1: " : ""}${practice.title}`, 'test', stat));
        }

        if (practiceConfig.orderIds.includes(practiceId)) {
          const stat = currentStat[practiceId + 'order'] || 0;
          links.push(makeLink(practiceId, `Уровень 2: ${practice.title}`, 'order', stat));
        }

        if (practiceConfig.inputIds.includes(practiceId)) {
          const stat = currentStat[practiceId + 'input'] || 0;
          links.push(makeLink(practiceId, `Уровень 3: ${practice.title}`, 'input', stat));
        }

      })
    }

    setPracticeLinks(links);
  }


  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#999",
          // tabBarLabelPosition: "beside-icon",
          headerShown: false,
          tabBarIconStyle: {
            height: 22
          },
          tabBarStyle: {
            backgroundColor: "#25292e",
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
              <AntDesign name="book" size={16} color={focused ? "white" : 'darkgray'} />
            ),
          }}
        />

        <Tab.Screen
          name="vocabulary"
          children={() => <LessonVocabulary vocabulary={vocabulary} />}
          options={{
            title: "Словарь",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="swap" size={16} style={{height: 16}} color={focused ? "white" : 'darkgray'} />
            ),
          }}
        />

        <Tab.Screen
          name="practice"
          children={() => <LessonPractice practicies={practiceLinks} />}
          options={{
            title: "Практика",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="form" size={16} color={focused ? "white" : 'darkgray'} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

type LessonPracticeProps = {
  practicies: PracticeLink[],
};

function LessonPractice ({ practicies }: LessonPracticeProps) {  
  return (
      <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[styles.scrollView]}
      >
        <FlatList
          data={practicies}
          style={{width: "100%"}}
          renderItem={({ item }) => (
            <PracticeItem
              {...item}
            />)
          }
          keyExtractor={(item, index) => item.practiceId+index}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
  );
}

function PracticeItem(props: PracticeLink) {
  
  const { title, href, progress} = props;

  const buttonStyle = StyleSheet.create({
    plainButton: {
      flex: 1,
      transitionDuration: "200ms",
      flexDirection: "row",
      alignItems: 'center',
      paddingLeft: 14,
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
      href={href}
      buttonStyle={buttonStyle}
      chevronStyle={chevronStyle}
    >
      <View style={styles.practiceButtonContent}>
        {/* <AntDesign name="loading1" size={24} color="#28a745" />         */}
        <Circle 
          progress={progress} 
          size={45}
          color={getProgressColor(progress)}
          borderColor={progress == 1 ? 'none' : getProgressColor(progress)}
          textStyle={{fontSize: 12, fontWeight: 600, color: getProgressColor(progress)}}
          thickness={3}
          formatText={() => progress * 100 + '%'}
          showsText
        />
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
      <Text style={vocabularyStyles.cell}>{item.translation}</Text>
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
  const {lessonsById} = useLessons();
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    loadEncryptedContent(lessonsById[lessonId].article_url)
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
      // style={{ backgroundColor: '#f0f0f0' }}
        <ScrollView style={styles.container}>
          <Markdown>{markdownContent}</Markdown>
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
    backgroundColor: "#ffff"
  },
  main: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  scrollView: {
    flexWrap: "wrap",
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
    fontSize: 14,
    fontWeight: "bold"
  }
});