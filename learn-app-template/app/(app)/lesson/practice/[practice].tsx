import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ITask, useLessons } from '@/context/LessonsContext';
import { Bar } from 'react-native-progress';

export default function Practice() {

    const {practice: practiceId, type} = useLocalSearchParams();
    const { practiciesById, vocabulariesById } = useLessons();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [current, setCurrent] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const navigation = useNavigation();

    const setRandomCurrent = () => {      
      if (percentage >= 1) return;
      const tasksToSolve = Object.keys(tasks).map(Number).filter(item => !solved.includes(item));      
      const randomUnsolvedIndex = Math.floor(Math.random() * tasksToSolve.length);
      setCurrent(randomUnsolvedIndex);
    }

    const addToSolved = (solvedIndex: number) => {
      if (percentage >= 1) return;      
      const solvedArray = [...solved, solvedIndex];
      setSolved(solvedArray);
    }
    
    useEffect(() => {
      let title = "";

      if (type == "vocabular") {
        title = "Словарь";
        const vocabulary = vocabulariesById[practiceId as string];
        const tasksList = Object.entries(vocabulary).map(([word, translation]) => ({
          answer: word,
          question: translation
        }));
        setTasks(tasksList);

      } else {
        const practice = practiciesById[practiceId as string];
        title = practice.title;
        setTasks(practice.tasks);
      }

      navigation.setOptions({
        title: title,
        headerTitleStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          whiteSpace: 'initial'
        },
      });
      
    }, []);

    useEffect(() => {
      if (!(solved.length / tasks.length)) return;

      setRandomCurrent();      
      setPercentage(solved.length / tasks.length);    
    }, [solved])

  return (
    <View style={styles.taskViewContainer}>
      <Bar progress={percentage} width={null} />
      <Text>{current}</Text>
      {percentage < 1 && <Button title={'solve'} onPress={() => {
        addToSolved(current);
      }}/>
      }
    </View>
  )
}


function TaskView(task: ITask) {
  return (
    <View>
      <Text>{task.question}</Text>
      <Text>{task.answer}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  taskViewContainer: {
    padding: 12
  },
});
