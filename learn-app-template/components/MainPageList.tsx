import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ListItem from '@/components/core/ListItem';
import { useLessons } from '@/context/LessonsContext';

export default function MainPageList() {
  const {lessons} = useLessons();

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
    height: 0.5,
    backgroundColor: '#eee',
  },
});