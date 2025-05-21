import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLessons } from '@/context/LessonsContext';

export default function Practice() {

    const {practice: practiceId} = useLocalSearchParams();
    const navigation = useNavigation();
    const { practiciesById } = useLessons();

    useEffect(() => {
      
      const practice = practiciesById[practiceId as string];
  
      navigation.setOptions({
        title: practice.title,
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