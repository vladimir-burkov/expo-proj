import { View, Text, Button, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ITask, useLessons } from '@/context/LessonsContext';
import { Bar } from 'react-native-progress';
import FadeOverlay from '@/components/core/FadeOverlay';

export default function Practice() {
    const {practice: practiceId, type} = useLocalSearchParams();
    const { practiciesById, vocabulariesById } = useLessons();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [solveAgain, setSolveAgain] = useState<number[]>([])
    const [current, setCurrent] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const navigation = useNavigation();

    const [showOverlayText, setShowOverlayText] = useState('');
    const [overlayPromiseResolver, setOverlayPromiseResolver] = useState<() => void>();


    const showSolvedOverlayAnimated = (text: string) => {
      return new Promise<void>((resolve) => {
        setOverlayPromiseResolver(() => resolve);
        setShowOverlayText(text);
      });
    };

    const setRandomCurrent = () => {      
      if (percentage >= 1) return;
      const tasksToSolve = Object.keys(tasks).map(Number).filter(item => !solved.includes(item));      
      const randomUnsolvedIndex = Math.floor(Math.random() * tasksToSolve.length);
      setCurrent(randomUnsolvedIndex);
    }

    const addToSolveAgain = async(notsolvedIndex: number) => {
      await showSolvedOverlayAnimated("Не верно"); 
      const unsolvedArray = [...solveAgain, notsolvedIndex];
      setSolveAgain(unsolvedArray);
    }

    const addToSolved = async (solvedIndex: number) => {
      await showSolvedOverlayAnimated("Верно!"); 
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
    }, [solved, solveAgain])

  return (
    <View style={styles.taskViewContainer}>
      <Bar progress={percentage} width={null} />
      <Text>{current}</Text>
      {
        percentage < 1 && <>
          <Button title={'solve'} onPress={() => { addToSolved(current);}}/>
          <Button title={'wrong'} onPress={() => { addToSolveAgain(current);}}/>
        </>
        
      }
      {
        percentage === 1 && <Text>Тест пройден</Text>
      }
      {showOverlayText && (
        <FadeOverlay
          text={showOverlayText}
          onAnimationEnd={() => {
            setShowOverlayText('');
            overlayPromiseResolver?.();
          }}
        />
      )}
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  overlayText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
});
