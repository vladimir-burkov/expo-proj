import LessonPage from '@/components/LessonPage';
import { LessonProvider } from '@/context/LessonsContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Tabs, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const LessonViewer = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      navigation.setOptions({ title: `Lesson ${id}` });
    }
  }, [id]);

  return (
    <LessonProvider>
      <LessonPage />
      <Link
        href={{ pathname: '/(lesson)/(practice)/[id]', params: { id: 1 } }}
        asChild
      >
        <Text>Практика 1</Text>
      </Link>
      <Link
        href={{ pathname: '/(lesson)/(practice)/[id]', params: { id: 2 } }}
        asChild
      >
        <Text>Практика 2</Text>
      </Link>
      {/* <Tabs
        screenOptions={{
          tabBarPosition: 'top',
          headerShown: false
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Lesson',
            tabBarIcon: ({ }) => (
              <MaterialIcons name="menu-book" size={24} color={"#000"} />
            ),
          }}
        />
        <Tabs.Screen
          name="practices"
          options={{
            title: 'Practices',
            tabBarIcon: ({ }) => (
              <MaterialIcons name="menu-book" size={24} color={"#000"} />
            ),
          }}
        />
      </Tabs> */}
    </LessonProvider>
  )
}

export default LessonViewer;

{/* <Link 
href={{pathname: '/(lesson)/(practice)/[id]', params: { id: 1 }}}
asChild
>
  <Text>Практика 1</Text>
</Link>
<Link 
href={{pathname: '/(lesson)/(practice)/[id]', params: { id: 2 }}}
asChild
>
  <Text>Практика 2</Text>
</Link> */}