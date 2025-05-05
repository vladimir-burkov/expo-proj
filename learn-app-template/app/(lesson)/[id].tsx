import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
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
    <View>
      <Text>{id}</Text>
      <Link 
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
      </Link>
    </View>
  )
}

export default LessonViewer;