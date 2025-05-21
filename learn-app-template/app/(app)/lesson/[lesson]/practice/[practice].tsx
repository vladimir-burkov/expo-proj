import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLessons } from '@/context/LessonsContext';

export default function Practice() {

    const {lesson, practice: practiceId} = useLocalSearchParams();
    const navigation = useNavigation();
    const { lessonsById } = useLessons();

    useEffect(() => {
      console.log(lesson, practiceId);
      
      // const { practice } = lessonsById[lesson as string];
  
      navigation.setOptions({
        // title,
        title: 'Practice title',
        headerTitleStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          whiteSpace: 'initial'
        },
      });
    }, []);
    
  return (
    <View>
      <Text>practice</Text>
    </View>
  )
}