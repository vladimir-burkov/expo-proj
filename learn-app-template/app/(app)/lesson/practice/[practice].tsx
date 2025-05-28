import { View, Text, Button, StyleSheet, Animated, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ITask, ITestTask, useLessons } from '@/context/LessonsContext';
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
    const [restartFlag, setRestartFlag] = useState<boolean>(true);

    const navigation = useNavigation();

    const [showOverlayText, setShowOverlayText] = useState('');
    const [overlayPromiseResolver, setOverlayPromiseResolver] = useState<() => void>();

    const getPercentageString = () => {
      return `(${Math.round((percentage - (solveAgain.length / tasks.length)) * 100)} %)`
    }

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

    const restart = () => {
      setRestartFlag(!restartFlag);
      setSolved([]);
      setSolveAgain([]);
      setCurrent(0);
      setPercentage(0);
    }

    const addToSolveAgain = async() => {
      await showSolvedOverlayAnimated("Не верно"); 
      const unsolvedArray = [...solveAgain, current];
      setSolveAgain(unsolvedArray);
    }

    const addToSolved = async () => {
      await showSolvedOverlayAnimated("Верно!"); 
      const solvedArray = [...solved, current];
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
        setTasks(tasksList.slice(0, 3));

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

      return () => {
        console.log(percentage);
        //here supposed to be Statistics update
      }
      
    }, [restartFlag]);

    useEffect(() => {
      if (!(solved.length / tasks.length)) return;

      setRandomCurrent();      
      setPercentage(solved.length / tasks.length);
      // updateStatistics(percentage);    
    }, [solved, solveAgain])

  return (
    <View style={styles.taskViewContainer}>
      <Bar progress={percentage} width={null} />
      <Text>{current}</Text>
      {
        percentage < 1 && tasks[current] && <>
          {/* <DummyTaskForTest 
            task={tasks[current]} 
            onCorrectAnswer={addToSolved}
            onWrongAnswer={addToSolveAgain}/> */}
          <InputExcercise 
            task={tasks[current]} 
            onCorrectAnswer={addToSolved}
            onWrongAnswer={addToSolveAgain}/>
        </>
      }
      {  percentage === 1 &&
        <View style={styles.successViewContainer}>
          <View>
            <Text style={styles.successViewContainerText}>
              Упражнение закончено {getPercentageString()}
            </Text>
            <Text style={styles.successViewContainerSubText}>
              {'(засчитываются только правильные ответы полученные с первой попытки)'}
            </Text>
          </View>
          <Button title={'Заново'} onPress={() => { restart()}}/>
        </View>
      }
      {showOverlayText && 
        <FadeOverlay
          text={showOverlayText}
          onAnimationEnd={() => {
            setShowOverlayText('');
            overlayPromiseResolver?.();
          }}
        />
      }
    </View>
  )
}

type TaskExcerciseProps = {
  task: ITask,
  onCorrectAnswer: () => void,
  onWrongAnswer: () => void
};


function DummyTaskForTest(props: TaskExcerciseProps) {
  const {task, onCorrectAnswer, onWrongAnswer} = props;

  return <>
    <Button title={'solve'} onPress={onCorrectAnswer}/>
    <Button title={'wrong'} onPress={onWrongAnswer}/>
  </>
}

function InputExcercise(props: TaskExcerciseProps) {
  const {task, onCorrectAnswer, onWrongAnswer} = props;
  const {answer, question} = task;
  const [inputText, setInputText] = useState('');
  const [height, setHeight] = useState(42);

  const checkAnswerOnInput = (props: any) => {
    setInputText(() => {
      if (props.length > answer.length) {
        onWrongAnswer();
        return '';
      } else if(props === answer) {
        onCorrectAnswer();
        setTimeout(() => {
          return '';
        }, 1200);
      }
      return props;
    })
  }

  return <>
    <View style={styles.inputExcercise}>
      <Text style={styles.questionString}>{question}</Text>
      <TextInput
        style={[styles.answerInput, { height }]}
        autoCorrect={false}
        autoCapitalize="none"
        spellCheck={false}
        value={inputText}
        onChangeText={checkAnswerOnInput}
        multiline
        onContentSizeChange={(e) =>
          setHeight(e.nativeEvent.contentSize.height)
        }
      />
    </View>
  </>
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
  inputExcercise: {
    width: '100%',
    minHeight: 400,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  questionString: {
    fontSize: 22,
    color: '#484848',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  answerInput: {
    fontSize: 22,
    borderWidth: 1,
    borderColor: '#484848',
    paddingHorizontal: 8

  },
  successViewContainer: {
    width: '100%',
    minHeight: 400,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  successViewContainerText: {
    fontSize: 32,
    color: '#484848',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  successViewContainerSubText: {
    paddingTop: 8,
    fontSize: 14,
    textAlign: 'center'
  },
  taskViewContainer: {
    padding: 12
  },
});
