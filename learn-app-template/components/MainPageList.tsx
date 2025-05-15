import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ListItem from '@/components/core/ListItem';
import { useLessons } from '@/context/LessonsContext';
import { useNavigation } from 'expo-router';

export default function MainPageList() {
  const {lessons} = useLessons();
  const navigation = useNavigation();

  return (
    <FlatList
      data={lessons}
      renderItem={({ item }) => (<ListItem {...item}/>)}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    borderTopColor: '#eee',
    borderTopWidth: 1
  },
});