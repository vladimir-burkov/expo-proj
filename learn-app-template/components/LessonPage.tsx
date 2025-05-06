import {ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLessons } from '@/context/LessonsContext';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { loadEncryptedMarkdown } from '@/lib/decrypt';
import Markdown from 'react-native-markdown-display';
import Loader from './core/Loader';

const markdownStyle = { 

}

const LessonPage = () => {
  const {lessonsById} = useLessons();
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const lesson = lessonsById[id as string];
    
    if (id) {
      navigation.setOptions({ title: `${lesson.title}` });
    }
  }, [id]);



  useEffect(() => {
    setLoading(true);
    loadEncryptedMarkdown("https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc")
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
        <ScrollView style={styles.container}>
          <Markdown style={markdownStyle}>{markdownContent}</Markdown>
        </ScrollView>
      }
      <Loader loading={loading}/>
    </>
  )
}

export default LessonPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  }
});
