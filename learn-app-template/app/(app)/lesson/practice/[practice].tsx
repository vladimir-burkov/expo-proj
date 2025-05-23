import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ITask, useLessons } from '@/context/LessonsContext';

export default function Practice() {

    const {practice: practiceId, vocabulary} = useLocalSearchParams();
    const navigation = useNavigation();

    console.log(practiceId, vocabulary);
    
    // const { practiciesById, vocabulariesById } = useLessons();
    // const [tasks, setTasks] = useState<Task[]>([]);
    // const [unsolved, setUnsolved] = useState<number[]>([]);
    // const [current, setCurrent] = useState<number>(0);

    // useEffect(() => {
      
    //   const practice = practiciesById[practiceId as string];
  
    //   navigation.setOptions({
    //     title: practice.title,
    //     headerTitleStyle: {
    //       fontSize: 14,
    //       fontWeight: 'bold',
    //       whiteSpace: 'initial'
    //     },
    //   });

    //   if (practice.type == 'vocabulary' && practice.vocabularyId) {
    //     const vocabulary = vocabulariesById[practice.vocabularyId];

    //     const tasksList = Object.entries(vocabulary).map(([word, translation]) => ({
    //       id: word,
    //       answer: word,
    //       question: translation
    //     }));

    //     setTasks(tasksList);
    //   } else if (practice.tasksTmp) {
    //     setTasks(practice.tasksTmp);
    //   }

    //   setUnsolved(tasks.map((value, index) => index));
    //   setCurrent(Math.floor(Math.random() * tasks.length - 1));
    // }, []);
    
  return (
    <View>
      <Text>practice</Text>
    </View>
  )
}


function Question() {
  return (
    <View>
      <Text>[practice]</Text>
    </View>
  )
}