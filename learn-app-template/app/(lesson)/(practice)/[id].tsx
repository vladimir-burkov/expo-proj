import { loadEncryptedMarkdown } from '@/lib/decrypt';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Markdown } from 'react-native-markdown-display';

const markdownStyle = { 

}

const Practice = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      navigation.setOptions({ title: `Практика ${id}` });
    }
  }, [id]);

  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);

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
    <ScrollView style={styles.container}>
      {loading &&<ActivityIndicator style={{justifyContent: "center"}} size="large" color="#684bbc" />}
      {!loading && <Markdown style={markdownStyle}>{markdownContent}</Markdown>}
    </ScrollView>
  )
}

export default Practice;


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});


// load from url
// async function loadMarkdown() {
//   try {
//     const response = await fetch("https://raw.githubusercontent.com/expo/expo/refs/heads/main/SUPPORT.md");
//     const content = await response.text();
//     setMarkdownContent(content);
//   } catch (err) {
//     console.error('Error loading markdown:', err);
//   }
// }

// loadMarkdown();


// ------------------------

// const lesson1 = require(`@/assets/lessons/lesson1.md`);
// const lesson2 = require(`@/assets/lessons/lesson2.md`);

// const idToPractice = {
//   1: lesson1,
//   2: lesson2
// }

// async function readTextAsset() {
//   try {
//     //@ts-ignore
//     const asset = Asset.fromModule(idToPractice[id]);
//     await asset.downloadAsync();
//     if (asset.localUri) {
//       const fileContents = await readAsStringAsync(asset.localUri);
//       setMarkdownContent(fileContents);
//     }
//   } catch (error) {
//     console.error(error);
//   }

  
// }

// readTextAsset();