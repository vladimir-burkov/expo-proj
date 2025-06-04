import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ITask, ITestTask, useLessons } from '@/context/LessonsContext';
import { Bar, Circle } from 'react-native-progress';
import FadeOverlay from '@/components/core/FadeOverlay';
import CustomButton from '@/components/core/CustomButton';
import { PracticeStat, useStorage, lsKeys, getProgressColor } from '@/context/StorageContext';
const { height: screenHeight } = Dimensions.get('window');

export default function Practice() {
    const {practice: practiceId, type} = useLocalSearchParams();
    const {practiciesById, vocabulariesById} = useLessons();
    const {setLSItem, getLSItem} = useStorage();
    const {LS_PRACTICE_KEY} = lsKeys;
    const [tasks, setTasks] = useState<(ITask | ITestTask)[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [solveAgain, setSolveAgain] = useState<number[]>([]);
    const [wrongs, setWrongs] = useState<number[]>([]);
    const [current, setCurrent] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const [restartFlag, setRestartFlag] = useState<boolean>(true);
    const [finished, setFinished] = useState<boolean>(false);
    const [instruction, setInstruction] = useState<string>('');
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
      if (!tasks.length) return;
      const tasksToSolve = Object.keys(tasks).map(Number).filter(item => !solved.includes(item) && !wrongs.includes(item));
      if (!tasksToSolve.length) {
        setFinished(true);
        return;
      }      
      const randomUnsolvedIndex = Math.floor(Math.random() * tasksToSolve.length);
      setCurrent(tasksToSolve[randomUnsolvedIndex]);
    }

    const restart = () => {
      setRestartFlag(!restartFlag);
      setSolved([]);
      setSolveAgain([]);
      setWrongs([]);
      setCurrent(0);
      setPercentage(0);
      setFinished(false);
    }

    const addToSolveAgain = async() => {
      await showSolvedOverlayAnimated("Не верно"); 
      if (!solveAgain.includes(current)) {
        setSolveAgain([...solveAgain, current]);
      } else {
        setWrongs([...wrongs, current]);
        setSolveAgain([...solveAgain.filter(item => item != current)]);
      }
    }

    const addToSolved = async () => {
      await showSolvedOverlayAnimated("Верно!"); 
      const solvedArray = [...solved, current];
      setSolved(solvedArray);
    }

    const updateStats = async (statKey: string, percentage: number) => {
      const stat = await getLSItem<PracticeStat>(LS_PRACTICE_KEY) || {};
      setLSItem(LS_PRACTICE_KEY, {...stat, [statKey]: percentage});
    }

    useEffect(() => {
      setRandomCurrent();
      const progress = solved.length / tasks.length;
      setPercentage(progress || 0);
    }, [solved, solveAgain, tasks]);

    useEffect(() => {
      if (percentage > 0) {
        const taskStatKey = `${practiceId}${type}`; 
        updateStats(taskStatKey, percentage);
      }
    }, [percentage]);

    
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
        setInstruction("Напишите перевод слова на греческий язык правильно поставив ударение");
      } else {
        const practice = practiciesById[practiceId as string];
        title = practice.title;
        setTasks(practice.tasks);
        setInstruction(practice.instruction || "Укажите правильный ответ");
      }

      navigation.setOptions({
        title: title,
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          whiteSpace: 'initial'
        },
      });
    
    }, [restartFlag]);

  return (
    <View style={styles.taskViewContainer}>
      { !finished && tasks[current] && <>
          <Bar progress={percentage} width={null} color='#3154ab'/>
          <View><Text style={styles.instruction}>{instruction}</Text></View>
          {(type == 'vocabular' || type == 'input') && 
            <InputExcercise 
              task={tasks[current]}
              onCorrectAnswer={addToSolved}
              onWrongAnswer={addToSolveAgain}
            />
          }
          {type == 'test' && 
            <TestExcercise
              task={tasks[current] as ITestTask}
              onCorrectAnswer={addToSolved}
              onWrongAnswer={addToSolveAgain}
            />
          }
          {type == 'order' && 
            <OrderExcercise
              task={tasks[current] as ITask}
              onCorrectAnswer={addToSolved}
              onWrongAnswer={addToSolveAgain}
            />
          } 
          </>
      }
      {finished && 
        <View style={styles.successViewContainer}>
          <Text style={styles.successViewContainerText}>
            Упражнение закончено
          </Text>
          <Circle 
            progress={percentage} 
            size={57}
            color={getProgressColor(percentage)}
            borderColor={getProgressColor(percentage)}
            borderWidth={0.5}
            textStyle={{fontSize: 16, fontWeight: 600, color: getProgressColor(percentage)}}
            thickness={5}
            formatText={() => +percentage.toFixed(2) * 100 + '%'}
            showsText
          />
          <CustomButton
            title={'Повторить'}
            onPress={() => restart()}
            backgroundColor="#3154ab"
            iconName="refresh"
            textStyle={{fontSize: 18}}
          />
          <Text style={styles.successViewContainerSubText}>
            {'* учитываются только правильные ответы полученные с первой попытки'}
          </Text>
        </View>
      }
      {!!showOverlayText && 
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


function InputExcercise(props: TaskExcerciseProps) {
  const {task, onCorrectAnswer, onWrongAnswer} = props;
  const {answer, question } = task;
  const [inputText, setInputText] = useState('');
  const [height, setHeight] = useState(42);

  const clearInput = () => {
    setTimeout(() => {
      setInputText('');
      return;
    }, 1200);
  }

  const checkAnswerOnInput = (input: any) => {
    if (!input) {
      setInputText('');
    } else {
      const trimmedInput = input.trim() as string;
      if (trimmedInput.length > answer.length + 1) {
        onWrongAnswer();
        clearInput();
        return;
      } else if(trimmedInput.toLowerCase() === answer.toLowerCase()) {
        onCorrectAnswer();
        setInputText(trimmedInput);
        clearInput();
      } else {
        setInputText(input.replace(/\s+/g, ' '));
      }
    }

  }

  return <>
    <View style={styles.inputExcercise}>
      <Text style={styles.questionString}>{question}</Text>
      <TextInput
        style={[styles.answerInput, { height, overflow: 'hidden'}]}
        autoCorrect={false}
        contextMenuHidden={true}
        textContentType={'none'}
        keyboardType="visible-password"
        secureTextEntry={false}
        autoComplete="off"
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

function OrderExcercise(props: TaskExcerciseProps) {
  const {task, onCorrectAnswer, onWrongAnswer} = props;
  const {answer, question} = task;
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (inputArray.length) {
      setInputArray([]);
    } 

    const optionsArray = answer.split(" ");
    setOptions(shuffleArray(optionsArray));
    
  }, [task])

  useEffect(() => {
    if (inputArray.join(" ") == answer) {
      onCorrectAnswer();
    } else if (inputArray.join(" ").length * 0.8 > answer.length) {
      onWrongAnswer();
    }
  }, [inputArray])

  const insertToAnswerArray = (input: string) => {
    setInputArray([...inputArray, input]);
  }

  const removeFromAnswerArray = (input: string) => {
    setInputArray([...inputArray].filter(item => item !== input));
  }
  return <>
    <View style={styles.inputExcercise}>
      <Text style={styles.questionString}>{question}</Text>
      <View style={styles.answerButtons}>
        {
          [...inputArray]
            .map(item => 
                <CustomButton
                  key={item}
                  title={item}
                  onPress={() => removeFromAnswerArray(item)}
                  closable
                  style={{paddingLeft: 6, paddingRight: 4, paddingVertical: 2, borderRadius: 4, backgroundColor: '#3154ab'}}
                />
            )
        }
      </View>
      <View style={styles.optionsContainer}>
        {
          [...options]
            .filter(item => !inputArray.includes(item))
            .map(item => 
                <CustomButton
                  key={item}
                  title={item}
                  onPress={() => insertToAnswerArray(item)}
                  backgroundColor="#28a745"
                />
            )
        }
      </View>
    </View>
  </>
}

type TestExcerciseProps = {
  task: ITestTask,
  onCorrectAnswer: () => void,
  onWrongAnswer: () => void
};

function TestExcercise(props: TestExcerciseProps) {
  const {task, onCorrectAnswer, onWrongAnswer} = props;
  const {answer, question, options} = task;

  const checkAnswer = (answerInput: string) => {
    
    if (answer == answerInput) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
  }

  return <>
    <View style={styles.inputExcercise}>
      <Text style={styles.questionString}>{question}</Text>
      <View style={styles.optionsContainer}>
        {
          insertRandom([...options], answer)
            .map(item => 
                <CustomButton
                  key={item}
                  title={item}
                  onPress={() => checkAnswer(item)}
                  backgroundColor="#28a745"
                />
            )
        }
      </View>
    </View>
  </>
}

const insertRandom = (array: string[], element: string) => {
  const index = Math.floor(Math.random() * (array.length + 1));
  return [...array.slice(0, index), element, ...array.slice(index)];
};

function shuffleArray(array: Array<any>) {
  const arr = [...array]; // copy to avoid mutating original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

const styles = StyleSheet.create({
  answerButtons: {
    flexDirection: 'row',
    gap: 6
  },
  inputExcercise: {
    width: '100%',
    minHeight: screenHeight*0.6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40
  },
  instruction: {
    fontSize: 16,
    paddingTop: 12
  },
  questionString: {
    fontSize: 26,
    color: '#484848',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  answerInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#484848',
    paddingHorizontal: 8,
    minWidth: 200
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    gap: 12
  },
  optionsButton: {
    paddingHorizontal: 12,
    borderRadius: 12
  },
  successViewContainer: {
    width: '100%',
    minHeight: 500,
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
  successViewContainerPercentage: {
    fontSize: 26,
    color: '#484848',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  successViewContainerSubText: {
    paddingTop: 8,
    fontSize: 16,
    textAlign: 'center'
  },
  taskViewContainer: {
    padding: 12
  },
});
